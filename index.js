const express = require ('express');
const server = express();
server.use(express.json());

server.get("/healt", function (req, res) {
    res.json({
        status: "Running"
    })
})

let tasks = [
    {
        "id": 1,
        "name": "Comprar leite",
        "description": "Ir no mercado comprar leite",
        "isDone": false
    },
]

server.get("/tasks", (req, res) =>{
    res.json({
        tasks
    })
})

server.post("/tasks", (req, res) =>{
    console.log(req.body)
    const newTaks = {
        id: tasks.length+1,
        name: req.body.name,
        description: req.body.description,
        isDone: req.body.isDone
    }
    tasks.push(newTaks);
    res.json({
        tasks: newTaks
    })
})

server.put("/tasks/:id", (req, res) =>{
    const id = Number(req.params.id);
    const task = tasks.find((tasks) =>{
        return tasks.id === id;
    })
    if(!task){
        return res.status(404).json({message: "Task is not found"});
    }
    task.name = req.body.name,
    task.description = req.body.description,
    task.isDone = req.body.isDone,
    res.json({
        tasks
    })
})

server.delete("/tasks/:id", (req, res) =>{
    const id = Number(req.params.id);
    tasks = tasks.filter((tasks) =>{
        return tasks.id !== id;
    })
    res.send("Task deleted");
    res.status(204).send();
    
})

const port = 8080;
server.listen(port, () => {
    console.log(`Server is Running ${port}`);
});