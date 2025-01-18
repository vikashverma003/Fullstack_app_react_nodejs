import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Logout';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post('http://localhost:8001/api/users/getUser', {
          headers: { Authorization: `${token}` }
        });
        setUserData(data.user);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Here are some logged in user data</p>
      {/* {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>} */}
      <ul>
        {userData ? Object.entries(userData).map((value) => (
          <li>
             {value}
          </li>
        )) : 'NULLLL'}
      </ul>
      
      <button type="button"><Logout /></button>

    </div>
  );
};

export default Dashboard;
