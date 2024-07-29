import { useState, useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Icon from "ol/style/Icon";
import { fromLonLat, toLonLat } from "ol/proj";
import scooterIcon from "./bike.png";
import "ol/ol.css";
import Style from "ol/style/Style";

const MapComponent = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      map.current = new Map({
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

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lon = position.coords.longitude;
          const lat = position.coords.latitude;
          updateMapView(lon, lat);
          setLatitude(lat);
          setLongitude(lon);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );

      // Add click event listener
      map.current.on("click", (event) => {
        const coordinates = map.current.getCoordinateFromPixel(event.pixel);
        const lonLat = toLonLat(coordinates);
        setLatitude(lonLat[1]);
        setLongitude(lonLat[0]);
        updateMapView(lonLat[0], lonLat[1]);
      });
    }
  }, []);

  const updateMapView = (lon, lat) => {
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

    const vectorSource = map.current.getLayers().item(1).getSource();
    vectorSource.clear();
    vectorSource.addFeature(iconFeature);

    map.current.getView().setCenter(fromLonLat([lon, lat]));
    map.current.getView().setZoom(15); // Adjust zoom level as needed
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);
    if (!isNaN(lon) && !isNaN(lat)) {
      updateMapView(lon, lat);
    } else {
      console.error("Invalid latitude or longitude");
    }
  };

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <form onSubmit={handleSearch} className="searchContainer">
        <input
          type="text"
          className="search"
          placeholder="Search latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          className="search"
          placeholder="Search longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MapComponent;
