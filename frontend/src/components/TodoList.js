import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, Trash2, Plus } from 'lucide-react';

const USER_ID = 1;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch todos from backend
  useEffect(() => {
    axios.get(`http://localhost:8080/api/todos/${USER_ID}`)
      .then(res => setTodos(res.data))
      .catch(err => console.error("❌ Error fetching todos:", err));
  }, []);

  const addTodo = () => {
    if (!newTask.trim()) return;
    axios.post('http://localhost:8080/api/todos', {
      text: newTask,
      done: false,
      userId: USER_ID
    })
    .then(res => setTodos([...todos, res.data]))
    .catch(err => console.error("❌ Error adding todo:", err));
    setNewTask('');
  };

  const toggleDone = (id) => {
    const todo = todos.find(t => t.id === id);
    axios.put(`http://localhost:8080/api/todos/${id}`, {
      ...todo,
      done: !todo.done
    }).then(res => {
      setTodos(todos.map(t => t.id === id ? res.data : t));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8080/api/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t.id !== id)))
      .catch(err => console.error("❌ Error deleting todo:", err));
  };

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-white">📋 To-Do List</h3>
      <div className="flex space-x-2 mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button onClick={addTodo} className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700">
          <Plus size={18} />
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow flex items-center justify-between">
            <div className={`text-sm ${todo.done ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => toggleDone(todo.id)} className="text-green-500 hover:text-green-700">
                <Check size={18} />
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
