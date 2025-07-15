import React, { useMemo } from 'react';
import styles from './Main.module.css';
import Card from '../Card/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { storageProps } from '../../types/types';

const Main: React.FC<storageProps> = ({ data, addTaskToCard, moveTaskBetweenCards }) => { 
    

    return (
        <>
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
        </>
    )
}

export default Main;