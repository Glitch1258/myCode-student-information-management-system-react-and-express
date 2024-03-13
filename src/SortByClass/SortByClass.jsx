

import React, { useState } from "react";
import Style from "./sortByClassStyle.module.css"

function SortByClassForm(props) {
  const [studentClass, setstudentClass] = useState();

  function handlesetstudentClassInputChange(event) {
    setstudentClass(event.target.value);
  }


  const handleSubmit = async (e,) => {
    e.preventDefault();
    
    var formData = {
      key:"class",
      value:studentClass,
    }

    try {
      const response = await fetch('http://localhost:3000/sortByClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
       // console.log(JSON.parse(responseData.message)); // Access the JSON data
        var parsedData = JSON.parse(responseData.message)
        props.setStudentInformations([])
        props.setStudentInformations(parsedData)
        console.log(parsedData)
       
       
        
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };





  const handleSubmitForm2 = async (e,) => {
    e.preventDefault();
    
    var formData = {
      key:"class",
      value:studentClass,
    }

    try {
      const formData = {};
      const response = await fetch('http://localhost:3000/getListOfAllStudents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const parsedData = JSON.parse(responseData.message);
        props.setStudentInformations(parsedData); // Update studentInformations state with fetched data
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  return (
    
    <div className = {Style.entryFormStyle}>
   
      <form className = {Style.entryFormStyle} onSubmit={handleSubmit}>
        <h3>SortByClassForm</h3>

        <label htmlFor="studentClass"> student Class : {studentClass} <br/>
        <input type="number"  name="studentClass" onChange={handlesetstudentClassInputChange} placeholder="Enter class to sort by"required/>
        </label>
        <input type="submit" value={"sort by class"} />
      </form>

      <form className = {Style.entryFormStyle} onSubmit={handleSubmitForm2}>
      <input  type="submit" value={"get list of all students"} />
      </form>
      </div>
      

 
  );
}

export default SortByClassForm;
