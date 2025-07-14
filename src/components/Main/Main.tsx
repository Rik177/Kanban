import React, { useMemo } from 'react';
import styles from './Main.module.css';
import Card from '../Card/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { storageProps } from '../../types/types';

const Main: React.FC<storageProps> = ({ data, addTaskToCard, moveTaskBetweenCards }) => { 
    // const dataMock = [
    //     {
    //         title: 'Backlog',
    //         issues: [
    //             {
    //                 id: '100001',
    //                 name: 'Login page – performance issues',
    //                 description: 'Fix all the bugs'
    //             },
    //             {
    //                 id: '100002',
    //                 name: 'Sprint bugfix',
    //                 description: 'Fix all the bugs'
    //             },
    //         ]
    //     },
    //     {
    //         title: 'Ready',
    //         issues: [
    //             {
    //                 id: '200001',
    //                 name: 'Shop page – performance issues',
    //                 description: 'Fix all the bugs'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'In Progress',
    //         issues: [
    //             {
    //                 id: '300001',
    //                 name: 'User page – performance issues',
    //                 description: 'Fix all the bugs'
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Finished',
    //         issues: [
    //             {
    //                 id: '400001',
    //                 name: 'Main page – performance issues',
    //                 description: 'Fix all the bugs'
    //             }
    //         ]
    //     },
    // // и так далее
    // ]
    
    // // Мемоизируем начальные данные, чтобы избежать бесконечного цикла
    // const initialData = useMemo(() => dataMock, []);
    
    // // Используем кастомный хук для работы с localStorage
    // const { data, addTaskToCard, moveTaskBetweenCards } = useLocalStorage('userData', initialData);


    //


    
    

    return (
        <main className={ styles.main }>
            <div className={ `container ${styles.main__container}` }>
                {data.map((item, index) => {
                    const previousCard = index > 0 ? data[index - 1] : null;
                    return (
                        <Card 
                            key={item.title} 
                            title={item.title} 
                            issues={item.issues}
                            onAddTask={addTaskToCard}
                            onMoveTask={moveTaskBetweenCards}
                            previousCardIssues={previousCard?.issues}
                            previousCardTitle={previousCard?.title}
                        />
                    );
                })}
            </div>
        </main>
    )
}

export default Main;