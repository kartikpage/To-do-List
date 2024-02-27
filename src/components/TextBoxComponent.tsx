import React, { useState } from 'react';

const TextBoxComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; isCompleted: boolean }[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { text: inputValue, isCompleted: false }]);
      setInputValue('');
    }
  };

  const toggleCompleted = (index: number) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index].isCompleted = !updatedMessages[index].isCompleted;
      return updatedMessages;
    });
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task..."
      />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: message.isCompleted ? 'line-through' : 'none' }}
            >
              {message.text}
            </span>
            <button onClick={() => toggleCompleted(index)}>
              {message.isCompleted ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextBoxComponent;
