import React from 'react';

interface ResponseDisplayProps {
    response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
    return (
        <div className="p-4 bg-white text-purple-600 rounded shadow-md">
            <h2 className="text-lg font-bold">Response:</h2>
            <p className="mt-2">{response}</p>
        </div>
    );
};

export default ResponseDisplay;