import "./storage.css";
import navigation from "./navigation";
import 'bootstrap';
/**
 * createTable creates the table dynamically with sectionhead as heading and returns the table
 * @param {string} sectionhead 
 */
function createTable(sectionhead) {
    let table=document.createElement("table");
    table.setAttribute("id","formatted_address"); 
    let head=document.createElement("tr");
    let heading=document.createElement("th");
    heading.innerHTML=sectionhead;
    head.appendChild(heading);
    head.classList.add("thead");
    table.appendChild(head);
    table.classList.add("table");
    return table;
}

let table=createTable("Formatted Address");
table.setAttribute("id","formatted");
document.getElementById("table_container").appendChild(table);
navigation();