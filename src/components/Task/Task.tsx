import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Task.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Task as TaskType } from '../../types/types';
import DataContext from '../../context/ContextData';

const Task: React.FC = () => { 
    const { taskId } = useParams(); 
    const [descriptionValue, setDescriptionValue] = useState('');
    const [isButtonShowed, setIsButtonShowed] = useState(false);
    
    const context = useContext(DataContext);
    
    let foundTask: TaskType | undefined;
    for (const card of context!.data) {
        foundTask = card.issues.find(task => task.id === taskId);
        if (foundTask) break;
    }

    useEffect(() => {
        if (foundTask) {
            setDescriptionValue(foundTask.description || '');
        }
    }, [foundTask]);

    if (!foundTask) {
        return <div>Задача не найдена</div>;
    }

    

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
        setDescriptionValue(e.target.value)
    }

    const submitValue = () => { 
        if (foundTask && (context && context.addDescriptionToTask)) { 
            context.addDescriptionToTask(foundTask, descriptionValue);
        }
        setIsButtonShowed(false);
    }

    const textAreaClickHandler = () => { 
        setIsButtonShowed(p => !p);
    }

    


    return (
        
        <div className={styles.task}>
            <h2 className={styles.task__title}>{foundTask.name}</h2>
            <textarea onChange={handleChange} className={styles.task__description} onFocus={textAreaClickHandler} value={descriptionValue}></textarea>
            {isButtonShowed ? (
                <button className={styles.task__submitButton} onClick={submitValue}>Submit</button>
            ) : null }

            <Link to={'/'} className={styles.task__closeLink}>
                <img src="/images/close-icon.svg" alt="" />
            </Link>
        </div>
    )
}

export default Task;