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

//Here's all the logic for changing color
//map size
width1 = 200;
height1 = 200;
//temporary tf check
Test = 10;
Test2 = 10;
//Debug functions from earlier
/*Let's set classes for the paths*/
/*Function for the clicking*/
$(document).on('click',"#TopLane", function() {
    clear()
    console.log("TOP");
    runBar('top')
    //this - tag, causing a weird double click bug. selecting with specific elem names
    var Lane = d3.select("#TopLane");
    ColorArea(Lane);
    //TODO call method for toplane winrate graph
});
$(document).on('click',"#MidLane", function() {
    clear()
    console.log("MID");
    runBar('mid')
    var Lane = d3.select("#MidLane");
    ColorArea(Lane);
    //TODO call method for Midlane winrate graph
});
$(document).on('click',"#Jungle", function() {
    clear()
    runBar('jg')
    var Rift = d3.select("#SvgRiftMap");
    var Jungle = d3.select("#Jungle");
    //other lanes stored as vars for style changes
    var MidLane = d3.select("MidLane");
    var TopLane = d3.select("MidLane");
    var BotLane = d3.select("#BotLane");
    
    //crude bug testing log for now.
    //doesn't work correctly, requires 2 clicks
    if(Test === 10) {
        //fill with orange if selected first time
        Jungle.style("fill", "rgb(255,165,0)");
        //all other lanes with their og color
        
        console.log("Jungle is orange");
        console.log(Test);
        Test = 10;
    }
    //TODO method call to Junglewinrate
    JungleWinGraph();
});
$(document).on('click',"#BotLane", function() {
    clear()
    console.log("BOT");
    runChord()
    runBar("bot")
    //window.location.href = "GoldTest.html"
    var Lane = d3.select("#BotLane");
    ColorArea(Lane);
    
    MakeRadioButtons();
});
//color lane with desired highlight and remove color from others
function clear() {
    d3.select("#Jungle").style("fill", "rgb(136, 187, 68)");
    d3.select("#MidLane").style("fill", "rgb(255, 238, 170)");
    d3.select("#BotLane").style("fill", "rgb(255, 238, 170)");
    d3.select("#TopLane").style("fill", "rgb(255, 238, 170)");
    
    //TESTING TODO return on hover fill properties
    d3.select("#Jungle").on('mouseover', function(d) {
        d3.select(this).style("fill", "rgb(210, 105, 30);");
    });
    
    //Clearing div elements of old stuff
    $("#winRateChart").empty();
    $("#ChordDiagram" ).empty();
    $("#GoldChart").empty();
}
//TODO remove this and check that it doesn't affect other methods
function ColorArea(Lane) {
    //var Rift = d3.select("#SvgRiftMap");
    var Jungle = d3.select("#Jungle");
    console.log("Lane");


    Lane.style("fill", "rgb(255,165,0)");
    Jungle.style("fill", "rgb(136, 187, 68)");
    console.log(Test2);
    Test2 = 10;
    console.log("1st time Lane selected");
}

//TODO radio button for support and adc winrates
function MakeRadioButtons() {
    var adc = document.getElementById("#winRateChart").createElement("INPUT");
    adc.setAttribute("type", "radio");
    adc.checked = true;
    
    var sup = document.getElementById("#winRateChart").createElement("INPUT");
    sup.setAttribute("type", "radio");
}