import React from 'react';
import { Flag } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-gradient-to-br from-[#FEC6A1] to-[#F97316]';
    case 'medium': return 'bg-gradient-to-br from-[#D3E4FD] to-[#0EA5E9]';
    case 'low': return 'bg-gradient-to-br from-[#F2FCE2] to-[#148F70]';
    default: return '';
  }
};

export const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105",
        getPriorityColor(todo.priority),
        todo.completed && "opacity-50"
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="rounded border-white/30 bg-white/20 w-5 h-5"
          />
          <Flag className="w-5 h-5 text-white/70" />
        </div>
        
        <span className={cn(
          "text-lg font-medium text-white",
          todo.completed ? 'line-through opacity-70' : ''
        )}>
          {todo.text}
        </span>
        
        {todo.dueDate && (
          <span className="text-sm text-white/70 mt-2">
            Due: {format(todo.dueDate, "MMM d")}
          </span>
        )}
      </div>
    </motion.div>
  );
};