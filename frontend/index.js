//import axios from './node_modules/axios';
//import { useState, useEffect } from "react";

async function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 24.886, lng: -70.268 }
      //mapTypeId: "terrain",
    });

    function drawPolygon(name, coords, color) {
        return new google.maps.Polygon({
            map,
            paths: coords,
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            draggable: true,
            geodesic: true,
            polygon_name: name,
        });
    }

    const blueCoords = [
        { lat: 25.774, lng: -60.19 },
        { lat: 18.466, lng: -46.118 },
        { lat: 32.321, lng: -44.757 },
    ];
    const redCoords = [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
    ];


    const listcoords = {"bluepoly": blueCoords, "redpoly": redCoords};
    
    async function getPolygons(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    let polygons = await getPolygons('http://localhost:8000');
    polygons = JSON.parse(polygons)
    console.log(polygons)
    
 
    for(const name in polygons){
        //console.log(polygons[name])
        let parsed = JSON.parse(polygons[name])
        const coords = parsed.coordinates
        //const coordz = polygons.name.coordinates
        //console.log(coordz);
        var polygon = drawPolygon(name, coords, "0000FF");
        //var polygon_name = name.slice(0, name.length);
        
        google.maps.event.addListener(polygon, 'dragend', function(e){
            let poly_path = [];
            console.log(this.polygon_name)
            this.getPath().forEach(element => {
                console.log("lat: " + element.lat() + " lng: " + element.lng());
                poly_path.push({lat: element.lat(), lng: element.lng()})
        });

        
        var json_data = {};
        json_data["name"] = this.polygon_name
        json_data["coordinates"] = poly_path
        //json_data[this.polygon_name] = {"coordinates": poly_path};
        console.log(JSON.stringify(json_data));

        fetch('http://localhost:8000/drag', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_data),
        }).then(response => response.json())
        .then(data => console.log(data))
        });
    }
   
}






//window.initMap = initMap;
initMap();