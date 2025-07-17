import React from 'react';
import styles from './Header.module.css'
import { useState } from 'react';

const Header: React.FC = () => { 
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    const popupHandler = () => {
        setIsPopupOpened(!isPopupOpened);

    }
    
    return (
        <header className={styles.header}>
            <div className={`container ${styles.header__container}`}>
                <h1 className={styles.header__title}>
                    Awesome Canban Board
                </h1>
                <button className={`${styles.header__button} ${isPopupOpened && styles.header__button_active}`} onClick={ popupHandler }>
                    <img src="/images/user-avatar.svg" alt="User avatar" />
                </button>
            </div>
            {isPopupOpened &&
                <div className={ styles.header__popup }>
                <ul className={ styles.header__list }>
                    <li className={ styles.header__listItem }> <a className={ styles.header__listLink } href="#">Profile</a> </li>
                    <li className={ styles.header__listItem }> <a className={ styles.header__listLink } href="#">Log Out</a> </li>
                </ul>
            </div>
            } 
        </header>
    )
}

export default Header;