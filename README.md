<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
  <title>Esri Leaflet Tutorials: Display a map</title>

  <!-- Load Leaflet from CDN -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <!-- Make sure you put this AFTER Leaflet's CSS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <!-- Load Esri Leaflet from CDN -->
  <script src="https://unpkg.com/esri-leaflet@3.0.19/dist/esri-leaflet.js"></script>
  <script src="https://unpkg.com/esri-leaflet-vector@4.3.2/dist/esri-leaflet-vector.js"></script>

  <style>
    body {
      margin: 0;
      padding: 0;
    }

    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      color: #111111;
      height: 300px;
    }
  </style>

</head>

<body>
  <div id="map">
  </div>

  <!--   <script>
    const accessToken = "AAPTxy8BH1VEsoebNVZXo8HurCShovku2bLXkR3pULH9EY3RFUF27eS7OPUHrJyXx0HhwZ7UUP5hGYkX_yMUJQQ9XJ02ENf3IPs3kT_RbxYTrh6ZmSPVLF8uwjIwVM5dMRbGtfv1RbIeXDcJpjdJI03yDQTa-4OgPkWHSGIJUGfaTXnBbE4oZS5qvTdXp6KUlrF5AegRxstLc_MOy96IPVs5uUDGDugZ_-GwlHvyOiC0678.AT1_2uBgmqoc";
    const map = L.map("map", {
      minZoom: 2
    });
    map.setView([30, -20], 3);
    const basemapEnum = "arcgis/outdoor";
    L.esri.Vector.vectorBasemapLayer(basemapEnum, {token: accessToken}).addTo(map);
  </script> -->

  var map = L.map("map").setView([43.0, -123.3], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const POIs = L.esri
  .dynamicMapLayer({
    url:    "https://gis.co.douglas.or.us/server/rest/services/Common/DC_Expanded_POI_List/MapServer"
  })
  .addTo(map);

POIs.bindPopup(function (layer) {
return L.Util.template("<b>{Name}</b><br>{Type}</br>");
});

// POIs.bindPopup(function (layer) {
//   return L.Util.template(
//     "<b>{name}</b><br>{type}</br>",
//     layer.feature.properties
//   );
// });

var buildings = L.esri.dynamicMapLayer({
  url:
    "https://gis.co.douglas.or.us/server/rest/services/Common/Buildings/MapServer",
opacity: 0.2});
buildings.addTo(map);

var parcels = L.esri.featureLayer({
  url:
    "https://gis.co.douglas.or.us/server/rest/services/Common/DouglasCountyCommonMappingBase/MapServer/7",
  style: () => {
    return {
      color: "#f42e2e",
      dashArray: "2, 1",
      dashOffset: "2",
      weight: "0.7",
      fillColor: "White",
      fillOpacity: 0
    };
  }
});

parcels.addTo(map);

parcels.bindPopup(function (layer) {
return L.Util.template("<b>{PROP_ID}</b><br>{SitusAddress}</br>", layer.feature.properties);
});
</body>

</html>
