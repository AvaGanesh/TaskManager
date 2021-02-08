import { Priority } from "./priority.enum";

export interface TaskListResponse {
    status: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    message: string;
    assigned_to: string;
    assigned_name: string;
    created_on: string;
    due_date: string;
    priority: string;
}
