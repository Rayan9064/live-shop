
'use client';

import { useState } from 'react';

const staticMessages = [
  { id: 1, user: 'fashionlover', message: 'Love that color! 💕', avatar: 'https://readdy.ai/api/search-image?query=Young%20woman%20avatar%20photo%2C%20friendly%20smile%2C%20modern%20style%2C%20clean%20background%2C%20portrait&width=24&height=24&seq=chat-avatar-1&orientation=squarish' },
  { id: 2, user: 'styleguru', message: 'Can you show it?', avatar: 'https://readdy.ai/api/search-image?query=Young%20man%20avatar%20photo%2C%20casual%20style%2C%20clean%20background%2C%20portrait&width=24&height=24&seq=chat-avatar-2&orientation=squarish' },
  { id: 3, user: 'shopaholic', message: 'Thanks thought it was black straps', avatar: 'https://readdy.ai/api/search-image?query=Young%20woman%20avatar%20photo%2C%20stylish%20look%2C%20clean%20background%2C%20portrait&width=24&height=24&seq=chat-avatar-3&orientation=squarish' },
  { id: 4, user: 'trendy_user', message: '🔥🔥', avatar: 'https://readdy.ai/api/search-image?query=Young%20person%20avatar%20photo%2C%20trendy%20style%2C%20clean%20background%2C%20portrait&width=24&height=24&seq=chat-avatar-4&orientation=squarish' },
  { id: 5, user: 'sneakerhead', message: 'Looks amazing! 😍', avatar: 'https://readdy.ai/api/search-image?query=Young%20man%20avatar%20photo%2C%20urban%20style%2C%20clean%20background%2C%20portrait&width=24&height=24&seq=chat-avatar-5&orientation=squarish' },
  { id: 6, user: 'collector_pro', message: 'Just ordered one! 🛒', avatar: 'https://readdy.ai/api/search-image?query=Young%20woman%20avatar%20photo%2C%20professional%20look%2C%20clean%20background%2C%20portrait&width=24&height=24&seq=chat-avatar-6&orientation=squarish' }
];

export default function ChatFeed() {
  const [messages] = useState(staticMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <div className="px-4 pb-4">
      <div className="h-32 overflow-hidden mb-3">
        <div className="flex flex-col space-y-2">
          {messages.slice(-6).map((msg) => (
            <div key={msg.id} className="flex items-start space-x-2 animate-fadeIn">
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-6 h-6 rounded-full flex-shrink-0"
              />
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-2 max-w-xs">
                <div className="text-white/80 text-xs font-medium mb-1">{msg.user}</div>
                <div className="text-white text-sm">{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-full px-4 py-3 border border-white/10">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Say something..."
            className="w-full bg-transparent text-white placeholder-white/60 text-sm border-none focus:outline-none"
          />
        </div>
        
        <button className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
          <i className="ri-emotion-line text-white text-lg"></i>
        </button>
        
        <button className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
          <i className="ri-gift-line text-white text-lg"></i>
        </button>
      </div>
    </div>
  );
}
