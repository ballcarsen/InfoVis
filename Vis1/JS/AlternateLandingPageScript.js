// CREATE SVG DRAWING CANVAS
var canvas = d3.select("#canvasdiv")
               .append("svg")
               .attr("id", "canvas")
               .attr("width", 1000)
               .attr("height", 600);

// CREATE CONTAINER BOX FOR SVG FILE
var innerSvg = canvas.append("svg")
                     .attr("id", "iSvg")
                     .attr("x", 0)
                     .attr("y", 0)
                     .append("g");

//TODO append svg directly to HTML and work it in d3


//IMPORT SVG FILE
//d3.xml("img/vectSummonersRift.svg").mimeType("image/svg+xml").get(function(error, xml) {
//   var importedNode = document.importNode(xml.documentElement, true);
//    d3.select("#iSvg").node().appendChild(importedNode);
//});

//Old method for redundancy
//d3.xml("img/vectSummonersRift.svg").mimeType("image/svg+xml").get(function(error, xml) {
//    if (error) {console.log(error); return;}
//    document.body.appendChild(xml.documentElement);
//});

//not working
d3.select("importedNode").on("click", function f() {
    d3.select("importedNode").transition()
        .delay(200)
        .duration(1200)
       .style("width", 100 + 'px')
       .style("height", 100 + 'px')
});
//not working
if(importedNode != null){
    importedNode.on("click", function() {
        innerSvg.transition()
                .attr("cy", 200)
                .attr("cx", 150)
                .delay(200)
                .duration(1200)
                .style("width", 100 + 'px')
                .style("height", 100 + 'px')
    });
}