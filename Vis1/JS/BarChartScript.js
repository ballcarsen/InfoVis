function runBar(fileName){
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 90, left: 75},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#winRateChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
var tooltip = d3.select("#winRateChart").append("div").attr("class", "toolTip");
// get the data
d3.json("../"+ fileName + "-wins.json", function(error, data) {
  if (error) throw error;

  data.sort(function(a, b) {
      return b.games - a.games;
  });
  data.forEach(function(d) {
    d.rate = +d.rate;
  });

  // scale the range of the data
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, 100]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.rate); })
      .attr("height", function(d) { return height - y(d.rate); })
      .on("mousemove", mousemover)
      .on("click", clicked)
      .on("mouseout", function(d){tooltip.style("display", "none");});




  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
  svg.append("text")
      .attr("transform", "rotate(0)")
      .attr("x", (width / 4))
      .attr("y", height + 70)
      .text("Champions Ordered By Games Played");


  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Win Rate %");

});
function mousemover(d){
    tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(d.name + "- Games: " + d.games + ", Win Rate: " + d.rate + "%");

}
function clicked(d){
    //Dont terminate
    $( "#GoldChart" ).empty()
    runGold(d.name, fileName)
    console.log(d.name)

}
}