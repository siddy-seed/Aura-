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

    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        images: '',
        ingredients: '',
        sizes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            // Convert comma-separated URLs to array
            const imageUrls = newProduct.images
                .split(',')
                .map(url => url.trim())
                .filter(url => url.length > 0);

            const productData = {
                name: newProduct.name,
                price: newProduct.price,
                category: newProduct.category,
                stock: newProduct.stock,
                description: newProduct.description,
                ingredients: newProduct.ingredients,
                sizes: newProduct.sizes,
                images: imageUrls
            };

            const { data } = await API.post('/products', productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setProducts([data, ...products]);
            setShowAddModal(false);
            setNewProduct({ name: '', price: '', category: '', stock: '', description: '', images: '', ingredients: '', sizes: '' });
            alert('Product added successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to add product');
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
            <div className="flex-1 p-8 relative">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-serif text-aura-dark capitalize">{view} Management</h1>
                    {view === 'products' && <button onClick={() => setShowAddModal(true)} className="btn-primary">+ Add Product</button>}
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
                                        <td className="px-6 py-4">₹{product.price}</td>
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
                                        <td className="px-6 py-4">₹{order.total.toFixed(2)}</td>
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

                {/* Add Product Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-serif text-aura-dark mb-6">Add New Product</h2>
                            <form onSubmit={handleCreateProduct} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Product Name</label>
                                    <input type="text" name="name" required className="input-field" value={newProduct.name} onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Price (₹)</label>
                                        <input type="number" name="price" required className="input-field" value={newProduct.price} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Stock</label>
                                        <input type="number" name="stock" required className="input-field" value={newProduct.stock} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Category (comma sep)</label>
                                    <input type="text" name="category" placeholder="soap, skincare" className="input-field" value={newProduct.category} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Image URLs (Cloudinary)</label>
                                    <input
                                        type="text"
                                        name="images"
                                        placeholder="Paste URLs (comma-separated for multiple)"
                                        required
                                        className="input-field"
                                        value={newProduct.images}
                                        onChange={handleInputChange}
                                    />
                                    <p className="text-xs text-aura-lightText mt-1">Upload images to Cloudinary first, then paste URLs here</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Description</label>
                                    <textarea name="description" rows="3" required className="input-field" value={newProduct.description} onChange={handleInputChange}></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Ingredients (comma separated)</label>
                                    <input type="text" name="ingredients" placeholder="e.g. Glycerin, Honey, Rose Water" required className="input-field" value={newProduct.ingredients} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-aura-text mb-1">Sizes (comma separated)</label>
                                    <input type="text" name="sizes" placeholder="e.g. Small, Medium, Large" required className="input-field" value={newProduct.sizes} onChange={handleInputChange} />
                                </div>

                                <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 text-aura-lightText hover:text-aura-dark transition-colors">Cancel</button>
                                    <button type="submit" className="flex-1 btn-primary">Add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
