import { useState } from 'react';

export default function ChatComponent() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = `Provide the cash balance for Branch ${branchId} as of today.`;

        const res = await fetch('/api/openai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, branchId: 1 }),  // Example branch ID
        });

        const data = await res.json();
        setResponse(data.result);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask something..."
                />
                <button type="submit">Submit</button>
            </form>
            {response && <p>Response: {response}</p>}
        </div>
    );
}
