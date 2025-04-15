import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import ResponseDisplay from './components/ResponseDisplay';

const App: React.FC = () => {
    const [response, setResponse] = useState<string>('');

    const handleResponse = (apiResponse: string) => {
        setResponse(apiResponse);
    };

    return (
        <div className="min-h-screen bg-white text-purple-600 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">OpenAI GPT-3 Prompt</h1>
            <PromptInput onSubmit={handleResponse} />
            <ResponseDisplay response={response} />
        </div>
    );
};

export default App;