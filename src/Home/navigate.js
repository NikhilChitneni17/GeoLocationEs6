import { Loader } from "@googlemaps/js-api-loader";
import {searches,markers,urlSearch} from "./index.js";
import "./index.css";

function navigate() {
  let map,mapWindow,marker,latLng,markerUrl;
  let place=document.getElementById("map");
/**
 * readUrl reads the Url and returns the paramaters in the Query String 
 */
function readUrl() {
    let url=window.location.search;  //returns parameters
    let params=new URLSearchParams(url);
    return params;
}

const loader = new Loader({
    apiKey: "AIzaSyCtqSZ-0fMP2eTqFYa4qXUPeRqDcv6h2bI",
    version: "weekly",
  });
  loader.load().then(() => {
    map = new google.maps.Map(place, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    mapWindow=new google.maps.InfoWindow;
    // map.setCenter({lat:30,lng:30});
  }).then(()=>{
    let params=readUrl();
    console.log(params.get("location"));
    if(params.get("location")!=null)
    {
      console.log(params.get("lat"),params.get("lng"));
      let coords={lat:Number(params.get("lat")),lng:Number(params.get("lng"))}
      addMarkerUrl(coords,params.get("location"));
    }
       /**
       * Event Delegation to Add Marker to the Map */ 
      document.getElementById("table_container").addEventListener("click",function(e){

        console.log(e.target,e.target.innerHTML);
        let temp1,temp2;
        searches.forEach((element,i) => {
          element.formattedAddresses.forEach((el,j) => {
            if(e.target.innerHTML==el)
            {
              temp1=i;
              temp2=j;
            }
          });
        });
           
          return addMarker(searches[temp1].positions[temp2],searches[temp1],temp2);
      })
       /**
       * Adds Marker to the Map based on position(Lat,Lng) decoded from the URLSearchParams
       * @param {object} coords position coordinates
       */
      function addMarkerUrl(coords,location)
      {
          console.log(urlSearch["formattedAddress"]);
        mapWindow.setPosition(coords);
        console.log("formadd");
          mapWindow.setContent("Location="+urlSearch["formattedAddress"]);         
        mapWindow.open(map);                         
          console.log("addMarkerUrl");
        markerUrl = new google.maps.Marker({
            position:coords,
            map:map
        });
        markers.push(markerUrl);
        google.maps.event.addListener(markerUrl,"click",function(e){
            console.log(urlSearch);
          mapWindow.setContent("Location="+urlSearch["formattedAddress"]);
          mapWindow.open(map,markerUrl);
        })
      }
       /**
       * Adds Marker to the Map with the Click on Table cell
       * @param {Object} coords position coordinates
       */
      function addMarker(coords,search,info)
      {
        mapWindow.setPosition(search.positions[info]);
        mapWindow.setContent("Location="+search.formattedAddresses[info]);
        mapWindow.open(map);
        console.log(coords);
           if(coords!={})
         {
            coords.lat=Number(coords.lat);
            coords.lng=Number(coords.lng);
            console.log("addmarker");
            marker =  new google.maps.Marker({
              position:coords,
              map:map
            });
            console.log("executed");
         }
         markers.push(marker);
         google.maps.event.addListener(marker,"mouseover",function(e){
            console.log(markers);
            let flatten_positions=[],flatten_formattedAddress=[];
            console.log(searches);
            searches.forEach(element => {
                flatten_positions.push(element.positions);
                flatten_formattedAddress.push(element.formattedAddresses);
            });
            console.log(flatten_positions.flat(),flatten_formattedAddress.flat(),markers);
            //console.log(flatten_positions,flatten_formattedAddress);
            flatten_formattedAddress=flatten_formattedAddress.flat();
            flatten_positions=flatten_positions.flat();
            let tracker;
            flatten_positions.forEach((element,j) => {
                console.log(flatten_positions.length,e.latLng.lat(),e.latLng.lng());
                if( (e.latLng.lat()==element.lat) && (e.latLng.lng()==element.lng) )
                {
                    tracker=j;
                    console.log(tracker,j);
                }
            });
            markers.forEach(element => {
                if(flatten_positions[tracker].lat==element.position.lat())
                {
                    console.log(marker.position.lat());
                    mapWindow.setContent("Location="+flatten_formattedAddress[tracker]);
                    mapWindow.open(map,element);
                    //console.log(e.latLng.lat());
                }
                
            });
        });
      
    }
  });   
}
  export default navigate;
  