//TODO refine and associate the gold data to work with specific champions

//TODO separate html from js and css

//TODO configure the example file to work with our data types
    // Currently it applies to date-types, simplify the code

//TODO role to role gold comparisons
    //TODO Scale 2 charts uniformly over time for comparisons DONE
    
//TODO consolidate all 3 visualizations

//TODO Create a nice selector for champions in the linked vis


//TODO formatting and refining code for our purposes 22.5.2018
var	margin = {top: 30, right: 40, bottom: 70, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

//TODO Remove
var	parseDate = d3.time.format("%d-%b-%y").parse;

//TODO remove this time.scale, replace with 0-MatchLength
var	x = d3.time.scale().range([0, width]);
var	y0 = d3.scale.linear().range([height, 0]);
var	y1 = d3.scale.linear().range([height, 0]);

var	xAxis = d3.svg.axis().scale(x)
                 .orient("bottom").ticks(5);

//Just axis scale, regardless of actual data, CAREFUL
var	yAxisLeft = d3.svg.axis().scale(y0)
                     .orient("left").ticks(5);

//TODO try and remove two different scales y1 == right scale
//This represents the scale of data, regardless of the results
var	yAxisRight = d3.svg.axis().scale(y1)
                      .orient("right").ticks(5);

var	valueline = d3.svg.line()
                     .x(function(d) { return x(d.date); })
                     .y(function(d) { return y0(d.close); });

var	valueline2 = d3.svg.line()
                      .x(function(d) { return x(d.date); })
                      .y(function(d) { return y1(d.open); });

var	svg = d3.select("body")
               .append("svg")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
               .attr("transform",
                   "translate(" + margin.left + "," + margin.top + ")");

//TODO get our own data as champion average gold over time
var data = [
    {"date":"9-Apr-12","close":436,"open":9.04},
    {"date":"7-Apr-12","close":221,"open":4.02},
    {"date":"5-Apr-12","close":113,"open":9.02},
    {"date":"4-Apr-12","close":64,"open":32.05},
    {"date":"3-Apr-12","close":29,"open":46.03},
    {"date":"2-Apr-12","close":18,"open":51.03}
];

// Get the data
data.forEach(function(d) {
    //TODO d.time = +d.time (from the file)
    d.date = parseDate(d.date);
    d.close = +d.close;
    d.open = +d.open;
});

//TODO remove date associations and replace with minutes
// Input the extent of the data
x.domain(d3.extent(data, function(d) { return d.date; }));

//TODO extent of gold income - how much is the max
y0.domain([0, d3.max(data, function(d) {
    return Math.max(d.close); })]);
y1.domain([0, d3.max(data, function(d) {
    //TODO close - open scales with open elements
    return Math.max(d.close); })]);





//Assisting functions, do not touch for now unless you want to format presentation

svg.append("path")
   .attr("class", "line")
   .attr("id", "blueLine")
   .attr("d", valueline(data));

svg.append("path")
   .attr("class", "line")
   .style("stroke", "red")
   .attr("id", "redLine")
   .attr("d", valueline2(data));

svg.append("g")
   .attr("class", "x axis")
   .attr("transform", "translate(0," + height + ")")
   .call(xAxis);

// edit the Y Axis Left
svg.append("g")
   .attr("class", "y axis")
   .style("fill", "black")
   .attr("id", "blueAxis")
   .call(yAxisLeft);

svg.append("g")
   .attr("class", "y axis")
   .attr("transform", "translate(" + width + " ,0)")
   .style("fill", "black")
   .attr("id", "redAxis")
   .call(yAxisRight);

// Add the blue line title
svg.append("text")
   .attr("x", 0)
   .attr("y", height + margin.top + 10)
   .attr("class", "legend")
   .style("fill", "steelblue")
   .on("click", function(){
       // Determine if current line is visible
       var active   = blueLine.active ? false : true,
           newOpacity = active ? 0 : 1;
       // Hide or show the elements
       d3.select("#blueLine").style("opacity", newOpacity);
       //TODO rename from blue axis
       d3.select("#blueAxis").style("opacity", newOpacity);
       // Update whether or not the elements are active
       blueLine.active = active;
   })
   .text("Blue Line");

// Add the red line title
svg.append("text")
   .attr("x", 0)
   .attr("y", height + margin.top + 30)
   .attr("class", "legend")
   .style("fill", "red")
   .on("click", function(){
       // Determine if current line is visible
       var active   = redLine.active ? false : true ,
           newOpacity = active ? 0 : 1;
       // Hide or show the elements
       d3.select("#redLine").style("opacity", newOpacity);
       //TODO rename from redAxis
       d3.select("#redAxis").style("opacity", newOpacity);
       // Update whether or not the elements are active
       redLine.active = active;
   })
   .text("Red Line");