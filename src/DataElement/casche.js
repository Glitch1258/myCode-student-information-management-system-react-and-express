function queryUpdate(key,value,id){
    con.query(
      "UPDATE persons SET "+value+" = ? WHERE id = ?",
      [value,key, id],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log("Entry updated successfully");
      }
    );
  }


  if(key=="name"){}
  if(key=="class"){}
  if(key=="gpa"){}












  const handleMount = async () => {
   
    
    var formData = {
      key:props.DataElementTitle,
      value:inputData,
      id:props.DataId
    }

    try {
      const response = await fetch('http://localhost:3000/getListOfAllStudents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        console.log(responseData.message); // Access the JSON data
       // Reset the form or perform any additional actions
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };






  (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {loginError && <p>{loginError}</p>}
    </div>
  )