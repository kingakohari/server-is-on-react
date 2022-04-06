const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

const port = 9000;

const fFolder = `${__dirname}/../frontend`

app.get("/", (req, res, next) => {                  
    res.sendFile(path.join(`${fFolder}/index.html`));
}) 



app.get("/api/v1/students", (req, res) => {
    console.log("Request received for students endpoint.");
    res.sendFile(path.join(`${fFolder}/students.json`));
})

app.get("/api/v1/students-query", (req, res) => {
    console.dir(req.query)
    console.dir(req.query.apiKey)
    if (req.query.apiKey === "apple") {
        res.sendFile(path.join(`${fFolder}/students.json`))
    } else {
        res.send("Unauthorized request")
    }
})

/* app.get("/api/v1/users-params/:key", (req, res) => {
    console.dir(req.params)
    console.log(req.params.key)
    if (req.params.key === "apple") {
        res.send("Azt írtad be, hogy alma")
    } else {
        res.send("Nem azt írtad be, hogy alma")
    }   
}) */


/* app.get("/api/v1/users/active", (req, res, next) => {
    console.log("Request received for active users endpoint.");
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
            const users = JSON.parse(data)
            const activeUsers = users.filter(user => user.status === "active");
            res.send(activeUsers)
        }
    })
})

app.get("/api/v1/users/passive", (req, res, next) => {
    console.log("Request received for passive users endpoint.");
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
            const users = JSON.parse(data)
            res.send(users.filter(user => user.status === "passive"));
        }
    })
}) */

app.get("/api/v1/students-params/:key", (req, res, next) => {
    console.dir(req.params)
    console.log(req.params.key)
    fs.readFile("../frontend/students.json", (error, data) => {
         if (req.params.key === true) {
            const students = JSON.parse(data)
            const activeStudents = students.filter(student => student.status === true);
            res.send(activeStudents)
        } else if (req.params.key === false){
            const students = JSON.parse(data)
            const passiveStudents = students.filter(student => student.status === false);
            res.send(passiveStudents)
        } else res.send("An error occurred")
    })
})

app.post("/students/new", (req, res) => {
    fs.readFile("../frontend/students.json", (error, data) => {
        if (error) {
            console.log(error);
            res.send("Error reading students file")
        } else {
            const students = JSON.parse(data)
            console.log(req.body);
            students.push(req.body)
            
            fs.writeFile("../frontend/students.json", JSON.stringify(students), error => {
                if (error) {
                    console.log(error);
                    res.send("Error writing students file")
                }
            })
            res.send(req.body)
        }
    })
})



app.use('/pub', express.static(`${fFolder}/public`));

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})