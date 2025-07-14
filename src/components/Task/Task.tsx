import React from 'react';
import { useParams } from 'react-router-dom';
import { storageProps } from '../../types/types'
import styles from './Task.module.css';
import { Link } from 'react-router-dom';

const Task: React.FC<storageProps> = ({ data }) => { 
    const { taskId } = useParams(); 
    
    let foundTask = null;
    for (const card of data) {
        foundTask = card.issues.find(task => task.id === taskId);
        if (foundTask) break;
    }

    if (!foundTask) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div className={styles.task}>
            <h2 className={styles.task__title}>{foundTask.name}</h2>
            <p className={styles.task__description}>{foundTask.description}</p>
            <Link to={'/'} className={ styles.task__closeButton }>X</Link>
        </div>
    )
}

export default Task;