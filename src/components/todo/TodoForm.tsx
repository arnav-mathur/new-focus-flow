import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, CalendarIcon } from 'lucide-react';
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

interface TodoFormProps {
  newTodo: string;
  priority: 'low' | 'medium' | 'high';
  date?: Date;
  onTodoChange: (value: string) => void;
  onPriorityChange: (value: any) => void;
  onDateChange: (date?: Date) => void;
  onSubmit: () => void;
}

export const TodoForm = ({
  newTodo,
  priority,
  date,
  onTodoChange,
  onPriorityChange,
  onDateChange,
  onSubmit
}: TodoFormProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <Input
        placeholder="Add new todo..."
        value={newTodo}
        onChange={(e) => onTodoChange(e.target.value)}
        className="flex-1 min-w-[200px]"
      />
      <Select value={priority} onValueChange={onPriorityChange}>
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
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button onClick={onSubmit}>
        <Plus className="w-4 h-4 mr-2" />
        Add Todo
      </Button>
    </div>
  );
};