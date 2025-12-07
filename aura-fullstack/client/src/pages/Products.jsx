import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // Parse query params
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || '';
    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let query = '';
                if (category) query += `category=${category}&`;
                if (keyword) query += `keyword=${keyword}&`;

                const { data } = await API.get(`/products?${query}`);
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, keyword]);

    const handleFilter = (cat) => {
        navigate(cat ? `/products?category=${cat}` : '/products');
    };

    return (
        <div className="pt-8 pb-20">
            <div className="bg-aura-blush/30 py-12 mb-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-serif text-aura-dark mb-4">
                        {category ? (category.charAt(0).toUpperCase() + category.slice(1) + 's') : 'All Collections'}
                    </h1>
                    <p className="text-aura-lightText max-w-xl mx-auto">
                        Explore our range of organic, handcrafted essentials designed to nurture your body and soul.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-aura-pink/20 pb-4">
                    <button
                        onClick={() => handleFilter('')}
                        className={`text-sm uppercase tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${!category ? 'bg-aura-pink text-white font-bold shadow-md' : 'bg-aura-cream text-aura-lightText hover:bg-aura-pink/20 hover:text-aura-charcoal'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilter('soap')}
                        className={`text-sm uppercase tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${category === 'soap' ? 'bg-aura-pink text-white font-bold shadow-md' : 'bg-aura-cream text-aura-lightText hover:bg-aura-pink/20 hover:text-aura-charcoal'}`}
                    >
                        Soaps
                    </button>
                    <button
                        onClick={() => handleFilter('skincare')}
                        className={`text-sm uppercase tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${category === 'skincare' ? 'bg-aura-pink text-white font-bold shadow-md' : 'bg-aura-cream text-aura-lightText hover:bg-aura-pink/20 hover:text-aura-charcoal'}`}
                    >
                        Skincare
                    </button>
                    <button
                        onClick={() => handleFilter('bodycare')}
                        className={`text-sm uppercase tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${category === 'bodycare' ? 'bg-aura-pink text-white font-bold shadow-md' : 'bg-aura-cream text-aura-lightText hover:bg-aura-pink/20 hover:text-aura-charcoal'}`}
                    >
                        Bodycare
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-aura-pink font-serif">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 text-aura-lightText">No products found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
