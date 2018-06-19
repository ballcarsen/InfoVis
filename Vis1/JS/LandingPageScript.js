/*
  * Replace all SVG images with inline SVG
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

//Here's all the logic for changing color
//Debug functions from earlier
/*Let's set classes for the paths*/
/*Function for the clicking*/
$(document).on('click',"#TopLane", function() {
    clear();
    runBar('top');
    var Lane = d3.select("#TopLane");
    ColorArea(Lane);
    HideRadioButtons();
});

$(document).on('click',"#MidLane", function() {
    clear();
    runBar('mid');
    var Lane = d3.select("#MidLane");
    ColorArea(Lane);
    HideRadioButtons();
});

$(document).on('click',"#Jungle", function() {
    HideRadioButtons();
    clear();
    runBar('jg');
    var Jungle = d3.select("#Jungle");
    
    Jungle.style("fill", "rgb(255,165,0)");
});

//calling the botlane winrate graph and radio buttons for class selection
$(document).on('click', "#BotLane", BotLane);
function BotLane(SupOrAdc) {
    clear();
    var Lane = d3.select("#BotLane");
    ShowRadioButtons(SupOrAdc);
    
    if (SupOrAdc === "bot" || SupOrAdc === "support") {
        console.log("test me");
        runBar(SupOrAdc);
        runChord();
    }
    else {
        console.log("BOT");
        runChord();
        runBar("bot")
}
    ColorArea(Lane);
}

//color lane with desired highlight and remove color from others
function clear() {
    d3.select("#Jungle").style("fill", "rgb(136, 187, 68)");
    d3.select("#MidLane").style("fill", "rgb(255, 238, 170)");
    d3.select("#BotLane").style("fill", "rgb(255, 238, 170)");
    d3.select("#TopLane").style("fill", "rgb(255, 238, 170)");
    
    //TODO which didn't happen for this project. Return the on hover properties for the map
    d3.select("#Jungle").on('mouseover', function(d) {
        d3.select(this).style("fill", "rgb(210, 105, 30);");
    });
    
    //Clearing div elements of old stuff
    $("#winRateChart").empty();
    $("#ChordDiagram" ).empty();
    $("#GoldChart").empty();
}
//Color the lanes according to selection
function ColorArea(Lane) {
    //var Rift = d3.select("#SvgRiftMap");
    var Jungle = d3.select("#Jungle");

    Lane.style("fill", "rgb(255,165,0)");
    Jungle.style("fill", "rgb(136, 187, 68)");
}

//Show and hide radio buttons
function ShowRadioButtons(SupOrAdc) {
    var x = document.getElementById("RadioButtons");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    if (SupOrAdc !== "support") {
        document.getElementById("BOT").checked = true
    }
    clear();
}
function HideRadioButtons() {
    var x = document.getElementById("RadioButtons");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}