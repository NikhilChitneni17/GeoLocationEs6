import SearchReq from "./search";
import checkForUrl from "./checkForUrl";
import {searches} from "./index.js";
/**
 * Handles the search form and creates search object for every search 
 */
function handleForm() {
    let key="AIzaSyCtqSZ-0fMP2eTqFYa4qXUPeRqDcv6h2bI";
    
    let searchreq = new SearchReq(key);
    console.log(searches);
    searches.push(searchreq);
    let address=document.getElementById("address");
    let table=searchreq.createTable("Formatted Address");
    document.getElementById("table_container").appendChild(table);
    document.addEventListener("submit",function(e){
        e.preventDefault();
        return searchreq.geocode(address,key,searchreq);
    });
    checkForUrl(key);
}


export default handleForm;