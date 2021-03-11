
import React,  {setState, useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import Control from 'react-leaflet-control';
import { Link } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const popupContent = {
    textAlign: "center",
    margin: "10px",
    padding: "10px",
  };

const PopupTreasure = (props) => {    
    const {treasure} = props

    return (
        <Popup>
            <div style={popupContent}>
                <h5>Founded Treasure: {treasure.itemname}</h5>
                {treasure.image ? (
                  <img
                    src={treasure.image}
                    alt={treasure.itemname}
                    width="40px"
                    className="stone-popUp"
                  />
                ) : null}
                <h6>Owner: {treasure.owner}</h6>
            </div>
        </Popup>
    )
}

export default PopupTreasure;
