import React from 'react';
import styles from './Header.module.css'

const Header: React.FC = () => { 
    
    
    return (
        <header className={styles.header}>
            <div className={`container ${styles.header__container}`}>
                <h1 className={styles.header__title}>
                    Awesome Canban Board
                </h1>
                <button className={ styles.header__button }>
                    <img src="/images/user-avatar.svg" alt="User avatar" />
                </button>
            </div>
        </header>
    )
}

export default Header;