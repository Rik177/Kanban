import { ReactElement, ReactNode, SetStateAction } from "react";

export type CardData = {
    title: string,
    issues: {
        id: string;
        name: string;
        description: string;
    }[]
}

export type storageProps = {
    data: CardData[]; 
    addTaskToCard?: (cardTitle: string, newTask: Task) => void; 
    moveTaskBetweenCards?: (taskId: string, fromCardId: string, toCardId: Task) => void;
    addDescription?: (selectedTask: Task, newDescription: string) => void;
}

export type Task = {
    id: string;
    name: string;
    description: string;
}

export type CardProps = {
    title: string,
    issues: {
        id: string;
        name: string;
        description: string;
    }[]
    onAddTask?: (cardTitle: string, newTask: Task) => void;
    onMoveTask?: (fromCardTitle: string, toCardTitle: string, taskToMove: Task) => void;
    previousCardIssues?: Task[];
    previousCardTitle?: string;
}

export type ChildrenProps = {
    children: ReactNode,
    value: CardData[]
}

