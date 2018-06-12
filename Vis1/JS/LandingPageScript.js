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

width1 = 200;
height1 = 200;
Test = 10;

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
    var Rift = d3.select("#container");
    var Jungle = d3.select(this);
    
    console.log("Jungle");
    
    if(Test === 10) {
        Jungle.style("fill", "rgb(255,165,0)");
        Test = 5;
    }
    else{
        Jungle.style("fill", "rgb(136, 187, 68)");
        Test = 10;
    }
    
    var t = d3.transition()
      .duration(750).ease(d3.easeLinear);
    
    Rift.transition(t)
      .style("width", width1 + 'px')
      .style("height", height1 + 'px');
    //TODO if condition - orange on click, switch to original
    
    //TODO method call to winrate
    
});
$(document).on('click',"#BotLane", function() {
    console.log("BOT");
    window.location.href = "GoldTest.html"
    
});
