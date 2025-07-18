import './App.css';

import Main from './components/Main/Main';
import Layout from './layout/Layout'

import Task from './components/Task/Task';

import { Routes, Route } from 'react-router-dom';



const App: React.FC = () => {

  return (
    <div className="App">
      <div className="wrapper">

        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Main />} />
            <Route path="/:card/:taskId" element={<Task /> } />
          </Route>
        </Routes>

      </div>
    </div>
  );
}

export default App;
