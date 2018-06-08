//variables
var dataArray = [25, 35, 50, 70, 100];
var cWitdth = 600;
var cHeigth = 600;
var maxWinrate = 100;

var widthScale = d3.scaleLinear()
    .domain([0, maxWinrate])
    .range([0, cWitdth]);

var color = d3.scaleLinear()
    .domain([0,maxWinrate])
    .range(["red","blue"]);

var canvas = d3.select("body")
    .append("svg")
    .attr("width", cWitdth)
    .attr("height", cHeigth)
    .append("g")
    .attr("transform", "translate(10, 50)");

//group and transform the axis
canvas.append("g")
      //arranging it bottom
    .attr("transform", "translate(0, 300)")
      //calling axis
      .call(d3.axisBottom(widthScale).ticks(5));

var bars = canvas.selectAll("rect")
                 .data(dataArray)
                 .enter()
                 .append("rect")
                 .attr("width", barWidth)
                 .attr("height", 40)
                 .attr("fill", colorFromData)
                 .attr("y", yPosition);

function colorFromData(d) {return color(d);}
// assisting functions
function barWidth(d) {return widthScale(d);}
function yPosition(d, i) {return i * 60}