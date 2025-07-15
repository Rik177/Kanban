import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './Layout.module.css';

const Layout: React.FC = () => { 
    return (
        <div className={styles.layout}>
            <Header />
            
            <main className={styles.main}>
                <div className={ `container ${styles.main__container}` }>
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Layout;