import { Loader } from "@googlemaps/js-api-loader";
import "./storage.css";
import db from "./firebaseinit";

function navigation() {
    let map,mapWindow,marker;
    let positions={};
    let formattedAddress;
    let data=[];
    let markers=[];
    let place=document.getElementById("map");
    const loader = new Loader({
        apiKey: "AIzaSyCtqSZ-0fMP2eTqFYa4qXUPeRqDcv6h2bI",
        version: "weekly",
      });
      loader.load().then(() => {
        map = new google.maps.Map(place, {
          center: { lat:40.53 , lng: 40.53 },
          zoom: 2,
        });
        mapWindow=new google.maps.InfoWindow;
        // map.setCenter({lat:30,lng:30});
      }).then(()=>{
                /**
         * createRow creates the row dynamically with one value and returns the row
         * @param {string} formattedAddress 
         */
        function createRow(formattedAddress) {
            let row=document.createElement("tr");
            let value=document.createElement("td");
            value.innerHTML=formattedAddress;
            row.appendChild(value);
            return row;
        }
        db.collection("searches").get().then(function(snapshot){
            console.log(snapshot.docs[0].data());
            var saved_data=snapshot.docs[0].data().saved_Address;
            console.log(saved_data);
           // console.log(saved_data.saved_Address.length);
            saved_data.forEach(element => {
                positions.lat=element.Latitude;
                positions.lng=element.Longitude;
                formattedAddress=element.Formatted_address;
                console.log(positions,formattedAddress);
                data.push({positions:Object.assign({},positions),formattedAddress:formattedAddress});               
            });
            console.log(data);
            data.forEach((element,i) => {
                console.log(data);
                let table=document.getElementById("formatted");
                let row=createRow(element.formattedAddress);
                row.classList.add("table-row");
                table.appendChild(row);
                row.addEventListener("click",function(){
                    console.log(this,this.children[0].innerHTML);
                    console.log(data);
                    mapWindow.setPosition(data[i].positions);                  
                    mapWindow.setContent("Location="+data[i].formattedAddress);  
                    map.setCenter(data[i].positions);                   
                    map.setZoom(16);                               
                    mapWindow.open(map);                            
                  });
                addMarker(data[i]);
            });
        })
        /**
         * Adds Marker to the Map with the Click on Table cell
         * 
         * @param {object} nav_data 
         */
        function addMarker(nav_data) {
                  
                  console.log(nav_data.positions);
                  console.log("addmarker");
                  marker =  new google.maps.Marker({
                    position:nav_data.positions,
                    map:map
                  });
                  console.log("executed");
                  markers.push(marker);
               google.maps.event.addListener(marker,"mouseover",function(e){
                //mapWindow.setPosition(data.positions);
                markers.forEach(element => {
                    if(nav_data.positions.lat==element.position.lat())
                    {
                        mapWindow.setContent("Location="+nav_data.formattedAddress);
                        mapWindow.open(map,element);
                    }
                });  
               });
               google.maps.event.addListener(marker,"click",function(e){
                markers.forEach(element => {
                    if(nav_data.positions.lat==element.position.lat())
                    {
                        map.setCenter({lat:element.position.lat(),lng:element.position.lng()})
                        map.setZoom(16);
                    }
                });
            })
        }
      })
}

export default navigation;