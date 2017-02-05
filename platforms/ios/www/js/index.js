var routingLayer;

function setupRoutingAPI(ghRouting,lat,lng) {


        ghRouting.addPoint(new GHInput(lat,lng));

        if (ghRouting.points.length > 1) {
            // ******************
            //  Calculate route! 
            // ******************
            ghRouting.doRequest(function (json) {
                if (json.message) {
                    var str = "An error occured: " + json.message;
                    if (json.hints)
                        str += json.hints;
                        console.log(str);

                } else {
                    var path = json.paths[0];
                    routingLayer.addData({
                        "type": "Feature",
                        "geometry": path.points
                    });

                    // var outHtml = "Distance in meter:" + path.distance;
                    // outHtml += "<br/>Times in seconds:" + path.time / 1000;
                    // outHtml += "<br/><a href='" + ghRouting.getGraphHopperMapsLink() + "'>GraphHopper Maps</a>";
                    // $("#routing-response").html(outHtml);

                    // if (path.bbox) {
                    //     var minLon = path.bbox[0];
                    //     var minLat = path.bbox[1];
                    //     var maxLon = path.bbox[2];
                    //     var maxLat = path.bbox[3];
                    //     var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
                    //     map.fitBounds(tmpB);
                    // }

                    // instructionsDiv.empty();
                    // if (path.instructions) {
                    //     var allPoints = path.points.coordinates;
                    //     var listUL = $("<ol>");
                    //     instructionsDiv.append(listUL);
                    //     for (var idx in path.instructions) {
                    //         var instr = path.instructions[idx];

                    //         // use 'interval' to find the geometry (list of points) until the next instruction
                    //         var instruction_points = allPoints.slice(instr.interval[0], instr.interval[1]);

                    //         // use 'sign' to display e.g. equally named images

                    //         $("<li>" + instr.text + " <small>(" + ghRouting.getTurnText(instr.sign) + ")</small>"
                    //                 + " for " + instr.distance + "m and " + Math.round(instr.time / 1000) + "sec"
                    //                 + ", geometry points:" + instruction_points.length + "</li>").
                    //                 appendTo(listUL);
                    //     }
                    // }
                }
            });
        }

    routingLayer = L.geoJson().addTo(map);
    routingLayer.options = {
        style: {color: "#9C27B0", "weight": 5, "opacity": 0.6}
    };
}

function clearRoutingLayer(ghRouting){
    this.routingLayer.clearLayers();
    ghRouting.clearPoints();
}