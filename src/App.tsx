import './App.css';

import Main from './components/Main/Main';
import Layout from './layout/Layout'

import Task from './components/Task/Task';
import dataMock from './mock_data/mockData'
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMemo } from 'react';

import { Routes, Route } from 'react-router-dom';



const App: React.FC = () => {

      // Мемоизируем начальные данные, чтобы избежать бесконечного цикла
      const initialData = useMemo(() => dataMock, []);
      
      // Используем кастомный хук для работы с localStorage
      const { data, addTaskToCard, moveTaskBetweenCards, addDescriptionToTask } = useLocalStorage('userData', initialData);
  


  return (
    <div className="App">
      <div className="wrapper">

        <Routes>
          <Route path='/' element={<Layout data={ data } />}>
            <Route index element={<Main data={ data } addTaskToCard={ addTaskToCard } moveTaskBetweenCards={ moveTaskBetweenCards } />} />
            <Route path="/:card/:taskId" element={<Task data={data} addDescription={ addDescriptionToTask } /> } />
          </Route>
        </Routes>

      </div>
    </div>
  );
}

export default App;
