"use client";
import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [friendshipMeter, setFriendshipMeter] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        friendshipMeter: friendshipMeter,
      }),
    });
    const data = await res.json();
    setResponse(data.content);
    setMessage("");
    setFriendshipMeter(prevMeter => Math.min(prevMeter + 10, 100));
  };

  return (
    <main className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
        Chat Page
      </h1>
      <section className="max-w-3xl mx-auto w-full">
        <div className="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <p className="text-white">Friendship Meter: {friendshipMeter}%</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{width: `${friendshipMeter}%`}}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="px-3 py-2 bg-gray-700 text-white rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </form>
          {response && (
            <div className="mt-4 p-3 bg-gray-700 text-white rounded">
              <p>{response}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;