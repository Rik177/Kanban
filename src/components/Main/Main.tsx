import React, { useMemo } from 'react';
import styles from './Main.module.css';
import Card from '../Card/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Main: React.FC = () => { 
    const dataMock = [
        {
            title: 'Backlog',
            issues: [
                {
                    id: '100000',
                    name: 'Login page – performance issues',
                    description: 'Fix all the bugs'
                },
                {
                    id: '100001',
                    name: 'Sprint bugfix',
                    description: 'Fix all the bugs'
                },
            ]
        },
        {
            title: 'Ready',
            issues: [
                {
                    id: '200000',
                    name: 'Shop page – performance issues',
                    description: 'Fix all the bugs'
                }
            ]
        },
        {
            title: 'In Progress',
            issues: [
                {
                    id: '300000',
                    name: 'User page – performance issues',
                    description: 'Fix all the bugs'
                }
            ]
        },
        {
            title: 'Finished',
            issues: [
                {
                    id: '400000',
                    name: 'Main page – performance issues',
                    description: 'Fix all the bugs'
                }
            ]
        },
    // и так далее
    ]
    
    // Мемоизируем начальные данные, чтобы избежать бесконечного цикла
    const initialData = useMemo(() => dataMock, []);
    
    // Используем кастомный хук для работы с localStorage
    const { data, addTaskToCard } = useLocalStorage('userData', initialData);


    //


    
    

    return (
        <main className={ styles.main }>
            <div className={ `container ${styles.main__container}` }>
                {data.map((item) => (
                    <Card 
                        key={item.title} 
                        title={item.title} 
                        issues={item.issues}
                        onAddTask={addTaskToCard}
                    />
                ))}
            </div>
        </main>
    )
}

export default Main;