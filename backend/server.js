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


app.get("/api/students", (req, res) => {
    console.log("Request received for students endpoint.");
    res.sendFile(path.join(`${fFolder}/students.json`));
})

app.get("/api/students/1", (req, res) => {
    console.log("Request to display student #1 received.");
    fs.readFile("../frontend/students.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
        const students = JSON.parse(data)
        res.send(students.filter(student => student.id === 1));
        }
    })
})  


app.get("/api/students/active", (req, res, next) => {
    console.log("Request received for active students endpoint.");
    fs.readFile("../frontend/students.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
            const students = JSON.parse(data)
            const activeStudents = students.filter(student => student.status === true);
            res.send(activeStudents)
        }
    })
})

app.get("/api/students/finished", (req, res, next) => {
    console.log("Request received for passive students endpoint.");
    fs.readFile("../frontend/students.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
            const students = JSON.parse(data)
            res.send(students.filter(student => student.status === false));
        }
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
