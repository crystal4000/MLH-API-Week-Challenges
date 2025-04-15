import React, { useState } from 'react';

const PromptInput: React.FC<{ onSubmit: (prompt: string) => void }> = ({ onSubmit }) => {
    const [input, setInput] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (input.trim()) {
            onSubmit(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Enter your prompt"
                className="border border-purple-500 p-2 rounded mb-2 w-1/2"
            />
            <button
                type="submit"
                className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            >
                Submit
            </button>
        </form>
    );
};

export default PromptInput;