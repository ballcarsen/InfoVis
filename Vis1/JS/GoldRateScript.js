// set the dimensions and margins of the graph
function runGold(name, lane) {
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

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
    d3.csv("../top-rates.csv", function (error, data) {
        if (error) throw error;
        // format the data

        data.forEach(function (d) {
            d.champ = d.champ
            d.time = +d.time;
            d.value = +d.value


        });

        var nest  = d3.nest()
            .key(function(d){
            return d.champ
        })
        .entries(data)

        var dataFiltered = nest.filter(function (d) { return d.key === name })

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.time;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.value;
        })]);




        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
                // Add the valueline path.
        svg.selectAll(".line")
            .data(dataFiltered)
            .enter()
            .append("path")
                .attr("class", "line")
                .attr("d", function(d) {
                    return valueline(d.values)
                });

    });
}