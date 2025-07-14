import React, { use } from 'react';
import { useState, useCallback } from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../types/types';
import { Link } from 'react-router-dom';

const Card: React.FC<CardProps> = ({ title, issues, onAddTask, onMoveTask, previousCardIssues, previousCardTitle }) => { 

    //----------------------------------
    const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);


    const descriptionToggle = () => { 
        setIsDescriptionOpened(a => !a);
    }
    //----------------------------------

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); 
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTaskName = e.target.value;
        setInputValue(selectedTaskName);
        
        if (selectedTaskName && previousCardIssues && previousCardTitle && onMoveTask) {
            // Находим выбранную задачу в предыдущей карточке
            const selectedTask = previousCardIssues.find(task => task.name === selectedTaskName);
            if (selectedTask) {
                // Перемещаем задачу из предыдущей карточки в текущую
                onMoveTask(previousCardTitle, title, selectedTask);
                
                // Закрываем режим добавления
                setIsAddPushed(false);
                setInputValue('');
            }
        }
    };

    const [isAddPushed, setIsAddPushed] = useState(false);

    const addNewTask = (name: string) => { 
        const lastTask = issues[issues.length - 1];

        let nextId;

        lastTask ? nextId = Number(lastTask.id) + 1 : nextId = '100000';

        return {
            id: String(nextId),
            name: name,
            description: "This task has no description"
        }
    }

    

    //Функционал добавления задачи
    
    const addCard = useCallback(() => { 
        setIsAddPushed(a => !a);

    }, [])

    const submitHandler = () => { 
        const newTask = addNewTask(inputValue);

        // Используем функцию из хука для добавления задачи
        if (onAddTask) {
            onAddTask(title, newTask);
        }

        setIsAddPushed(a => !a);
        setInputValue(''); // Очищаем input

        console.log(newTask);
    }


    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => { 
        e.key === 'Enter' && submitHandler();
    }



    return (
        <article className={ styles.card }>
            <h2 className={ styles.card__title }>{title}</h2>
            <section className={styles.card__data}>
                {issues.map((task) => (
                    <Link className={styles.card__task} to={`/${title}/${task.id}`} key={task.id} onClick={ descriptionToggle }>{ task.name }</Link>
                ))}
                {title === "Backlog" && isAddPushed && (
                    <input type="text" className={`${styles.card__task} ${styles.card__task_input}`} onChange={ handleInputChange } onKeyDown={keyDownHandler}/>
                )}
                {title !== "Backlog" && isAddPushed && (
                    <select className={styles.card__select} onChange={handleSelectChange}>
                        <option value=""></option>
                        {previousCardIssues?.map((task) => (
                            <option key={task.id} value={task.name}>
                                {task.name}
                            </option>
                        ))}
                    </select>
                )}
            </section>
            {isAddPushed
                ? <button className={`${styles.card__button} ${styles.card__button_submit}`} onClick={submitHandler}>Submit</button>
                : <button className={styles.card__button} onClick={addCard}>Add card</button>
            }
        </article>
    )
}

export default Card;