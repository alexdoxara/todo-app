<template>
  <div id="app">
    <h1>My Todo List</h1>

  <!-- Input Section -->
  <div class="container">
    <input v-model="newTodoText" @keyup.enter="addTodo" placeholder="Enter your next todo">
    <button @click="addTodo">Add</button>
  </div>

<!-- List Section -->
  <ul>
      
    <li v-for="todo in todos" :key="todo.id" :class="{completed: todo.completed}">
    <span @click="toggleTodo(todo)">{{ todo.text }}</span>
    <button @click="deleteTodo(todo.id)">Delete</button>
    </li>
  </ul>
  </div>
 
</template>


<script setup>
// importing needed fuctionality

import {ref, onMounted} from 'vue';
import axios from 'axios';

const todos = ref ([]);
const newTodoText = ref('');
const API_URL = 'http://localhost:3000/api/todos'

// Get todos from backend when page loads

const fetchTodos = async ()=>{
  const response = await axios.get(API_URL);
  todos.value = response.data;
};

// Send a new todo to the backend
const addTodo = async () =>{
  if (!newTodoText.value) return;
  const response = await axios.post(API_URL, {text: newTodoText.value});
  todos.value.push(response.data);
  newTodoText.value="";
};

// Delete a todo
const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  todos.value = todos.value.filter(t=> t.id !== id);
};

// Toggle completion status
const toggleTodo = async (todo) =>{
  await axios.put(`${API_URL}/${todo.id}`);
  todo.completed = !todo.completed;
}

onMounted(fetchTodos)

</script>

<style>
.completed { text-decoration: line-through; color: gray; }
.input-container { margin-bottom: 20px; }
li { cursor: pointer; margin: 10px 0; display: flex; gap: 10px; }
</style>