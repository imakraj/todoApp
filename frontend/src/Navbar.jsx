import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { Context } from './index';

const Navbar = () => {
    const { isAuthenticated, user } = useContext(Context);

    return (
        <div className='w-screen h-12 bg-slate-500 text-white flex justify-between items-center px-5'>
            <div>
                <Link className="font-bold" to="/">ToDo</Link>
            </div>
            {isAuthenticated ? "Hello " + user.name : " "}

            {isAuthenticated ? <Logout /> : <div className='flex gap-2'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>}
        </div>
    )
}

export default Navbar