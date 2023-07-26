import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='w-screen h-12 bg-slate-500 text-white flex justify-between items-center px-5'>
            <div>
                <Link className="font-bold" to="/Home">ToDo</Link>
            </div>
            <div>
                <Link to="/Login">Login</Link>
                <Link className="ml-4" to="/Register">Register</Link>
            </div>
        </div>
    )
}

export default Navbar