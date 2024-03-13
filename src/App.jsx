import DataEntry from "./DataEntry/DataEntry.jsx";
import NewEntryForm from "./NewEntryForm/NewEntryForm.jsx";
import RemoveEntry from "./RemoveEntry/RemoveEntry.jsx";
import SortByClassForm from "./SortByClass/SortByClass.jsx";
import { useEffect, useState } from "react"; // Import useState hook
import EntryStyle from "./NewEntryForm/newEntryStyle.module.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsLoggedIn(true);
        setLoginError("");
        console.log(responseData.message);
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("An error occurred while logging in");
      setIsLoggedIn(false);
    }
  };

  //=================================================================================================================
  const [studentInformations, setStudentInformations] = useState([]); // Initialize state for studentInformations

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = {};
        const response = await fetch(
          "http://localhost:3000/getListOfAllStudents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const parsedData = JSON.parse(responseData.message);
          setStudentInformations(parsedData); // Update studentInformations state with fetched data
        } else {
          console.error("Failed to fetch data");
          setUsername("");
          setPassword("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the asynchronous function immediately
  }, []); // Empty dependency array indicates this effect runs only once on mount
  // Render only when studentInformations is populated
  return (
    <>
      <div>
        {isLoggedIn ? (
          <p>Welcome, {username}!</p>
        ) : (
          <div className={EntryStyle.entryFormStyle}>
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
        )}
      </div>
      {(studentInformations.length && isLoggedIn) > 0 ? (
        <>
          {studentInformations.map((object, index) => (
            <DataEntry key={index} index={index} studentInformation={object} />
          ))}
          <br />
          <NewEntryForm />

          <br />
          <br />
          <RemoveEntry />
          <br />
          <br />
          <SortByClassForm setStudentInformations={setStudentInformations} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
