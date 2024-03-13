import Style from "./dataElementStyle.module.css";
import React, { useState,useEffect } from 'react';
function DataElement(props) {
  
  const [inputData, setInputData] = useState("");
  const [updatingTo, setupdatingTo] = useState("");
  //const [displayData, setdisplayData] = useState(props.DataElementData);



  function handleDataInputUpdate(event){
    setupdatingTo("updating to :");
    setInputData(event.target.value);
  }
  const handleSubmit = async (e,) => {
    e.preventDefault();
    
    var formData = {
      key:props.DataElementTitle,
      value:inputData,
      id:props.DataId
    }
    document.getElementById(props.DataId+""+props.index+""+props.DataElementTitle).value=""

    try {
      const response = await fetch('http://localhost:3000/updateDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       
        document.getElementById(props.DataId+""+props.index+""+props.DataElementTitle).placeholder = props.DataElementTitle+" updated to "+inputData
        document.getElementById("paragraphTag"+props.DataId+""+props.DataElementData+""+props.DataElementTitle).innerText = inputData;
        setupdatingTo("")
        setInputData("")
        

        // const responseData = await response.json(); // Parse response JSON
        // console.log(JSON.parse(responseData.message)); // Access the JSON data
        // var parsedData = JSON.parse(responseData.message)
        // props.setStudentInformations(parsedData)
        // console.log(parsedData)
        // if(props.DataElementTitle==="name"){
        //   console.log(parsedData[props.index]["name"])
        // }
        // if(props.DataElementTitle==="class"){
        //   console.log(parsedData[props.index]["class"])
        // }
        // if(props.DataElementTitle==="gpa"){
        //   console.log(parsedData[props.index][["gpa"]])
        // }
        
       // Reset the form or perform any additional actions
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <>
      <div className={Style.dataElementStyles}>
      <form onSubmit={handleSubmit}>
        <label><center>Id : {props.DataId}</center><br/>{props.DataElementTitle}: <p id ={"paragraphTag"+props.DataId+""+props.DataElementData+""+props.DataElementTitle}>{props.DataElementData}</p> <br/>
        {updatingTo}{inputData}<br/>
        <input  id={props.DataId+""+props.index+""+props.DataElementTitle}
         type={props.type} name={props.DataElementTitle} placeholder={`enter ${props.DataElementTitle} to update`}
          onChange={handleDataInputUpdate} step={props.step} max={props.max} min={props.min}/></label><br />
        <button type="submit">Update {props.DataElementTitle}</button>
      </form>
      </div>
    </>
  );
}

export default DataElement;
