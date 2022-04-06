const parseJSON = async (url) => {
    const response = await fetch (url)
    return response.json()
}

const studentComponent = ({id, name, status}) => {
    return `
    <div>
        <h2>${id}</h2>
        <h1>${name}</h1>
        <h1>${status}</h1>
    </div>
    `
}

const addStudentComponent = () => {
    return`
    <div>
        <input type="text" class="name" name="name" placeholder="Name">
        <button class="addNew">Send</button>
    </div>
    `
}



const loadEvent = async () => {


    const result = await parseJSON("/api/students")
    console.log(result);
    const  rootElement = document.getElementById("root")
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(student => studentComponent(student)).join("")
    )

    rootElement.insertAdjacentHTML("afterend", addStudentComponent())

    const button = document.querySelector(".addNew")
    const name = document.querySelector(".name")
    const id =  result.length + 1

    button.addEventListener("click", event => {
        const studentData = {
            id: id,
            name: name.value,
            status: true,
        }
    
        fetch("/students/new", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(studentData)
            })
            .then(async data => {
                const student = await data.json()

                rootElement.insertAdjacentHTML("beforeend", studentComponent(student))
            })        
    })
}

window.addEventListener("load", loadEvent)