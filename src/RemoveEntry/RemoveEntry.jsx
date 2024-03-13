import React, { useState } from "react";
import Style from "./removeEntry.module.css"

function RemoveEntry() {
  const [studentId, setStudentId] = useState();
  const [idToRemove, setidToRemove] = useState("");

  function handlesetStudentIdInputChange(event) {
    setidToRemove("Id to remove :")
    setStudentId(event.target.value);
  }
  const handleSubmit = async (e,) => {
    e.preventDefault();
    var formData = {
      key:"id",
      value:studentId,
    }
    document.getElementById("removeEntryInputField").value=""

    try {
      const response = await fetch('http://localhost:3000/removeById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        var resposneData = await response.json()
        console.log(resposneData.message)
        document.getElementById("removeEntryInputField").placeholder = `Removed student ID ${studentId}`
        document.getElementById("dataEntryForId "+studentId).remove()
        setidToRemove("")
        setStudentId(null)
        
        // Reset the form or perform any additional actions
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
   
      <form className = {Style.entryFormStyle} onSubmit={handleSubmit}>
        <h3> RemoveEntry</h3>
        <label> {idToRemove}{studentId} <br /><input type="number"  name={"id"} onChange={handlesetStudentIdInputChange} id="removeEntryInputField" placeholder="Enter Id to be removed" required/></label><br/>
        <input type="submit" value={"Remove from database"}  />
      </form>
 
  );
}

export default RemoveEntry;
