'use server'
import { revalidatePath } from 'next/cache'
export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  created_at?: string;
  updated_at?: string;
}



// Base URL for your Laravel API
const API_BASE_URL = 'http://task-manager.test/api';

// SERVER ACTIONS
export async function getAllTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: "no-store",
  });

  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(title: string, status: TaskStatus): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
    cache: "no-store",
  });
revalidatePath('/')
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: number, title: string, status: TaskStatus): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
    cache: "no-store",
  });
revalidatePath('/')
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    cache: "no-store",
  });
revalidatePath('/')
  if (!res.ok) throw new Error('Failed to delete task');
}
