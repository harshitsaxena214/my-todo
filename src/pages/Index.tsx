
import React, { useState } from 'react';
import { TaskList } from '@/components/TaskList';
import { LabelManager } from '@/components/LabelManager';
import { TaskStats } from '@/components/TaskStats';
import { AddTaskForm } from '@/components/AddTaskForm';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  label: string;
  dueDate?: string;
  createdAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  icon: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Read for 30 minutes',
      completed: false,
      priority: 'medium',
      label: 'Productivity',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Buy a shirt',
      completed: false,
      priority: 'low',
      label: 'Shopping',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Reply to emails',
      completed: false,
      priority: 'high',
      label: 'Work',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [labels] = useState<Label[]>([
    { id: '1', name: 'Productivity', color: 'bg-blue-500', icon: '🎯' },
    { id: '2', name: 'Shopping', color: 'bg-green-500', icon: '🛒' },
    { id: '3', name: 'Work', color: 'bg-red-500', icon: '💼' },
    { id: '4', name: 'Meditation', color: 'bg-orange-500', icon: '🧘' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setShowAddForm(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Todo Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">myTodo</h1>
                  <p className="text-gray-600">Today</p>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors duration-200 font-medium"
                >
                  + New task
                </button>
              </div>

              <TaskList 
                tasks={tasks} 
                labels={labels}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </div>
          </div>

          {/* Labels and Stats Section */}
          <div className="space-y-6">
            <LabelManager labels={labels} tasks={tasks} />
            <TaskStats tasks={tasks} />
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <AddTaskForm 
                labels={labels}
                onAddTask={addTask}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
