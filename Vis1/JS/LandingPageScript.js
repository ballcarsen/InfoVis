/*
  * Replace all SVG images with inline SVG - no need to touch this
  */
$(function() {
    
    $('img.svg').each(function() {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        
        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

// Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

// Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

// Replace image with new SVG
            $img.replaceWith($svg);
            
        }, 'xml');
        
    });
    
});

//Attempting a selector, unsuccesfully. Target is the svg element Path elements or the map itself
//TODO make a functioning selector for path elements
var map = d3.select("#Rift");
var selectedPath = d3.select("#Jungle");

//TODO fill path element on click with a color for testing
selectedPath.on("click", function() {
      d3.select(this)
        .style("fill", "orange");
});

var circle = d3.selectAll("circle");

circle.on('click', function() {
    circle.style("fill", "blue");
});
























//Debug functions from earlier
/*Let's set classes for the paths*/
/*Function for the clicking*/
$(document).on('click',"#TopLane", function() {
    console.log("TOP");
    
    
});
$(document).on('click',"#MidLane", function() {
    console.log("MID");
    
    
});
$(document).on('click',"#Jungle", function() {
    /*$("#Jungle").toggleClass('.select.path#Jungle');*/
    console.log("Jungle");
    
    
});
$(document).on('click',"#BotLane", function() {
    console.log("BOT");
    window.location.href = "GoldTest.html"
    
});
