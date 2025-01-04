import React from 'react';
import { Flag } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg backdrop-blur-sm bg-white/80 border border-white/20 shadow-sm flex items-center justify-between",
        todo.completed && "opacity-50"
      )}
    >
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="rounded border-gray-300"
        />
        <span className={todo.completed ? 'line-through' : ''}>
          {todo.text}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <Flag className={cn("w-4 h-4", getPriorityColor(todo.priority))} />
        {todo.dueDate && (
          <span className="text-sm text-gray-500">
            {format(todo.dueDate, "MMM d")}
          </span>
        )}
      </div>
    </div>
  );
};