// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 120},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

var tooltip = d3.select("body").append("div").attr("class", "toolTip");


/*var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);*/

// set the ranges

var y = d3.scaleLinear()
          .range([0, height]);

var x = d3.scaleBand()
          .range([0,width])
          .padding(0.1)


// define the axis
d3.select(".axis")
  .call(d3.axisBottom(x));

var files = ["top-wins", "jg-wins", "mid-wins", "bot-wins", "support-wins"]

var select = d3.select('body')
               .append('select')
               .attr('class', 'select')
               .on('change', onchange)

var options = select
    .selectAll('option')
    .data(files).enter()
    .append('option')
    .text(function(d) {return d;})

function onchange() {
    selectValue = d3.select('select'.property('value'))
}


/*
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return d.name + "<strong> : Win Rate - </strong> <span style='color:red'>" + d.rate + "%" + "</span> for "
        + d.games + "<strong> games</strong>";
  })
*/

// add the SVG element
var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
//.call(zoom);
//svg.call(tip);

// load the data
d3.json('support-wins.json', function(error, data) {
    data.sort(function(a, b) {
        return b.games - a.games;
    });
    
    data.forEach(function(d) {
        d.name = d.name;
        d.games = d.games;
        d.rate = d.rate;
        
    });
    
    
    // scale the range of the data
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, 100]);
    
    // add axis
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x))
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", "-.8em")
       .attr("dy", "-.55em")
       .attr("transform", "rotate(-90)" );
    
    svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisBottom(y))
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 5)
       .attr("dy", ".71em")
       .style("text-anchor", "end")
       .text("Win Rate %");
    
    // Add bar chart
    svg.selectAll("bar")
       .data(data)
       .sort(function(a, b) { return x0(a.name) - x0(b.name); })
       .enter().append("rect")
       .attr("class", "bar")
       .attr("x", function(d) { return x(d.name); })
       .attr("width", x.rangeBand())
       .attr("y", function(d) { return y(d.rate); })
       .attr("height", function(d) { return height - y(d.rate); })
       //.on('mouseover', tip.show)
       //.on('mouseout', tip.hide)
       .on('click', barFunc);
    
    function type(d) {
        d.rate = +d.rate;
        return d;
    }
});
/*
function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
*/
function barFunc(d) {
    console.log(d.name);
    BotLaneWinGraph();
}
/*
$(document).on('click', ".bar", function(){
//TODO call line chart method ChampGoldRate

	console.log(".bar.");
	BotLaneWinGraph();
});
*/