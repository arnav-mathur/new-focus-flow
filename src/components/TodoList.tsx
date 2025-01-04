import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Flag } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [date, setDate] = useState<Date>();

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      priority,
      dueDate: date,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
    setDate(undefined);
    setPriority('medium');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={addTodo}>
          <Plus className="w-4 h-4 mr-2" />
          Add Todo
        </Button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={cn(
              "p-4 rounded-lg backdrop-blur-sm bg-white/80 border border-white/20 shadow-sm flex items-center justify-between",
              todo.completed && "opacity-50"
            )}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
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
        ))}
      </div>
    </div>
  );
};