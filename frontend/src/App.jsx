import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from './api/client';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchFilterBar from './components/SearchFilterBar';

const API_BASE = '/api/tasks';

function buildTasksUrl({ status, search }) {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.set('status', status);
  if (search.trim()) params.set('q', search.trim());
  const query = params.toString();
  return query ? `${API_BASE}?${query}` : API_BASE;
}

function TaskManagerApp() {
  const { user, logout } = useAuth();
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
      const data = await apiFetch(buildTasksUrl(filters));
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
    await apiFetch(API_BASE, { method: 'POST', body: JSON.stringify(payload) });
    await refreshTasks();
  };

  const updateTask = async (id, payload) => {
    await apiFetch(`${API_BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    setEditingTask(null);
    await refreshTasks();
  };

  const deleteTask = async (id) => {
    await apiFetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    await refreshTasks();
  };

  return (
    <div>
      <div className="app-header">
        <div>
          <h1>Task Manager</h1>
          <p className="task-meta">Sprint 2: authentication — signed in as {user.name}</p>
        </div>
        <button type="button" className="secondary" data-testid="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

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

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {!isAuthenticated ? <AuthPage /> : <TaskManagerApp />}
    </div>
  );
}
