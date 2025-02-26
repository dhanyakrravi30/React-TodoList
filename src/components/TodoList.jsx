import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const handleUpdateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingTodoId(null);
    setEditingText("");
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="card shadow p-4 w-100 mx-auto" style={{ maxWidth: "500px" }}>
     
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo} className="btn btn-primary">
          Add
        </button>
      </div>

      
      <div
        className="border rounded p-2"
        style={{
          maxHeight: "300px", 
          overflowY: "auto",  
        }}
      >
        <ul className="list-group">
          {todos.length === 0 ? (
            <li className="list-group-item text-center text-muted">No tasks added yet</li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo.id)}
                  />
                  {editingTodoId === todo.id ? (
                    <input
                      type="text"
                      className="form-control d-inline w-75"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  ) : (
                    <span className={todo.completed ? "text-decoration-line-through text-muted" : ""}>
                      {todo.text}
                    </span>
                  )}
                </div>

                <div className="btn-group">
                  {editingTodoId === todo.id ? (
                    <button onClick={handleUpdateTodo} className="btn btn-success btn-sm">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEditTodo(todo.id, todo.text)} className="btn btn-warning btn-sm">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteTodo(todo.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
