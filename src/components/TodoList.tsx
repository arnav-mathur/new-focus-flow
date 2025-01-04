import React, { useState } from 'react';
import { TodoForm } from './todo/TodoForm';
import { TodoItem } from './todo/TodoItem';
import { useTodo } from '@/contexts/TodoContext';

export const TodoList = () => {
  const { todos, addTodo, toggleTodo } = useTodo();
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [date, setDate] = useState<Date>();

  const handleSubmit = () => {
    if (!newTodo.trim()) return;
    addTodo(newTodo, priority, date);
    setNewTodo('');
    setDate(undefined);
    setPriority('medium');
  };

  return (
    <div className="space-y-6">
      <TodoForm
        newTodo={newTodo}
        priority={priority}
        date={date}
        onTodoChange={setNewTodo}
        onPriorityChange={setPriority}
        onDateChange={setDate}
        onSubmit={handleSubmit}
      />

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
};