import React, { useCallback, useState } from 'react';
import Card from '../Card/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { storageProps } from '../../types/types';

const Main: React.FC<storageProps> = ({ data, addTaskToCard, moveTaskBetweenCards }) => { 
    const [activeCard, setActiveCard] = useState<string | null | boolean>(false);

    const handleCardActivation = (cardTitle: string) => {
        setActiveCard(prev => prev === cardTitle ? null : cardTitle);
    };

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
                            isAddPushed={activeCard === item.title}
                            setIsAddPushed={setActiveCard}
                            onToggleAdd={handleCardActivation}
                        />
                    );
                })}
        </>
    )
}

export default Main;