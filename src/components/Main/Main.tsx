import React, { useContext } from 'react';
import Card from '../Card/Card';
import DataContext from '../../context/ContextData';

const Main: React.FC = () => { 

    const context = useContext(DataContext);

    return (
        <>
            {context && context.data.map((item, index) => {
                    const previousCard = index > 0 ? context!.data[index - 1] : null;
                    return (
                        <Card 
                            key={item.title}
                            title={item.title}
                            issues={item.issues}
                            onAddTask={context.addTaskToCard}
                            onMoveTask={context.moveTaskBetweenCards}
                            previousCardIssues={previousCard?.issues}
                            previousCardTitle={previousCard?.title}
                        />
                    );
                })}
        </>
    )
}

export default Main;