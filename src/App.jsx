import React from "react";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">React Todo List</h1>
      <TodoList />
    </div>
  );
};

export default App;
