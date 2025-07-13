export type CardData = {
    title: string,
    issues: {
        id: string;
        name: string;
        description: string;
    }[]
}

export type newTask = {
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
    onAddTask?: (cardTitle: string, newTask: newTask) => void;
}

