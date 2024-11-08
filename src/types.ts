export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: Date; 
  priority?: 'low' | 'medium' | 'high'; 
}
