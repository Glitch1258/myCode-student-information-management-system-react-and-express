function getListOfStudentsForClass(grade, con, callback) {
  con.query(
    `SELECT * FROM persons WHERE class=${grade}`,
    function (err, result, fields) {
      if (err) {
        callback(err, null);
        return;
      }
      //console.log(JSON.stringify(result))
      //console.log(result);
      callback(null, result);
    }
  );
}

function getListOfAllStudents(con, callback) {
  con.query(`SELECT * FROM persons`, function (err, result, fields) {
    if (err) {
      callback(err, null);
      return;
    }
    //console.log(JSON.stringify(result))
    //console.log(result);
    callback(null, result);
  });
}

function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

function createNewEntry(name, id, grade, gpa, con) {
  con.query(
    "INSERT INTO persons (name, id, class, gpa) VALUES (?, ?, ?, ?)",
    [name, id, grade, gpa],
    function (err, result, fields) {
      if (err) {
        console.error("Entry couldn't be made");
        throw err;
      }
      //console.log("success");
    }
  );
}

function deleteEntry(id, con) {
  con.query(`DELETE FROM persons WHERE id = ${id}`, (err, result) => {
    if (err) throw err;
    //console.log("deleted")
  });
}

function getClassById(id, con, callback) {
  con.query("SELECT class FROM persons WHERE id = ?", [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    const studentClass = result[0].class;
    //console.log("Class retrieved:", studentClass);
    callback(null, studentClass);
  });
}

function updateEntryById(updatedData, con) {
  const { key, value, id } = updatedData;
  // Check if the value is a string, and if so, wrap it in single quotes
  const formattedValue = typeof value === "string" ? `'${value}'` : value;

  con.query(
    `UPDATE persons SET ${key} = ${formattedValue} WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Entry updated successfully");
    }
  );
}

// function getEntryById(id, con) {
//   con.query("SELECT * FROM persons WHERE id = "+id, (err, result) => {
//     if (err) {throw err;}
//     const student = result[0];
//     console.log("Class retrieved:", student);
//   });
// }

function getEntryById(id, con, callback) {
  con.query("SELECT * FROM persons WHERE id = " + id, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    const student = result[0];
    //console.log("Entry retrieved successfully:", student);
    callback(null, student);
  });
}

function getAuthenticated(userName, password, con, callback) {
  con.query(
    "SELECT * FROM admins WHERE userName = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
}

module.exports = {
  sayHello,
  getListOfStudentsForClass,
  createNewEntry,
  deleteEntry,
  getClassById,
  updateEntryById,
  getEntryById,
  getListOfAllStudents,
  getAuthenticated,
};
