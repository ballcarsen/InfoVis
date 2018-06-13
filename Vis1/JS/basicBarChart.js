function run() {
//variables
    var dataArray = [25, 35, 50, 70, 100];
    var cWitdth = 600;
    var cHeigth = 600;
//TODO get maxwinrate from data or scale around 40-70%
    var maxWinrate = 100;

//How wide is the scale and how wide is the SvgRiftMap
    var widthScale = d3.scaleLinear()
        .domain([0, maxWinrate])
        .range([0, cWitdth]);

//Colors scale according to the difference of the winrates bigger difference = more distinct color
    var color = d3.scaleLinear()
        .domain([0, maxWinrate])
        .range(["red", "blue"]);

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
        //calling axis with 5 ticks
        .call(d3.axisBottom(widthScale).ticks(5));

// Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

//appending the bars to the chart
    var bars = canvas.selectAll("rect")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", 40)
        .attr("fill", colorFromData)
        .attr("y", yPosition)
        //testing tooltips
        .on("mouseover", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9)
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

// assisting functions
function colorFromData(d) {return color(d);}
function barWidth(d) {return widthScale(d);}
function yPosition(d, i) {return i * 60}

