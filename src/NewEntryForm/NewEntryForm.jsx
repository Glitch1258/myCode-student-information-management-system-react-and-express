
import EntryStyle from "./newEntryStyle.module.css"
import React, { useState } from 'react';


function NewEntryForm() {
  const [studentName, setStudentName] = useState();
  const [studentClass, setStudentClass] = useState();
  const [studentId, setStudentId] = useState();
  const [studentgpa, setStudentgpa] = useState();
  function handleStudentNameInputChange(event){
    setStudentName(event.target.value)
  }
  function handleStudentClassInputChange(event){
     setStudentClass(event.target.value)
  }
  function handlesetStudentIdInputChange(event){
    setStudentId(event.target.value)
  }
  function handleStudentgpaInputChange(event){
    setStudentgpa(event.target.value)
  }

  const handleSubmit = async (e,) => {
    e.preventDefault();
    
    var formData = {
      name:studentName,
      id:studentId,
      grade:studentClass,
      gpa:studentgpa,
    }
    // hear UP HEAR

    try {
      const response = await fetch('http://localhost:3000/createNewEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        document.getElementById("newStudentName").value=""
        document.getElementById("newStudentId").value=""/// these used to be up there^
        document.getElementById("newStudentClass").value=""
        document.getElementById("newStudentGpa").value=""
        document.getElementById("sameId_error").innerHTML=""


        console.log('Data successfully submitted',response.status);
        document.getElementById("newStudentName").placeholder = "name entered :"+studentName
        document.getElementById("newStudentId").placeholder = "Id entered :"+studentId
        document.getElementById("newStudentClass").placeholder = "Class entered :"+studentClass
        document.getElementById("newStudentGpa").placeholder = "Gpa entered :"+studentgpa
      } else{
        
        document.getElementById("sameId_error").innerHTML= "An Id with the same value already exists</br> id needs to be unique"  
        

      }
    } catch (error) {
      console.log("failed to update id")
      
    }
  };
  

  return (
    <>
    
      <form onSubmit={handleSubmit} className={EntryStyle.entryFormStyle}>
      <h3> New student entry form</h3><h5 id="sameId_error"></h5>


          <label htmlFor="studentName"> studentName : {studentName} <br/>
          <input  type="text" id="newStudentName" name="studentName" onChange={handleStudentNameInputChange} placeholder="Enter name" required/></label><br/>


          <label htmlFor="studentID"> student Id : {studentId} <br/>
          <input  type="number" id="newStudentId" name="studentId" onChange={handlesetStudentIdInputChange} placeholder="Enter unique Id" required/></label><br/>


          <label htmlFor="studentClass"> Student Class : {studentClass} <br/>
          <input  type="number" id="newStudentClass" name="studentClass" onChange={handleStudentClassInputChange} placeholder="Enter Class" required/></label><br/>

          <label htmlFor="studentGpa" > student Gpa : {studentgpa} <br/>
          <input  type="number" id="newStudentGpa" name="studentGpa" step="0.01" onChange={handleStudentgpaInputChange} placeholder="Enter Gpa" required/></label><br/>
          <input className={EntryStyle.updatefocus} type='submit' value={"Submit new entry"}/>
        </form>
    
    </>
  );
}

export default NewEntryForm;
