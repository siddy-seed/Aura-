import { useState, useEffect } from 'react';
import API from '../services/api';

const Dashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders/myorders');
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-serif text-aura-dark mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Profile Info */}
                    <div className="bg-white p-6 shadow-sm border border-gray-100 h-fit">
                        <h2 className="font-serif text-xl mb-4">Profile</h2>
                        <div className="space-y-2 mb-6 text-sm text-aura-lightText">
                            <p><span className="font-bold text-aura-dark">Name:</span> {user.name}</p>
                            <p><span className="font-bold text-aura-dark">Email:</span> {user.email}</p>
                            <p><span className="font-bold text-aura-dark">Role:</span> <span className="uppercase">{user.role}</span></p>
                        </div>
                        <button className="btn-secondary w-full text-xs">Edit Profile</button>
                    </div>

                    {/* Orders */}
                    <div className="md:col-span-2">
                        <h2 className="font-serif text-xl mb-4">Order History</h2>
                        {loading ? (
                            <div>Loading...</div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-8 text-center border border-gray-100">
                                <p className="text-aura-lightText mb-4">You haven't placed any orders yet.</p>
                                <a href="/products" className="text-aura-pink underline hover:text-aura-charcoal transition-colors">Start Shopping</a>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-white p-6 border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                                            <div>
                                                <span className="font-bold text-aura-dark">Order #{order._id.substring(0, 8)}</span>
                                                <span className="text-xs text-aura-lightText ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <span className={`text-xs px-2 py-1 uppercase tracking-wide border ${order.status === 'Pending' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' : 'text-green-600 border-green-200 bg-green-50'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span>{item.name} x {item.qty}</span>
                                                    <span>${(item.price * item.qty).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between font-bold text-aura-dark">
                                            <span>Total</span>
                                            <span>${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
