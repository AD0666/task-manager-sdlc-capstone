import { useCallback, useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchFilterBar from './components/SearchFilterBar';
import Footer from './components/Footer';

const API_BASE = '/api/tasks';

function buildTasksUrl({ status, search }) {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.set('status', status);
  if (search.trim()) params.set('q', search.trim());
  const query = params.toString();
  return query ? `${API_BASE}?${query}` : API_BASE;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = useCallback(async (filters = { status: statusFilter, search: searchQuery }) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(buildTasksUrl(filters));
      if (!res.ok) throw new Error('Failed to load tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchTasks({ status: statusFilter, search: searchQuery });
  }, [statusFilter, searchQuery, fetchTasks]);

  const refreshTasks = () => fetchTasks({ status: statusFilter, search: searchQuery });

  const createTask = async (payload) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error || 'Failed to create task');
    }
    await refreshTasks();
  };

  const updateTask = async (id, payload) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error || 'Failed to update task');
    }
    setEditingTask(null);
    await refreshTasks();
  };

  const deleteTask = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    await refreshTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <p className="task-meta">AI-Assistant-Driven SDLC capstone — Sprint 1: search &amp; filter</p>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <h2>{editingTask ? 'Edit Task' : 'Create Task'}</h2>
        <TaskForm
          key={editingTask?.id ?? 'new'}
          initial={editingTask}
          onSubmit={editingTask
            ? (payload) => updateTask(editingTask.id, payload)
            : createTask}
          onCancel={editingTask ? () => setEditingTask(null) : undefined}
        />
      </div>

      <div className="card">
        <h2>Tasks</h2>
        <SearchFilterBar
          status={statusFilter}
          search={searchQuery}
          onStatusChange={setStatusFilter}
          onSearchChange={setSearchQuery}
        />
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  );
}
<<<<<<< Updated upstream
=======

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {!isAuthenticated ? <AuthPage /> : <TaskManagerApp />}
      <Footer />
    </div>
  );
}
>>>>>>> Stashed changes
