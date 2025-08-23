import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './Layout.module.css';
import { DataContextProvider } from '../context/ContextData';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMemo } from 'react'; 
import dataMock from '../mock_data/mockData'

const Layout: React.FC = () => { 
    const initialData = useMemo(() => dataMock, []);
    const { data, addTaskToCard, moveTaskBetweenCards, addDescriptionToTask } = useLocalStorage('userData', initialData);

    const contextValue = {
        data,
        addTaskToCard,
        moveTaskBetweenCards,
        addDescriptionToTask
    }


    return (
        <div className={styles.layout}>
            <DataContextProvider value={ contextValue }>
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