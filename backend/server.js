// Import the intalled packages
const express = require ('express');
const cors = require ('cors');

//Initialize the app
const app = express();
const PORT = 3000;

//Middleware 
app.use(cors());//Allows the frontend to talk to the backend
app.use(express.json()); //Allows the server to read JSON data sent in the body of a request


//An Array to store the todos
let todos =[
]
//API Endpoints

//GET: Send the list of todos to the user
app.get('/api/todos', (req,res) =>{
    res.json(todos);
});

//POST: Receive a new todo and save it
app.post('/api/todos', (req,res)=>{
    const newTodo = {
        id: Date.now(), //Use a timestamp as an ID
        text: req.body.text,
        completed: false
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);

});

//DELETE: Remove a todo by its ID
app.delete ('/api/todos/:id', (req,res)=>{
    const{id} = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).send();
});

//PUT: Update a todo (mark as completed or change text)
app.put('/api/todos/:id', (req,res) => {
    const {id} = req.params;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo){
        todo.completed = !todo.completed;
        res.json(todo);
    }else{
        res.status(404).send("Todo not found")
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http:localhost:${PORT}`)
})

