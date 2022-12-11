import handleForm from "./handleForm";
import navigate from "./navigate";
import 'bootstrap';
let searches=[];
let position={};
let markers=[];
let urlSearch={
    position:{},
    formattedAddress:"",
    marker:{}
};
let saved_Address=[];
handleForm();
navigate();

export {searches,position,markers,urlSearch,saved_Address};