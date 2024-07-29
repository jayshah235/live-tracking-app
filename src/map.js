// import React, { useEffect, useRef } from "react";
// import "ol/ol.css"; // Import OpenLayers CSS
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import VectorLayer from "ol/layer/Vector";
// import OSM from "ol/source/OSM";
// import VectorSource from "ol/source/Vector";
// import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
// import { Style, Icon, Fill, Stroke } from "ol/style";
// import { fromLonLat } from "ol/proj";
// import { Draw, Select } from "ol/interaction";

// const MapComponent = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       // Coordinates for the center of India
//       const indiaCenter = fromLonLat([78.9629, 20.5937]); // Longitude, Latitude

//       const vectorSource = new VectorSource({
//         features: [
//           new Feature({
//             geometry: new Point(indiaCenter),
//           }),
//         ],
//       });

//       new Map({
//         target: mapRef.current,
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//           new VectorLayer({
//             source: vectorSource,
//             style: new Style({
//               image: new Icon({
//                 src: "path/to/icon.png",
//                 scale: 0.1,
//               }),
//             }),
//           }),
//         ],
//         view: new View({
//           center: indiaCenter,
//           zoom: 5, // Adjust zoom level as needed
//         }),
//         interactions: [
//           new Draw({
//             source: vectorSource,
//             type: "LineString", // You can also use 'LineString' or 'Polygon'
//           }),
//           new Select({
//             style: new Style({
//               stroke: new Stroke({
//                 color: "#ffcc33",
//                 width: 2,
//               }),
//               fill: new Fill({
//                 color: "rgba(255,255,255,0.2)",
//               }),
//             }),
//           }),
//         ],
//       });
//     }
//   }, []);

//   return <div ref={mapRef} style={{ width: "100%", height: "600px" }}></div>;
// };

// export default MapComponent;
