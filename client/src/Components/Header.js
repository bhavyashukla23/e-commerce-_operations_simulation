import { Link } from 'react-router-dom';

const Header = ({ userId }) => (
    <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to={`/cart/${userId}`}>Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </nav>
    </header>
);

export default Header;
