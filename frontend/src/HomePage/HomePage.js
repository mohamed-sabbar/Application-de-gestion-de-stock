import './HomePage.css';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Inventory Management Application</h1>
        <p>Manage your warehouses, products, and inventory easily and efficiently.</p>
        <div className="sign-buttons">
            <Link to='/signup'>
            <button className="start-button">Sign Up</button>
            </Link>
          <Link to='/signin'>
          <button className="start-button">Sign In</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;
