const mysql = require('mysql');
const express = require('express')

const app = express()

app.use(express.json())

// Create a connection pool
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Blogs',
  port: 3307
});

// Create the blogs table
// connection.query(`
//   CREATE TABLE blogs (
//     sn INT,
//     section VARCHAR(500),
//     sub_section VARCHAR(500),
//     authority VARCHAR(255),
//     won BOOLEAN,
//     PRIMARY KEY (Sn)
//   )
// `, (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Blogs table created successfully');
//   }
// });

// Create orders table
// connection.query(`
//     CREATE TABLE Orders (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         person_name VARCHAR(255),
//         blogs_id INT,
//         FOREIGN KEY (id) REFERENCES blogs (sn)
//     )
// `, (error, results, fields) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log('Orders table created successfully');
//       }
//     })

// connect to MySQL
connection.connect((err) => {
    if (err) {
      console.log('Error connecting to MySQL database: ' + err.message);
      return;
    }
    console.log('Connected to MySQL database!');
  });

app.post("/create", (req, res) => {
    const {sn, section, sub_section, authority, won} = req.body;

    const sql = 'INSERT INTO blogs (sn, section, sub_section, authority, won) VALUES (?,?,?,?,?)'
    connection.query(sql, [sn, section, sub_section, authority, won], (err, result) => {
        if (err) {
            console.log('Error inserting record into MySQL: ' + err.message);
            return res.status(500).json({ error: 'Error inserting record into MySQL!' });
          }
          console.log('Record inserted into MySQL successfully!');
          return res.status(200).json({ message: 'Record inserted into MySQL successfully!' });
    })
})

app.post("/order", (req,res) => {
    const { person_name, blogs_id } = req.body;

    const sql = 'INSERT INTO Orders (person_name, blogs_id) VALUES (?,?)'
    connection.query(sql, [person_name, blogs_id], (err, result) => {
        if (err) {
            console.log('Error inserting record into MySQL: ' + err.message);
            return res.status(500).json({ error: 'Error inserting record into MySQL!' });
          }
          console.log('Record inserted into MySQL successfully!');
          return res.status(200).json({ message: 'Record inserted into MySQL successfully!' });
    })
})

app.put("/updateblog/:id", (req,res) => {
    const id = req.params.id;
})

app.listen(3300, () => {
    console.log('Server started on port 3300!');
  });
