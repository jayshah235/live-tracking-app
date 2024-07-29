import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import scooterIcon from "./bike.png";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialize map
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
          maxZoom: 20,
        }),
      });

      // Function to add a scooter icon
      const addScooterIcon = (lon, lat) => {
        const iconFeature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
        });

        const iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: scooterIcon,
            scale: 0.1,
          }),
        });

        iconFeature.setStyle(iconStyle);

        const vectorSource = new VectorSource();
        vectorSource.addFeature(iconFeature);

        map.getLayers().item(1).setSource(vectorSource);
      };

      // Get current coordinates
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lon = position.coords.longitude;
          const lat = position.coords.latitude;
          addScooterIcon(lon, lat);

          // Update the map view to center on the scooter icon
          map.getView().setCenter(fromLonLat([lon, lat]));
          map.getView().setZoom(15); // Adjust zoom level as needed
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default MapComponent;
