import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './Layout.module.css';
import DataContextProvider from '../context/ContextData';
import { CardData } from '../types/types';

type LayoutProps = {
    data: CardData[];
};

const Layout: React.FC<LayoutProps> = ({ data }) => { 
    return (
        <div className={styles.layout}>
            <DataContextProvider value={ data }>
                <Header />
            
                <main className={styles.main}>
                    <div className={ `container ${styles.main__container}` }>
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </DataContextProvider>
            
        </div>
    )
}

export default Layout;