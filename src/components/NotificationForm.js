import React, { useState } from 'react';
import { createNotification } from '../services/api';

const NotificationForm = () => {
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotification({ message });
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Notification Message" required />
      <button type="submit">Create Notification</button>
    </form>
  );
};

export default NotificationForm;
