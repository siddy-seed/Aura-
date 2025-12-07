import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products?pageNumber=1');
                setFeaturedProducts(data.products.slice(0, 3));
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] bg-gradient-to-br from-aura-sand via-aura-cream to-aura-blue/20 flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=1600&q=80')] bg-cover bg-center mix-blend-multiply pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-aura-pink tracking-[0.2em] uppercase text-xs font-bold mb-6 animate-fade-in-up">Welcome to Aura</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-aura-charcoal mb-6 leading-tight animate-fade-in-up delay-100">
                        Natural. Luxurious. <br /> <span className="italic text-aura-pink">You.</span>
                    </h1>
                    <p className="text-aura-text text-lg mb-10 max-w-lg mx-auto animate-fade-in-up delay-200 font-light">
                        Discover the art of self-care with our handcrafted organic bodycare collection.
                    </p>
                    <Link to="/products" className="btn-primary animate-fade-in-up delay-300 inline-block shadow-lg shadow-aura-pink/20">
                        Shop Collection
                    </Link>
                </div>
            </div>

            {/* Featured Products */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif text-aura-charcoal mb-6">Featured Essentials</h2>
                        <div className="w-16 h-0.5 bg-aura-pink mx-auto rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="text-center text-aura-pink font-serif italic text-xl">Loading luxury...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-16">
                        <Link to="/products" className="btn-secondary inline-block">View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-aura-blue/20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-serif text-center text-aura-charcoal mb-16">Stories from our Community</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 bg-white/50 rounded-2xl border border-white shadow-sm">
                            <div className="text-aura-pink text-5xl font-serif mb-6 leading-none">"</div>
                            <p className="text-aura-text italic mb-6 font-light">The soaps are absolutely divine. My skin has never felt softer.</p>
                            <p className="font-bold text-xs uppercase tracking-widest text-aura-charcoal">- Emma S.</p>
                        </div>
                        <div className="p-8 bg-white/50 rounded-2xl border border-white shadow-sm">
                            <div className="text-aura-pink text-5xl font-serif mb-6 leading-none">"</div>
                            <p className="text-aura-text italic mb-6 font-light">I love the sustainable packaging and the lavender scent is heaven.</p>
                            <p className="font-bold text-xs uppercase tracking-widest text-aura-charcoal">- Sarah L.</p>
                        </div>
                        <div className="p-8 bg-white/50 rounded-2xl border border-white shadow-sm">
                            <div className="text-aura-pink text-5xl font-serif mb-6 leading-none">"</div>
                            <p className="text-aura-text italic mb-6 font-light">A truly premium experience from unboxing to using the product.</p>
                            <p className="font-bold text-xs uppercase tracking-widest text-aura-charcoal">- Jessica M.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
