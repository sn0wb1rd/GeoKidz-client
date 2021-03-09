import React,  {useState, useEffect} from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const LayerControl = () => {

    return (
    <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Esri | Topo colour ">
            <TileLayer
            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'"
            />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="OpenStreetMap | Topo colour ">
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="National Geographic | colour">
            <TileLayer
            attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom= {12}
            />
        </LayersControl.BaseLayer> 
        <LayersControl.BaseLayer name="The Treasure map">
            <TileLayer
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}"
            subdomains={'abcd'}
            minZoom= {1}
            maxZoom= {16}
            ext= {'jpg'}
            />
        </LayersControl.BaseLayer> 
        <LayersControl.BaseLayer name="OpenStreetMap | Topo grey">
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
        </LayersControl.BaseLayer> 
        <LayersControl.BaseLayer name="Satelliet">
            <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            minZoom= {6}
	        maxZoom= {19}
	        bounds= {[[50.5, 3.25], [54, 7.6]]}
            />
        </LayersControl.BaseLayer> 
        <LayersControl.BaseLayer name="Night map ">
            <TileLayer
            attribution='Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
            url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}"
            time={''}            
            bounds= {[[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]]}
            minZoom= {1}
            maxZoom= {8}
            format= {'jpg'}
            tilematrixset= {'GoogleMapsCompatible_Level'}
            />
        </LayersControl.BaseLayer> 
        
    </LayersControl>
    )
}

export default LayerControl;