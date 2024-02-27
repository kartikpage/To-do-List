import React, { useEffect, useState } from 'react';
import '../index.css';

const TextBoxComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<{ id: number; text: string; isCompleted: boolean }[]>(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = { id: Date.now(), text: inputValue, isCompleted: false };
      setMessages(prevMessages => [...prevMessages, newTask]);
      setInputValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleRemoveTask = (id: number) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  };

  const handleCheckboxChange = (id: number) => {
    setMessages(prevMessages => {
      return prevMessages.map(message => {
        if (message.id === id) {
          return { ...message, isCompleted: !message.isCompleted };
        }
        return message;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <ul>
        {messages.map(message => (
          <li key={message.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                checked={message.isCompleted}
                onChange={() => handleCheckboxChange(message.id)}
                className="form-checkbox h-5 w-5 text-teal-600 mr-2"
              />
              <span className={`flex-1 ${message.isCompleted ? 'line-through' : ''}`}>
                {message.text}
              </span>
              <button
                className="text-red-500 hover:text-red-700 ml-2"
                onClick={() => handleRemoveTask(message.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextBoxComponent;
