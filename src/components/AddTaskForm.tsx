
import React, { useState } from 'react';
import { Task, Label } from '@/pages/Index';

interface AddTaskFormProps {
  labels: Label[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ labels, onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [label, setLabel] = useState(labels[0]?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        completed: false,
        priority,
        label,
      });
      setTitle('');
      setPriority('medium');
      setLabel(labels[0]?.name || '');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter your task..."
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 ${
                  priority === p
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Label
          </label>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            {labels.map((l) => (
              <option key={l.id} value={l.name}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
