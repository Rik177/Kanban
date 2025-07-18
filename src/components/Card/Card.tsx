import React, { use, useEffect } from 'react';
import { useState, useCallback } from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../types/types';
import { Link } from 'react-router-dom';
import ClickAwayListener from 'react-click-away-listener';

const Card: React.FC<CardProps> = ({ title, issues, onAddTask, onMoveTask, previousCardIssues, previousCardTitle }) => { 
    const [inputValue, setInputValue] = useState('');
    // Добавляем состояния для кастомного dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const [isAddPushed, setIsAddPushed] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); 
    };

    const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

    const handleOptionClick = (taskName: string) => {
        setSelectedValue(taskName);
        setInputValue(taskName); // если нужно для логики
        setIsDropdownOpen(false);

        // Если нужно сразу обработать выбор:
        if (taskName && previousCardIssues && previousCardTitle && onMoveTask) {
            const selectedTask = previousCardIssues.find(task => task.name === taskName);
            if (selectedTask) {
            onMoveTask(previousCardTitle, title, selectedTask);
            setIsAddPushed(false);
            setInputValue('');
            }
        }
        };


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

    const submitHandler = () => { 
        if (inputValue === '') { 
            return null;
        }

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
        <ClickAwayListener onClickAway={() => setIsAddPushed(false)}>
            <article className={ styles.card }>
            <h2 className={styles.card__title}>{title}</h2>
            
            
            <section className={styles.card__data}>
            {issues.map((task) => (
                <Link className={styles.card__task} to={`/${title}/${task.id}`} key={task.id}>{ task.name }</Link>
            ))}
            {title === "Backlog" && isAddPushed && (
                
                <input type="text" className={`${styles.card__task} ${styles.card__task_input}`} onChange={ handleInputChange } onKeyDown={keyDownHandler}/>
                
            )}
            {title !== "Backlog" && isAddPushed && (
                
                <div className={`${styles.dropdown} ${isDropdownOpen && styles.dropdown_opened}`}>
                        <div
                            className={styles.dropdown__selected}
                            onClick={handleDropdownToggle}
                            tabIndex={0}
                        >
                        {selectedValue || "Выберите задачу"}
                    </div>
                    {isDropdownOpen && (
                        <ul className={styles.dropdown__list}>
                            {previousCardIssues?.map((task) => (
                                <li
                                    key={task.id}
                                    className={styles.dropdown__option}
                                    onClick={() => handleOptionClick(task.name)}
                                >
                                {task.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
            )}
            </section>
            {isAddPushed
                ? <button className={`${styles.card__button} ${styles.card__button_submit}`} onClick={submitHandler}>Submit</button>
                : <button className={`${styles.card__button} ${styles.card__button_add}`} onClick={() => setIsAddPushed(!isAddPushed)} disabled={ title !== "Backlog" && (!previousCardIssues || previousCardIssues.length === 0) }>Add card</button>
            }
            
            
            
            </article>
        </ClickAwayListener>
        
    )
}

export default Card;