export interface UserCollection {
  id: number;
  first_name: string;
  username: string;
  is_bot: boolean;
  language_code: string;
  score: number;
  teams: string[];
}

type TaskStatus = "opened" | "closed"

export interface TaskCollection {
  id: number;
  userId: number; //Кто начал задачу
  status: TaskStatus;
  team: string;
  name?: string;
  url: string; //задача
}

export interface VoteCollection {
  id: number;
  userId: number; //Кто начал задачу
  taskId: number;
  score: number;
  x2?: boolean;
}