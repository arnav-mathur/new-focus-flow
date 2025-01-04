import React, { createContext, useContext, useState } from 'react';

interface Todo {
  id: string;
  text: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string, priority: 'low' | 'medium' | 'high', dueDate?: Date) => void;
  toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, priority: 'low' | 'medium' | 'high', dueDate?: Date) => {
    if (!text.trim()) return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text,
      priority,
      dueDate,
      completed: false
    };
    
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};