import {position,saved_Address} from "./index.js";
import db from "../Storage/firebaseinit";
import "./index.css";
class SearchReq {
    constructor(key) {
        this.locations="";
        this.positions=[];
        this.formattedAddresses=[];
        this.formattedAddresses;
        this.table;
        this.rows=[];
        this.key=key;
    }
    geocode() {
        console.log(this);
        let that=this;
        let xhr=new XMLHttpRequest();
        xhr.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+address.value+"&key="+this.key); 
        xhr.onload=function() {
            console.log(xhr.response);
            that.locations=xhr.response;
            that.clickableRows(that);
            console.log(typeof(xhr.response.results))
        }
        xhr.responseType="json";
        xhr.send();
        // const req = new Request("https://maps.googleapis.com/maps/api/geocode/json?address="+address.value+"&key="+key,{
        //     method: "GET",
        // });
        // fetch(req).then(res)
    }
    createTable(sectionhead) {
        this.table=document.createElement("table");
        this.table.setAttribute("id","formatted_address"); 
        let head=document.createElement("tr");
        let heading=document.createElement("th");
        heading.innerHTML=sectionhead;
        head.appendChild(heading);
        head.classList.add("thead");
        this.table.appendChild(head);
        this.table.classList.add("table");
        return this.table;
    }
    createRow(formattedAddress) {
        let row=document.createElement("tr");
        let value=document.createElement("td");
        value.innerHTML=formattedAddress;
        row.appendChild(value);
        row.classList.add("styled");
        row.classList.add("row");
        row.classList.add("align-items-center");
        row.classList.add("justify-content-around");
        value.classList.add("col-10");
        return row;
    }
    deleteRows() {
        
        let table_length=this.table.rows.length;
        for(let i=1; i<table_length; i++) {
            this.table.deleteRow(1);
        }
        // table.rows.forEach(element => {
        //     this.table.deleteRow(1);
        //         });
    }
    clickableRows(search) 
    {
        search.deleteRows();
        console.log(this);
        console.log("locations=uyuvyuyug"+search.locations);
        search.locations.results.forEach((element,i) => {
                this.formattedAddress=this.locations.results[i].formatted_address;
                let row=search.createRow(this.formattedAddress);
                let save_button=this.addSaveButton();
                row.appendChild(save_button);
                saved_Address.forEach(element => {
                    if(this.formattedAddress==element.Formatted_address)
                    {
                        save_button.disabled=true;
                    }                  
                });
                this.rows.push(row);
                console.log(i);
                position.lat=Number(search.locations.results[i].geometry.location.lat);
                position.lng=Number(search.locations.results[i].geometry.location.lng);
                search.formattedAddresses.push(search.locations.results[i].formatted_address);
                search.positions.push({lat:search.locations.results[i].geometry.location.lat,lng:search.locations.results[i].geometry.location.lng});
                // formattedAddress=search.locations.results[i].formatted_address;
                // AEL
                row.addEventListener("click",function(){
                    console.log(search);
                    console.log(map);
                    console.log(this,this.children[0].innerHTML);
                    console.log(search.locations);
                    console.log(i);
                    search.urlUpdate(search,this.children[0].innerHTML);
        
                  });
                // Save_button
                save_button.addEventListener("click",function(e){
                    e.stopPropagation();
                    if(!save_button.disabled)
                    {
                    console.log((this.parentNode).children[0].innerHTML);
                    let table_rowdata =(this.parentNode).children[0].innerHTML;
                    let info;
                    search.formattedAddresses.forEach((element,j) => {
                        if(search.formattedAddresses[j]==table_rowdata)
                        {
                            info=j;
                        }
                    });
                    console.log(search.positions[info].lat);
                    let sendSearch= {
                        formatted_address:((this.parentNode).children[0].innerHTML),
                        Latitude:search.positions[info].lat,
                        Longitude:search.positions[info].lng
                    };
                    saved_Address.push(sendSearch);
                        db.collection("searches").get().then(function(snapshot) {
                            console.log(snapshot.docs);
                            if(snapshot.docs.length==0)
                            {
                                db.collection("searches").add({saved_Address});
                            }
                            else {
                            let id=snapshot.docs[0].id;
                            db.collection("searches").doc(id).update({saved_Address});
                            }
                        })
                    save_button.disabled=true;
                }
                });
                this.table.appendChild(row);
        });
      
   }
   urlUpdate(search,table_rowdata) {
        let info;
        search.formattedAddresses.forEach((element,j) => {
            if(search.formattedAddresses[j]==table_rowdata)
            {
                info=j;
            }
        });
        let url="?";
        for(var i in this.positions[info])
        {
            url=url+i+"="+this.positions[info][i];
            url=url+"&"
        }
        url=url+"location="
        url=url+document.getElementById("address").value;
        window.history.pushState({},"",url);
   }
   addSaveButton() {
        let button = document.createElement("input");
        button.setAttribute("id","save");
        button.setAttribute("type","button");
        button.setAttribute("value","save");
        button.classList.add("btn-sm");
        button.classList.add("btn-outline-secondary");
        button.classList.add("col-1");
        button.classList.add("save-button");
        return button;
   }
}


export default SearchReq;