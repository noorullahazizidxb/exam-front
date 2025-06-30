import React, { useEffect, useState } from 'react';
import { getNotifications, createNotification, markAsRead } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    try {
      const response = await createNotification({ message });
      setNotifications([...notifications, response.data]);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <form onSubmit={handleCreateNotification}>
        <input
          type="text"
          placeholder="New notification"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id} style={{ textDecoration: notification.read ? 'line-through' : 'none' }}>
            {notification.message}
            {!notification.read && <button onClick={() => handleMarkAsRead(notification._id)}>Mark as read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
