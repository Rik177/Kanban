import React from 'react';
import styles from './Footer.module.css';
import { useContext } from 'react';
import DataContext from '../../context/ContextData';

const Footer: React.FC = () => { 
    let activeTaskValue;
    let finishedTaskValue;

    const footerData = {
        userName: 'Rik',
    }

    const context = useContext(DataContext);

    context && (activeTaskValue = context.find(card => card.title === 'Backlog')?.issues.length || 0);
    context && (finishedTaskValue = context.find(card => card.title === 'Finished')?.issues.length || 0);

    return (
        <footer className={ styles.footer }>
            <div className={`container ${styles.footer__container}`}>
                <section className={ styles.footer__dataStatus }>
                    <span className={ styles.footer__data }>Active tasks: { activeTaskValue ? activeTaskValue : "No Data" }</span>
                    <span className={ styles.footer__data }>Finished tasks: { finishedTaskValue ? finishedTaskValue : "No Data" }</span>
                </section>
                <span className={ styles.footer__user}>Kanban board by {`${footerData.userName}, ${new Date().getFullYear()}`}</span>
            </div>
        </footer>
    )
}

export default Footer;