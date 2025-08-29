import React, { useState } from 'react';
import './app.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const handleAddTodo = () => {
    const trimmed = input.trim();
    if (trimmed === '') return;
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };
  const toggleTodo = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };
  const deleteTodo = (id) => {
    const filtered = todos.filter(todo => todo.id !== id);
    setTodos(filtered);
  };
  const clearCompleted = () => {
    const active = todos.filter(todo => !todo.completed);
    setTodos(active);
  };
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-container">
      <h2>📝 To-do List</h2>

      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span>{activeCount} task{activeCount !== 1 ? 's' : ''} left</span>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default TodoList;