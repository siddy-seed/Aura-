import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';


const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await API.get('/cart');
                setCart(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                if (error.response && error.response.status === 401) {
                    // navigate('/login'); // Optional redirect or show empty cart
                }
            }
        };
        fetchCart();
    }, []);

    const removeFromCart = async (itemId) => {
        try {
            const { data } = await API.delete(`/cart/${itemId}`);
            setCart(data);
        } catch (error) {
            console.error(error);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const submitOrder = async (e) => {
        e.preventDefault();
        try {
            const orderItems = cart.items.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                qty: item.qty,
                price: item.productId.price,
                product: item.productId._id
            }));

            const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
            const shippingPrice = itemsPrice > 100 ? 0 : 10;
            const taxPrice = 0;
            const totalPrice = itemsPrice + shippingPrice;

            await API.post('/orders', {
                orderItems,
                shippingAddress: address,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            });

            alert("Order placed successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert("Error placing order");
        }
    };

    if (loading) return <div className="text-center py-20">Loading cart...</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif text-aura-dark mb-4">Your Cart is Empty</h1>
                <Link to="/products" className="btn-primary">Browse Shop</Link>
            </div>
        );
    }

    const subtotal = cart.items.reduce((acc, item) => acc + item.qty * item.productId.price, 0);

    return (
        <div className="py-12 bg-white relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-serif text-aura-dark mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-6">
                        {cart.items.map(item => (
                            <div key={item._id} className="flex gap-4 border-b border-gray-100 pb-6">
                                <img src={`${import.meta.env.VITE_FRONTEND_URL}${item.productId.images[0]}`} alt={item.productId.name} className="w-24 h-24 object-cover" />
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-serif text-lg text-aura-dark">{item.productId.name}</h3>
                                        <p className="font-bold">₹{(item.productId.price * item.qty).toFixed(2)}</p>
                                    </div>
                                    <p className="text-xs text-aura-lightText mb-2">Size: {item.selectedSize}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-sm text-aura-text">Qty: {item.qty}</div>
                                        <button onClick={() => removeFromCart(item._id)} className="text-xs text-red-400 hover:text-red-600 uppercase tracking-wider">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-aura-cream/50 p-6 h-fit">
                        <h3 className="font-serif text-xl mb-4">Order Summary</h3>
                        <div className="space-y-2 mb-6 text-sm text-aura-dark">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{subtotal > 100 ? 'Free' : '₹10.00'}</span>
                            </div>
                            <div className="border-t border-aura-pink/20 pt-2 mt-2 font-bold flex justify-between">
                                <span>Total</span>
                                <span>₹{(subtotal + (subtotal > 100 ? 0 : 10)).toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={() => setShowModal(true)} className="btn-primary w-full whitespace-nowrap px-4 flex justify-center items-center">Proceed to Checkout</button>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
                        <h2 className="text-2xl font-serif text-aura-dark mb-6">Shipping Details</h2>
                        <form onSubmit={submitOrder} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="input-field w-full"
                                    value={address.address}
                                    onChange={handleInputChange}
                                    placeholder="123 Aura Lane"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    className="input-field w-full"
                                    value={address.city}
                                    onChange={handleInputChange}
                                    placeholder="Metropolis"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        className="input-field w-full"
                                        value={address.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="12345"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        className="input-field w-full"
                                        value={address.country}
                                        onChange={handleInputChange}
                                        placeholder="Wonderland"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-aura-lightText hover:text-aura-dark transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary">Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
