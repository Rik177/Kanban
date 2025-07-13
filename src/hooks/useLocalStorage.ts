import { useState, useEffect } from 'react';
import { CardData } from '../types/types';

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
    const addTaskToCard = (cardTitle: string, newTask: any) => {
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

    return { data, updateData, addTaskToCard };
}; 