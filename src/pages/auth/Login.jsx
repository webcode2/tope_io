import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIfAuthenticated, clearError, loginAccount } from "../../store/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const authError = useSelector(state => state.auth.error); // <-- Add this line

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(checkIfAuthenticated())
    }, [])

    useEffect(() => {

        if (isAuthenticated) {
            navigate("/dashboard")
        }
        return () => { dispatch(clearError()) }
    }, [isAuthenticated, navigate, dispatch])



    const validate = () => {
        const errs = {};
        if (!form.email.includes('@')) errs.email = 'Invalid email';
        if (form.password.length < 6) errs.password = 'Minimum 6 characters required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch(loginAccount({ email: form.email, password: form.password }));
        // Optionally navigate after login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {/* Show authentication error from Redux */}
                {authError && (
                    <div className="mb-4 text-red-600 text-center text-sm font-medium">
                        {authError}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Sign In
                </button>
                <p className="text-xs mt-4 "> <Link className="text-blue-400" to={"/auth/forget-password"}>Forgot password?</Link> </p>

                <p className="text-xs mt-4 "> Don't have an Account? <Link className="text-blue-400" to={"/auth/register"}>Sign up</Link> no for one!</p>

            </form>
        </div>
    );
}
