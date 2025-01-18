import React from 'react'
//import { useHistory } from 'react-router-dom'; // For navigation
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Step 1: Remove JWT token from localStorage (or sessionStorage)
        localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
        navigate('/login');
      };

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>        
    </div>
  )
}

export default Logout