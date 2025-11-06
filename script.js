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

// var popup = function generatePopupContent(parcels) {
//   const properties = parcels.properties;
// //  const propid = properties.SitusAddress;
// //  const propid = properties.PROP_ID;
//   return L.Util.template("<b>{PROP_ID}</b><br>{SitusAddress}</br>", parcels.properties);
// };

//parcels.bindPopup().openPopup();



//  function onMarkerClick(e) {
//   	var popup = e.target.getPopup();

//     //alert(popup)
//  		popup.setContent( chart_div );
//  }
//   parcels.bindPopup(function (layer) {
//   return L.Util.template("<b>{PROP_ID}</b><br>{SitusAddr}</br>", layer.feature.properties);
//       });
// var layer = L.marker(latlng).addTo(map);
// layer.addTo(map);
// layer.remove();
