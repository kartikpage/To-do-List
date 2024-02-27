import React, { useEffect, useState } from "react";

const TextBoxComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<
    { id: number; text: string; isCompleted: boolean }[]
  >(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = { id: Date.now(), text: inputValue, isCompleted: false };
      setMessages((prevMessages) => [...prevMessages, newTask]);
      setInputValue("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleRemoveTask = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  const toggleCompleted = (id: number) => {
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.id === id) {
          return { ...message, isCompleted: !message.isCompleted };
        }
        return message;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <span
              style={{
                textDecoration: message.isCompleted ? "line-through" : "none",
              }}
            >
              {message.text}
            </span>
            <button onClick={() => toggleCompleted(message.id)}>
              {message.isCompleted ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleRemoveTask(message.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextBoxComponent;

