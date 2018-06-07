d3.xml("img/vectSummonersRift.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);
});