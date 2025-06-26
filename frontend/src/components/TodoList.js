import React, { useState } from 'react';
import { Check, Trash2, Plus } from 'lucide-react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete Data Structures Assignment", done: false, userId: 1 },
    { id: 2, text: "Prepare for GATE Mock Test", done: true, userId: 1 },
    { id: 3, text: "Review Operating Systems Notes", done: false, userId: 1 },
    { id: 4, text: "Submit Project Report", done: false, userId: 1 }
  ]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = () => {
    if (!newTask.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: newTask,
      done: false,
      userId: 1
    };

    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.done).length;
  const totalCount = todos.length;

  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Check className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">To-Do List</h3>
              <p className="text-indigo-100">Stay organized and productive</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-indigo-100">Progress</p>
            <p className="text-xl font-bold">{completedCount}/{totalCount}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex gap-3">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 text-sm dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl transition-all duration-200 shadow hover:shadow-lg flex items-center gap-2"
          >
            <Plus size={18} />
            <span className="font-semibold text-sm">Add</span>
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="p-6">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {todos.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-indigo-600" />
            </div>
            <p className="text-gray-500 text-lg">No tasks yet!</p>
            <p className="text-gray-400">Add your first task to get started 🎯</p>
          </div>
        )}

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`group p-4 rounded-xl transition-all duration-200 flex justify-between items-center ${
                todo.done
                  ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-600'
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDone(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    todo.done
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                  }`}
                >
                  {todo.done && <Check size={14} />}
                </button>
                <span
                  className={`text-sm font-medium transition-all duration-200 ${
                    todo.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-all duration-200"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TodoList;
