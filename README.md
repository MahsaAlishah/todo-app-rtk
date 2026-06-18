# Todo App with Redux Toolkit

A simple and practical Todo application built with **React** and **Redux Toolkit (RTK)** that demonstrates how to manage **asynchronous state** using **createAsyncThunk** and interact with a **REST API (json-server)** using **Axios**.

This project showcases a clean architecture for handling async CRUD operations in Redux Toolkit.

---

## Features

- Add new todos  
- Toggle todo completion status  
- Delete todos  
- Fetch todos from API  
- Async state management with Redux Toolkit  
- Loading and error state handling  
- Clean UI using Bootstrap  
- Organized Redux logic using slices  

---

## Tech Stack

- React  
- Redux Toolkit  
- React Redux  
- Axios  
- JSON Server  
- Bootstrap  

---

## Project Structure

```
src
 ┣ components
 ┃ ┗ Todos
 ┃   ┣ AddTodoForm.jsx
 ┃   ┣ TodoItem.jsx
 ┃   ┗ TodoList.jsx
 ┣ features
 ┃ ┣ store.js
 ┃ ┗ todo
 ┃   ┗ todoSlice.js
 ┣ App.jsx
 ┗ main.jsx
```

---

## Redux Logic Overview

The application uses **Redux Toolkit Slice + Async Thunks** to manage asynchronous operations.

### Async Actions

- `getAsyncTodos` → Fetch todos from API  
- `addAsyncTodos` → Add a new todo  
- `toggleAsyncTodos` → Toggle completed status  
- `deleteAsyncTodos` → Delete a todo  

### State Structure

```javascript
{
  loading: false,
  todos: [],
  error: ""
}
```

Redux automatically handles:

- pending
- fulfilled
- rejected

states for async requests.

---

## API (json-server)

Example database structure:

```json
{
  "todos": [
    {
      "title": "todo three",
      "id": 1695746023934,
      "completed": true
    }
  ]
}
```

API Base URL:

```
http://localhost:5000/todos
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/todo-rtk.git
```

Install dependencies:

```bash
npm install
```

---

## Run JSON Server

```bash
npx json-server --watch db.json --port 5000
```

---

## Run the App

```bash
npm run dev
```

or

```bash
npm start
```

---

## How Async Flow Works

Example flow when adding a todo:

1. User submits the form  
2. `dispatch(addAsyncTodos())` is triggered  
3. `createAsyncThunk` sends a POST request using Axios  
4. Redux handles pending / fulfilled states  
5. New todo is added to Redux state  
6. UI automatically updates  

---

## UI Components

### AddTodoForm
Handles adding new todos and dispatching async actions.

### TodoList
Fetches todos on component mount using `useEffect`.

### TodoItem
Handles:

- toggling todo completion
- deleting a todo

---

## Learning Goals

This project demonstrates:

- Practical usage of **Redux Toolkit**
- Managing async logic with **createAsyncThunk**
- API integration using **Axios**
- Clean separation between **UI and state management**
- Handling **loading and error states**
