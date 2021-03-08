import React, {useState} from "react";
import axios from "axios";
import config from "../config";
import { useHistory } from "react-router-dom";

function EditMapItem (props) {
    console.log(props) 
    const [selectedMapItem, setSelectedMapItem] = useState(null)   
    const {mapitems, user, onEdit} = props
    let mapitemId = props.match.params.mapitemId
    
    // console.log('mapitems ', mapitems)
    // console.log('mapitem ID ', mapitemId)

    let filteredMapItem = mapitems.find(elem => elem._id == mapitemId)
    console.log(filteredMapItem)




    return (
        <div>
             this is the page: edit mapitem
             {/* <div><img src={filteredMapItem.image} alt="round-map" className="round-map"></img></div>
             <div>Name: {filteredMapItem.itemname}</div>
             <div>Owner: {filteredMapItem.owner}</div> */}

             <div>Check in the map if the location is correct and give a new description of the new location</div>

                <form onSubmit={() => {onEdit(filteredMapItem)}} className="form">
                    <input name="locdesc" type="text" className="register-input" id="LocationDescription" placeholder="Give a new description" />
                    <button type="submit"  className="btn centered-btn">Save the new location!</button>

                </form>





        </div>
    )
}

export default EditMapItem;