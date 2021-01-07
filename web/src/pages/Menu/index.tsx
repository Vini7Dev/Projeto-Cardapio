/**
 * Page: Menu
 */

import React , { useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

const Menu: React.FC = () => {
    // Use authentication data and functions
    const auth = useAuth();

    // Logout button function
    const handleLogOut = useCallback(() => {
        auth.logout();
    }, [auth]);

    return (
      <div>
        <h1>Menu</h1>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    )
}

export default Menu;