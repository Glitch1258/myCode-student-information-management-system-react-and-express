import React, { useState } from 'react';

const YourComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/yourEndpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data successfully submitted');
        // Reset the form or perform any additional actions
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:<input type="text" name="name" value={formData.name} onChange={handleChange}/></label><br />
        <label>Email:<input type= "email" name="email" value={formData.email} onChange={handleChange}/></label><br />
        {/* Add more fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YourComponent;
