import { ReactNode } from "react";

export type CardData = {
    title: string,
    issues: {
        id: string;
        name: string;
        description: string;
    }[]
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
    value: ContextTypes
}


export type ContextTypes = {
    data: CardData[],
    addTaskToCard: (cardTitle: string, newTask: Task) => void,
    moveTaskBetweenCards: (fromCardTitle: string, toCardTitle: string, taskToMove: Task) => void,
    addDescriptionToTask: (selectedTask: Task, newDescription: string) => void
}
