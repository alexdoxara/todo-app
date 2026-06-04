<template>
  <div id="app">
    <h1>My Todo List</h1>

    <div class="input-container">
      <input 
        v-model="newTodoText" 
        @keyup.enter="addTodo" 
        placeholder="What needs to be done?" 
      />
      <button @click="addTodo">Add Task</button>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <span @click="toggleTodo(todo)">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);
const newTodoText = ref('');
const API_URL = 'http://localhost:3000/api/todos';

// Get todos from backend
const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    todos.value = response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

// Send a new todo to the backend
const addTodo = async () => {
  if (!newTodoText.value.trim()) return;
  try {
    const response = await axios.post(API_URL, { text: newTodoText.value });
    todos.value.push(response.data);
    newTodoText.value = '';
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

// Delete a todo
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    todos.value = todos.value.filter(t => t.id !== id);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

// Toggle completion
const toggleTodo = async (todo) => {
  try {
    await axios.put(`${API_URL}/${todo.id}`);
    todo.completed = !todo.completed;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

onMounted(fetchTodos);
</script>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f3f4f6; /* Subtle light gray background */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px; /* Original clean width constraints */
  box-sizing: border-box;
}

h1 {
  margin-top: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 24px;
}

/* --- Input Section --- */
.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #3b82f6;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #2563eb;
}

/* --- List Section --- */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

li span {
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  user-select: none;
}

/* --- Completed State --- */
li.completed {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

li.completed span {
  text-decoration: line-through;
  color: #9ca3af;
}

/* --- Delete Button Specifics --- */
li button {
  background-color: #ef4444;
  padding: 6px 12px;
  font-size: 14px;
}

li button:hover {
  background-color: #dc2626;
}
</style>
