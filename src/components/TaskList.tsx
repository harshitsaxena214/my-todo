
import React from 'react';
import { Task, Label } from '@/pages/Index';

interface TaskListProps {
  tasks: Task[];
  labels: Label[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  labels, 
  onToggleTask, 
  onDeleteTask 
}) => {
  const getLabelColor = (labelName: string) => {
    const label = labels.find(l => l.name === labelName);
    return label?.color || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${
            task.completed 
              ? 'bg-gray-50 border-gray-200' 
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <button
            onClick={() => onToggleTask(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              task.completed
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {task.completed && <span className="text-xs">✓</span>}
          </button>

          <div className="flex-1">
            <h3 className={`font-medium transition-all duration-200 ${
              task.completed 
                ? 'text-gray-500 line-through' 
                : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getLabelColor(task.label)}`}>
                {task.label}
              </span>
              <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
            </div>
          </div>

          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-gray-500 text-lg">No tasks yet. Add your first task!</p>
        </div>
      )}
    </div>
  );
};
