import { useState, useEffect } from 'react';
import { CardData } from '../types/types';
import { Task } from '../types/types'

export const useLocalStorage = (key: string, initialData: CardData[]) => {
    const [data, setData] = useState<CardData[]>([]);

    // Загрузка данных при инициализации
    useEffect(() => {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
            setData(JSON.parse(cachedData));
        } else {
            localStorage.setItem(key, JSON.stringify(initialData));
            setData(initialData);
        }
    }, [key, initialData]);

    // Функция для обновления данных
    const updateData = (newData: CardData[]) => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    // Функция для добавления задачи в конкретную карточку
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

    // Функция для перемещения задачи между карточками
    const moveTaskBetweenCards = (fromCardTitle: string, toCardTitle: string, taskToMove: Task) => {
        // Маппинг title карточки к baseId
        const baseIdMap: Record<string, number> = {
            'Backlog': 100000,
            'Ready': 200000,
            'In Progress': 300000,
            'Finished': 400000,
        };
        const updatedData = data.map((card) => {
            if (card.title === fromCardTitle) {
                // Удаляем задачу из исходной карточки
                return {
                    ...card,
                    issues: card.issues.filter((task: Task) => task.id !== taskToMove.id)
                };
            } else if (card.title === toCardTitle) {
                let maxId = 0;
                if (card.issues.length > 0) {
                    maxId = Math.max(...card.issues.map((task: Task) => Number(task.id)));
                } else {
                    // Если задач нет, берем baseId для этой карточки
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

    return { data, updateData, addTaskToCard, moveTaskBetweenCards };
}; 