import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await API.post('/cart', {
                productId: product._id,
                qty,
                selectedSize
            });
            // Could add toast here
            alert("Added to cart!");
        } catch (error) {
            console.error(error);
            alert("Failed to add to cart. Please login first.");
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery (Simplified to single image for now) */}
                <div className="bg-white p-4 border border-gray-100">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>

                {/* Info */}
                <div>
                    <p className="text-aura-pink text-sm uppercase tracking-widest font-bold mb-2">{product.category}</p>
                    <h1 className="text-4xl font-serif text-aura-dark mb-4">{product.name}</h1>
                    <p className="text-2xl text-aura-text mb-6 font-light">₹{product.price.toFixed(2)}</p>

                    <div className="prose prose-sm text-aura-lightText mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="mb-8">
                        <h4 className="font-serif text-aura-dark mb-3">Ingredients:</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ing, index) => (
                                <span key={index} className="bg-aura-blue/20 text-aura-charcoal text-xs px-3 py-1 rounded-full border border-aura-blue/30">
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mb-8">
                            <h4 className="font-serif text-aura-dark mb-3">Size:</h4>
                            <div className="flex gap-4">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border text-sm transition-all duration-300 rounded-lg ${selectedSize === size ? 'border-aura-pink bg-aura-pink text-white shadow-md' : 'border-gray-200 hover:border-aura-pink text-aura-lightText'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex border border-gray-300 h-12 w-32">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 flex items-center justify-center hover:bg-gray-50 text-gray-500">-</button>
                            <div className="flex-1 flex items-center justify-center font-medium">{qty}</div>
                            <button onClick={() => setQty(qty + 1)} className="w-10 flex items-center justify-center hover:bg-gray-50 text-gray-500">+</button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="btn-primary flex-1 h-12 flex items-center justify-center"
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
