import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => { 
    const activeTaskValue = false;
    const finishedTaskValue = false;

    const userData = {
        userName: 'Rik'
    }

    return (
        <footer className={ styles.footer }>
            <div className={`container ${styles.footer__container}`}>
                <section>
                    <span>Active tasks: { activeTaskValue ? activeTaskValue : "No Data" }</span>
                    <span>Finished tasks: { finishedTaskValue ? finishedTaskValue : "No Data" }</span>
                </section>
                <span>Kanban board by {`${userData.userName}, YEAR`}</span>
            </div>
        </footer>
    )
}

export default Footer;