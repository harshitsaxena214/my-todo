
import React from 'react';
import { Task, Label } from '@/pages/Index';

interface LabelManagerProps {
  labels: Label[];
  tasks: Task[];
}

export const LabelManager: React.FC<LabelManagerProps> = ({ labels, tasks }) => {
  const getTaskCountForLabel = (labelName: string) => {
    return tasks.filter(task => task.label === labelName && !task.completed).length;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">myLabels</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 font-medium">Labels</p>
        
        {labels.map((label) => {
          const taskCount = getTaskCountForLabel(label.name);
          return (
            <div key={label.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                <span className="font-medium text-gray-700">{label.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{taskCount}</span>
                <div className="text-2xl">{label.icon}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
