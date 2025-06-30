import React, { useState } from 'react';
import { createNotification } from '../services/api';
import { toast } from 'react-hot-toast';

const NotificationForm = () => {
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotification({ message });
      setMessage('');
      toast.success('Notification created successfully!');
    } catch (error) {
      toast.error('Failed to create notification.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Notification Message"
          required
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">Create Notification</button>
      </div>
    </form>
  );
};

export default NotificationForm;
