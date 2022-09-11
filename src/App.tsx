import React from 'react';
import './App.scss';
import 'awesome-notifications/dist/style.css';
import YerbaTableComponent
  from './components/yerba-table-component/yerba-table.component';

const App = () => {
  return (
    <div className="App">
      <YerbaTableComponent/>
    </div>
  );
};

export default App;
