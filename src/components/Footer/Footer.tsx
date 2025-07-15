import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => { 
    const activeTaskValue = false;
    const finishedTaskValue = false;

    const footerData = {
        userName: 'Rik',
        year: '2005'
    }

    return (
        <footer className={ styles.footer }>
            <div className={`container ${styles.footer__container}`}>
                <section className={ styles.footer__dataStatus }>
                    <span>Active tasks: { activeTaskValue ? activeTaskValue : "No Data" }</span>
                    <span>Finished tasks: { finishedTaskValue ? finishedTaskValue : "No Data" }</span>
                </section>
                <span>Kanban board by {`${footerData.userName}, ${footerData.year}`}</span>
            </div>
        </footer>
    )
}

export default Footer;