import React from 'react';
import ReactDOM from 'react-dom';
import TextBoxComponent from './components/TextBoxComponent';

const Main: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">To-do List</h1>
      <TextBoxComponent />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
