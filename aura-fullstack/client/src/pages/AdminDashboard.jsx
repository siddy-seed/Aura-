import { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]); // Simplified for demo
    const [view, setView] = useState('products'); // products, orders, users

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const prodRes = await API.get('/products');
            setProducts(prodRes.data.products);
            const orderRes = await API.get('/orders');
            setOrders(orderRes.data);
            const userRes = await API.get('/users');
            setUsers(userRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/products/${id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-aura-dark text-white p-6 hidden md:block">
                <h2 className="text-2xl font-serif mb-8">Aura Admin</h2>
                <nav className="space-y-4">
                    <button onClick={() => setView('products')} className={`block w-full text-left px-4 py-2 hover:bg-white/10 ${view === 'products' ? 'bg-white/10' : ''}`}>Products</button>
                    <button onClick={() => setView('orders')} className={`block w-full text-left px-4 py-2 hover:bg-white/10 ${view === 'orders' ? 'bg-white/10' : ''}`}>Orders</button>
                    <button onClick={() => setView('users')} className={`block w-full text-left px-4 py-2 hover:bg-white/10 ${view === 'users' ? 'bg-white/10' : ''}`}>Users</button>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-serif text-aura-dark capitalize">{view} Management</h1>
                    {view === 'products' && <button onClick={() => alert('Create feature to be implemented fully')} className="btn-primary">+ Add Product</button>}
                </div>

                <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                    {view === 'products' && (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4 text-xs font-mono">{product._id.substring(0, 6)}...</td>
                                        <td className="px-6 py-4">{product.name}</td>
                                        <td className="px-6 py-4">${product.price}</td>
                                        <td className="px-6 py-4">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {view === 'orders' && (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="px-6 py-4 text-xs font-mono">{order._id.substring(0, 6)}...</td>
                                        <td className="px-6 py-4">{order.userId ? order.userId.name : 'Unknown'}</td>
                                        <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {view === 'users' && (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 text-xs font-mono">{user._id.substring(0, 6)}...</td>
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
