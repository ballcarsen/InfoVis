//Javascript code that uses d3.js to create a line graph
function runGold(name, lane) {
// set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 90, left: 75},
        width = 1000 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

// define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.time);
        })
        .y(function (d) {
            return y(d.value);
        });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#GoldChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    d3.csv("../processed_data/" + lane + "-rates.csv", function (error, data) {
        if (error) throw error;
        // format the data

        data.forEach(function (d) {
            d.champ = d.champ
            d.time = +d.time;
            d.value = +d.value


        });
//Nest the data to allow for selection based off of the champion name
        var nest = d3.nest()
            .key(function (d) {
                return d.champ
            })
            .entries(data)

        var dataFiltered = nest.filter(function (d) {
            return d.key === name
        })

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.time;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);


        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        svg.append("text")
            .attr("transform", "rotate(0)")
            .attr("x", (width / 4))
            .attr("y", height + 35)
            .text("Selected champion: " + name);

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y))
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 10 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Gold earned");
        // Add the valueline path
        svg.selectAll(".line")
            .data(dataFiltered)
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("d", function (d) {
                return valueline(d.values)
            });

    });
}