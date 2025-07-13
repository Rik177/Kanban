import React, { use } from 'react';
import { useState, useCallback } from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../types/types';

const Card: React.FC<CardProps> = ({ title, issues, onAddTask }) => { 

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

    const [isAddPushed, setIsAddPushed] = useState(false);

    const addNewTask = (name: string) => { 
        const lastTask = issues[issues.length - 1];

        const nextId = Number(lastTask.id) + 1;
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







    return (
        <article className={ styles.card }>
            <h2 className={ styles.card__title }>{title}</h2>
            <section className={styles.card__data}>
                {issues.map((task) => (
                    <div className={styles.card__task} key={task.id} onClick={ descriptionToggle }>{ task.name }</div>
                ))}
                {isAddPushed ? <input type="text" className={`${styles.card__task} ${styles.card__task_input}`} onChange={ handleInputChange }/> : null}
            </section>
            {isAddPushed
                ? <button className={`${styles.card__button} ${styles.card__button_submit}`} onClick={submitHandler}>Submit</button>
                : <button className={styles.card__button} onClick={addCard}>Add card</button>
            }
        </article>
    )
}

export default Card;