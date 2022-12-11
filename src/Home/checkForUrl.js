import navigate from "./navigate";
import {position,urlSearch} from "./index.js";
/**
 * checkForUrl checks for the parameters in the Query String and if found sends API Request 
 * and gets the Location Details
 * @param {string} key  Google API key
 */
function checkForUrl(key) {
    let url=window.location.search;  //returns parameters
    let params=new URLSearchParams(url);
    let searchLoc=params.get("location");
    let locations;
    console.log("searchloc="+searchLoc);
    if(searchLoc!=null)
    { 
        console.log("happened");
        var xhr=new XMLHttpRequest();
        xhr.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+searchLoc+"&key="+key); 
        xhr.onload=function() {
            console.log(xhr.response);
            locations=xhr.response;
           // url.locations=locations;
           let formattedAddress,position={};
            locations.results.forEach((element,i) => {
                if((locations.results[i].geometry.location.lat==params.get("lat"))) {
                    console.log("executed");
                formattedAddress=locations.results[i].formatted_address;
                position.lat=locations.results[i].geometry.location.lat;
                position.lng=locations.results[i].geometry.location.lng;
                }
                urlSearch.position=position;
                urlSearch.formattedAddress=formattedAddress;
                console.log(position,formattedAddress);
                navigate();              
            });
        }
        xhr.responseType="json";
        xhr.send();
    }
}
  

export default checkForUrl;
   

