import { useState, useEffect } from 'react';
import { CardData } from '../types/types';
import { Task } from '../types/types'

export const useLocalStorage = (key: string, initialData: CardData[]) => {
    const [data, setData] = useState<CardData[]>([]);


    useEffect(() => {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
            setData(JSON.parse(cachedData));
        } else {
            localStorage.setItem(key, JSON.stringify(initialData));
            setData(initialData);
        }
    }, [key, initialData]);

    const updateData = (newData: CardData[]) => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    const addTaskToCard = (cardTitle: string, newTask: Task) => {
        const updatedData = data.map((card) => {
            if (card.title === cardTitle) {
                return {
                    ...card,
                    issues: [...card.issues, newTask]
                };
            }
            return card;
        });
        updateData(updatedData);
    };

    const addDescriptionToTask = (selectedTask: Task, newDescription: string) => { 
        const updatedData = data.map((card) => {
        return {
            ...card,
            issues: card.issues.map((task) => {
                if (task.id === selectedTask.id) {
                    return { ...task, description: newDescription };
                }
                return task;
            })
            
        } 
        
    });
    
    updateData(updatedData); 
}

    const moveTaskBetweenCards = (fromCardTitle: string, toCardTitle: string, taskToMove: Task) => {

        const baseIdMap: Record<string, number> = {
            'Backlog': 100000,
            'Ready': 200000,
            'In Progress': 300000,
            'Finished': 400000,
        };
        const updatedData = data.map((card) => {
            if (card.title === fromCardTitle) {

                const filteredIssues = card.issues.filter((task: Task) => task.id !== taskToMove.id);
                const renumberedIssues = filteredIssues.map((task, idx) => ({
                    ...task,
                    id: String(baseIdMap[card.title] + idx)
                }));
                return {
                    ...card,
                    issues: renumberedIssues
                };
            } else if (card.title === toCardTitle) {
                let maxId = 0;
                if (card.issues.length > 0) {
                    maxId = Math.max(...card.issues.map((task: Task) => Number(task.id)));
                } else {
                    maxId = baseIdMap[toCardTitle] || 0;
                }
                const newId = String(maxId + 1);
                const newTask = { ...taskToMove, id: newId };
                return {
                    ...card,
                    issues: [...card.issues, newTask]
                };
            }
            return card;
        });
        updateData(updatedData);
    };

    return { data, updateData, addTaskToCard, moveTaskBetweenCards, addDescriptionToTask };
}; 