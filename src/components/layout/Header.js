import React from 'react';
import { Link } from 'react-router-dom';

// functional based component, just like and render
function Header() {
    return (
        <header style={headerStyle}>
            {/* <h1>TodoList</h1> */}
            {/* <Link style={linkStyle} to="/">Home</Link> | */}
            <Link style={linkStyle} to="/process"> Process</Link> |  
            <Link style={linkStyle} to="/fma"> FSM</Link>
        </header>
    );
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const headerStyle={
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header;