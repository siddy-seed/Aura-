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
                console.log(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            await API.post('/cart', {
                productId: product._id,
                qty,
                selectedSize
            });
            navigate('/cart');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                console.error('Error adding to cart:', error);
                alert('Failed to add to cart');
            }
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <button onClick={() => navigate(-1)} className="text-aura-lightText hover:text-aura-dark mb-8 flex items-center gap-2">
                    &larr; Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Image */}
                    <div className="bg-aura-cream/20 rounded-xl overflow-hidden shadow-sm">
                        <img
                            src={`${import.meta.env.VITE_FRONTEND_URL}${product.images[0]}`}
                            alt={product.name}
                            className="w-full h-[320px] md:h-[500px] object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <p className="text-aura-pink text-sm uppercase tracking-widest font-bold mb-2">{product.category}</p>
                        <h1 className="text-4xl font-serif text-aura-dark mb-4">{product.name}</h1>
                        <p className="text-2xl text-aura-text mb-6 font-light">₹{product.price.toFixed(2)}</p>

                        <p className="text-aura-lightText leading-relaxed mb-8 border-b border-gray-100 pb-8">
                            {product.description}
                        </p>

                        {product.ingredients && (
                            <div className="mb-6">
                                <h4 className="font-serif text-aura-dark mb-3">Ingredients:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ing, index) => (
                                        <span key={index} className="bg-aura-blue/20 text-aura-charcoal text-xs px-3 py-1 rounded-full border border-aura-blue/30">
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

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

                        <div className="flex gap-4 items-center mb-8">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-gray-500 hover:text-aura-dark">-</button>
                                <span className="w-12 text-center text-aura-dark font-medium">{qty}</span>
                                <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-gray-500 hover:text-aura-dark">+</button>
                            </div>
                            <button
                                onClick={addToCart}
                                disabled={product.stock === 0}
                                className="flex-1 btn-primary py-3"
                            >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
