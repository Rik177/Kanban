import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Task from './components/Task/Task';
import dataMock from './mock_data/mockData'
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMemo } from 'react';

import { Routes, Route } from 'react-router-dom';



const App: React.FC = () => {

      // Мемоизируем начальные данные, чтобы избежать бесконечного цикла
      const initialData = useMemo(() => dataMock, []);
      
      // Используем кастомный хук для работы с localStorage
      const { data, addTaskToCard, moveTaskBetweenCards } = useLocalStorage('userData', initialData);
  


  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        {/* <Main /> */}
        <Routes>
          <Route path="/" element={<Main data={ data } addTaskToCard={ addTaskToCard } moveTaskBetweenCards={ moveTaskBetweenCards } />} />
          <Route path="/:card/:taskId" element={<Task data={ data } /> } />
        </Routes>
        <Footer /> 
      </div>
    </div>
  );
}

export default App;
