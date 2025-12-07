import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../services/auth';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        window.addEventListener('storage', handleStorageChange);
        // Custom event for immediate UI update on same tab login/logout
        window.addEventListener('auth-change', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', handleStorageChange);
        }
    }, []);

    const onLogout = () => {
        authService.logout();
        window.dispatchEvent(new Event('auth-change'));
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-aura-pink/20">
            <div className="container mx-auto px-4 sm:px-6 md:px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src="/aura-logo.png" alt="Aura Logo" className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-80 transition-opacity" />
                    <span className="text-2xl sm:text-3xl font-serif text-aura-charcoal tracking-wide font-bold group-hover:text-aura-pink transition-colors">Aura</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 items-center font-medium text-aura-text text-xs uppercase tracking-widest">
                    <Link to="/" className="hover:text-aura-pink transition-colors duration-300">Home</Link>
                    <Link to="/products" className="hover:text-aura-pink transition-colors duration-300">Shop</Link>
                    <Link to="/about" className="hover:text-aura-pink transition-colors duration-300">About</Link>
                    <Link to="/contact" className="hover:text-aura-pink transition-colors duration-300">Contact</Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-1 hover:text-aura-pink py-2 transition-colors duration-300">
                                <span>{user.name}</span>
                            </button>
                            <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                                <div className="bg-white border border-aura-pink/20 shadow-xl py-2 rounded-xl overflow-hidden">
                                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-aura-blue/20 text-sm transition-colors">Dashboard</Link>
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2 hover:bg-aura-blue/20 text-sm transition-colors">Admin Panel</Link>
                                    )}
                                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-aura-blue/20 text-sm transition-colors">Logout</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-aura-pink transition-colors duration-300">Login</Link>
                    )}

                    <Link to="/cart" className="relative hover:text-aura-pink transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-aura-charcoal" onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-aura-pink/20 py-6 px-6 flex flex-col space-y-4 shadow-lg">
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Home</Link>
                    <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Shop</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">About</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Contact</Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Cart</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Dashboard</Link>
                            {user.role === 'admin' && <Link to="/admin" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Admin</Link>}
                            <button onClick={() => { onLogout(); setIsOpen(false); }} className="text-left hover:text-aura-pink">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-aura-pink">Login</Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
