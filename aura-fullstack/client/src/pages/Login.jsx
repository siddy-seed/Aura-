import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login({ email, password });
            window.dispatchEvent(new Event('auth-change'));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-aura-cream/30 py-12">
            <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 max-w-md w-full">
                <h1 className="text-3xl font-serif text-center text-aura-dark mb-8">Welcome Back</h1>
                {error && <div className="bg-red-50 text-red-500 p-3 text-sm mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-aura-text mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-aura-text mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">Sign In</button>
                </form>

                <p className="text-center mt-6 text-sm text-aura-lightText">
                    Don't have an account? <Link to="/signup" className="text-aura-pink hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
