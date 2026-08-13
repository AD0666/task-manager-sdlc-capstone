function formatDate(dateStr) {
  if (!dateStr) return 'No due date';
  return new Date(dateStr).toLocaleDateString();
}

function statusLabel(status) {
  return status.replace('_', ' ');
}

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Create your first task above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <div className="task-header">
            <div>
              <h3 className="task-title">{task.title}</h3>
              {task.description && <p>{task.description}</p>}
            </div>
            <span className={`status-badge status-${task.status}`}>
              {statusLabel(task.status)}
            </span>
          </div>
          <div className="task-meta">
            Due: {formatDate(task.due_date)} · Updated: {new Date(task.updated_at).toLocaleString()}
          </div>
          <div className="actions">
            <button type="button" className="secondary" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button type="button" className="danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
