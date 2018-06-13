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
    console.log("TOP");
    runBar('top')
    //this - tag, causing a weird double click bug. selecting with specific elem names
    var Lane = d3.select("#TopLane");
    ColorArea(Lane);
    //TODO call method for toplane winrate graph
});
$(document).on('click',"#MidLane", function() {
    console.log("MID");
    var Lane = d3.select("#MidLane");
    ColorArea(Lane);
    //TODO call method for Midlane winrate graph
});
$(document).on('click',"#Jungle", function() {
    /*$("#Jungle").toggleClass('.select.path#Jungle');*/
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
        TopLane.style("fill", "rgb(255, 238, 170)");
        BotLane.style("fill", "rgb(255, 238, 170)");
        MidLane.style("fill", "rgb(255, 238, 170)");
        console.log("Jungle is orange");
        console.log(Test);
        Test = 5;
    }
    else{
        //fill with green if second
        Jungle.style("fill", "rgb(136, 187, 68)");
        console.log(Test);
        Test = 10;
        Test2 = 5;
        console.log("Jungle 2nd time Lane selected");
    }
    /*
    var t = d3.transition()
      .duration(750).ease(d3.easeLinear);
    Rift.transition(t)
      .style("width", width1 + 'px')
      .style("height", height1 + 'px');
    */
    //TODO method call to Junglewinrate
    JungleWinGraph();
});
$(document).on('click',"#BotLane", function() {
    console.log("BOT");
    runChord()
    //window.location.href = "GoldTest.html"
    var Lane = d3.select("#BotLane");
    ColorArea(Lane);
    //TODO call method for toplane winrate graph
    BotLaneWinGraph();
});
//color lane with desired highlight and remove color from others
function ColorArea(Lane) {
    var Rift = d3.select("#SvgRiftMap");
    var Jungle = d3.select("#Jungle");
    console.log("Lane");
    
    if(Test2 === 10) {
        //TODO when selected for the first time, select all other elems and change their color
        Lane.style("fill", "rgb(255,165,0)");
        Jungle.style("fill", "rgb(136, 187, 68)");
        console.log(Test2);
        Test2 = 5;
        console.log("1st time Lane selected");
    }
    else{
        //filling with lane color if second time
        Lane.style("fill", "rgb(255, 238, 170)");
        console.log(Test2);
        Test2 = 10;
        Test = 10;
        console.log("Lane selected 2nd time");
    }
    
    /*
    var t = d3.transition()
              .duration(750).ease(d3.easeLinear);
    Rift.transition(t)
        .style("width", width1 + 'px')
        .style("height", height1 + 'px');
    */
    //TODO if condition - orange on click, switch to original
    //TODO method call to winrate
}


//calling the functions for toplane win graphs
//TODO linking the two thingies to call functions
function JungleWinGraph() {
    console.log("JungleLane")
}

function BotLaneWinGraph() {
    console.log("botLane")
}