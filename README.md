#How create a tooltip in D3.js
**Name:** Maria Cristina Di Termine
**Category:** D3.js Framework

**Date:** May 2015

A tooltip is a piece of information that will appear when the mouse is hovered over a specific element of the view. Some people call it with different names such as "hover box", "infotip" or "hint" but a sure thing is that it is a useful tool to show informations and it can also be a stylish touch on our project.
I'd like to show you how I make a tooltip in a D3.js project.
First of all, I created a generic bar chart about a simple argument: chocolate. I have two values: the percentage of Milk (Y) and the percentage of Cocoa (X).
At the end on my graph I will get 4 different chocolate bars with different taste! What I need to do is specify which kind of chocolate bar I have using name such as "lightchoco", "milkchoco", etc.
I will show these name of chocolate inside my tooltip, using probably also an extra picture.

![barchart](https://raw.githubusercontent.com/Mariacristina88/D3.js-Tooltip/master/screenshot.png)
----------------------------------------------------------------------

##Tooltip

Now that we have our bar chart, we can create the tooltip. To do this we need to create a DIV which is setted initially 'display none' because it should not be shown right now but only when we will hover one specific bar. We also add to the DIV the class "mytooltip" to implement some CSS attributes later on and we also set the opacity of the DIV as 0 which will be useful to make a simple transition when the tooltip appear.

<pre lang="js">
var myTool = d3.select("body")
                  .append("div")
                  .attr("class", "mytooltip")
                  .style("opacity", "0")
                  .style("display", "none");
</pre>


After making the tooltip, we will need to make it appear when the mouse is hovered over a specific bar. To do this, we have to use the technique related to mouse 'events' always in D3.js. This event watches the view and when 'something' happens with the mouse on the screen, it does an action. We have different types of mouse events such as "mousedown", "mouseup" and "click", but we need to use only "mouseover" (triggered by an element when the mouse comes over it) and "mouseout" (triggered by an element when the mouse goes out of it). 

We can also decide to create a little animation on the bar when we hover it like this for example:

<pre lang="js">
.on("mouseover", function(d){  //Mouse event
		  		d3.select(this)
		  			.transition()
		  			.duration(500)
		  			.attr("x", function(d) { return x(d.cocoa) - 30; }) //The bar moves to the left a bit
		  			.style("cursor", "pointer")
		  			.attr("width", 60) //The bar becomes larger
</pre>

The elements on which we want to select to show the tooltip, are the bars. So we need to add the mouse events to the bar elements. 
Now we can call myTool inside the mouse events and set it on 'display block' with opacity 1.

<pre lang="js">
	  .on("mouseover", function(d){  //Mouse event
			d3.select(this)
				.transition()
				.duration(500)
				.attr("x", function(d) { return x(d.cocoa) - 30; })
				.style("cursor", "pointer")
				.attr("width", 60)
				myTool
	          .transition()  //Opacity transition when the tooltip appears
	          .duration(500)
	          .style("opacity", "1")                           
	          .style("display", "block")  //The tooltip appears
	  })
	  .on("mouseout", function(d){  //Mouse event
			d3.select(this)
				.transition()
				.duration(500)
				.attr("x", function(d) { return x(d.cocoa) - 20; })
				.style("cursor", "normal")
				.attr("width", 40)
				myTool
					.transition()  //Opacity transition when the tooltip disappears
	            .duration(500)
	            .style("opacity", "0")            
	            .style("display", "none")  //The tooltip disappears
	  });
</pre>

Now our tooltip works! We only need to show the informations inside it! To do this we just apply one html string with everything we need: 

<pre lang="js">
myTool
  .html(
  "<div id='thumbnail'><span>" + d.name + "</span><img src='" + d.image + "'/></div>")
  .style("left", (d3.event.pageX - 113) + "px")   
  .style("top", (d3.event.pageY - 190) + "px")
</pre>

Let's keep everything together:

<pre lang="js">
var bars = chart.selectAll(".bar")
	      .data(choco)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .style("fill", function(d) { return colorScale(d.milk)})
		      .attr("x", function(d) { return x(d.cocoa) - 20; })
		      .attr("width", 40)
		      .attr("y", function(d) { return y(d.milk); })
		      .attr("height", function(d) { return height - y(d.milk); })
		      .on("mouseover", function(d){  //Mouse event
		  		d3.select(this)
		  			.transition()
		  			.duration(500)
		  			.attr("x", function(d) { return x(d.cocoa) - 30; })
		  			.style("cursor", "pointer")
		  			.attr("width", 60)
		  			myTool
                      .transition()  //Opacity transition when the tooltip appears
                      .duration(500)
                      .style("opacity", "1")                           
                      .style("display", "block")  //The tooltip appears

                    myTool
					  .html(
					  "<div id='thumbnail'><span>" + d.name + "</span><img src='" + d.image + "'/></div>")
					  .style("left", (d3.event.pageX - 113) + "px")   
					  .style("top", (d3.event.pageY - 190) + "px")
		      })
		      .on("mouseout", function(d){  //Mouse event
		  		d3.select(this)
		  			.transition()
		  			.duration(500)
		  			.attr("x", function(d) { return x(d.cocoa) - 20; })
		  			.style("cursor", "normal")
		  			.attr("width", 40)
		  			myTool
		  				.transition()  //Opacity transition when the tooltip disappears
                        .duration(500)
                        .style("opacity", "0")            
                        .style("display", "none")  //The tooltip disappears
		      });
</pre>

To finish, in order to make our tooltip fanciful, let's add a bit of CSS more:

**CSS**
<pre lang="css">
.mytooltip {
  position:absolute;
  text-align: center;
  width: 200px;
  height:auto;
  background-color: #EDE3D1;
  border-radius: 10px;
  color: #787777;
  padding: 6px 12px;
  z-index:3;
}

.mytooltip:after {
  box-sizing: border-box;
  display: inline;
  width: 100%;
  line-height: 1;
  color: #EDE3D1;
  content: "\25BC";
  position: absolute;
  text-align: center;
  margin: -3px 0 0 0;
  top: 100%;
  left: 0;
}

.mytooltip span {
    display: block;
    text-align: center;
    width: 200px;
    height: auto;
    margin: 5px auto;
  }

#thumbnail {
    width: 200px;
    height: auto;
    margin: 0 auto;
    color: #787777;
    text-align: center;
  }

</pre>

Enjoy :D
