import { Task } from "./task";

export interface TaskResponse {
  cardsCount: number;
  cards: Task[];
}
