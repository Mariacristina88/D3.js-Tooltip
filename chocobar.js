var choco = [{"cocoa":20,"milk":80, "name":"Lightchoco","image":"bar1.png"}, {"cocoa":40,"milk":60, "name":"Milkchoco", "image":"bar2.png"}, {"cocoa":60,"milk":40,"name":"Brownchoco", "image":"bar3.png"}, {"cocoa":80,"milk":20,"name":"Darkchoco","image":"bar4.png"}];

var margin = {top: 20, right: 30, bottom: 70, left: 90};

var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var x = d3.scale.linear()
	.domain([0,90,80])
    .range([0, width]);

var y = d3.scale.linear()
	.domain([0,90,80])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg =	d3.select("body")
			.append("svg")
			.attr("class", "chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

var Milk = svg.append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 20)
		      .attr("x", -300)
		      .style("font-size", "20px")
		      .text("Milk");

var Cocoa = svg.append("text")
		      .attr("y", 600)
		      .attr("x", 300)
		      .style("font-size", "20px")
		      .text("Cocoa");		
			  
var chart = svg
			.append("g")
			.attr("width", 500)
			.attr("height", 500)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

chart.append("g")
  .attr("class", "y axis")
  .call(yAxis);

var colorScale = d3.scale.linear()
    .range(['#231508','#754719'])
    .domain([20, 80]);

var myTool = d3.select("body")
                      
                      .append("div")
                      .attr("class", "mytooltip")
                      .style("opacity", "0")
                      .style("display", "none");

var bars = chart.selectAll(".bar")
	      .data(choco)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .style("fill", function(d) { return colorScale(d.milk)})
		      .attr("x", function(d) { return x(d.cocoa) - 20; })
		      .attr("width", 40)
		      .attr("y", function(d) { return y(d.milk); })
		      .attr("height", function(d) { return height - y(d.milk); })
		      .on("mouseover", function(d){
		  		d3.select(this)
		  			.transition()
		  			.duration(500)
		  			.attr("x", function(d) { return x(d.cocoa) - 30; })
		  			.style("cursor", "pointer")
		  			.attr("width", 60)
		  			myTool
                      .transition()
                      .duration(500)
                      .style("opacity", "1")                           
                      .style("display", "block")

                    myTool
                      .html(
                      "<div id='thumbnail'><span>" + d.name + "</span><img src='" + d.image + "'/></div>"
                      )
                      .style("left", (d3.event.pageX - 113) + "px")   
                      .style("top", (d3.event.pageY - 190) + "px")

		      })
		      .on("mouseout", function(d){
		  		d3.select(this)
		  			.transition()
		  			.duration(500)
		  			.attr("x", function(d) { return x(d.cocoa) - 20; })
		  			.style("cursor", "normal")
		  			.attr("width", 40)
		  			myTool.transition()
                        .duration(500)
                        .style("opacity", "0")            
                        .style("display", "none")

		      });
