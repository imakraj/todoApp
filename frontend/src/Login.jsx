import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from './index';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/users/login", {
                email,
                password
            }, { withCredentials: true });

            setIsAuthenticated(true);
            toast.success(response.data.message);
        } catch (error) {
            console.log(error.message);
            toast.error("Invalid Credentials");
            setIsAuthenticated(false);
        }
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className="bg-slate-100 h-screen w-screen flex  flex-col justify-center items-center">
            <h1 className="text-gray-700 font-bold text-[1.5rem] mb-4">Login</h1>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;