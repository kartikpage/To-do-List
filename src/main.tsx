import React from 'react';
import ReactDOM from 'react-dom';
import TextBoxComponent from './components/TextBoxComponent';

const Main: React.FC = () => {
  return (
    <div>
      <h1>To-do List</h1>
      <TextBoxComponent />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
