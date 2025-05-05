import './WelcomePage.css';
import { Link, replace } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function WelcomePage() {
  const token= localStorage.getItem('token');
  const navigate=useNavigate();
  useEffect(()=>{
    if(token){
      navigate('/home', { replace: true });

    }
  },[navigate])

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Inventory Management Application</h1>
        <p>Manage your warehouses, products, and inventory easily and efficiently.</p>
        <div className="sign-buttons">
        <Link to="/signup" className="start-button">Sign Up</Link>
    <Link to="/login" className="start-button">Sign In</Link>

          
          
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;