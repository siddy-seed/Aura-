import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/* Hero Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative h-[420px] sm:h-[520px] md:h-[600px] bg-gradient-to-br from-aura-sand via-aura-cream to-aura-blue/20 flex items-center justify-center text-center px-4 overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10 bg-[url('https://i.pinimg.com/1200x/ba/f9/7a/baf97a3ef22d862453c720fbfcee05fe.jpg')] bg-cover bg-center mix-blend-multiply pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <motion.p variants={fadeInUp} className="text-aura-pink tracking-[0.2em] uppercase text-xs font-bold mb-6">Welcome to Aura</motion.p>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif text-aura-charcoal mb-6 leading-tight">
                        Natural. Luxurious. <br /> <span className="italic text-aura-pink">You.</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-aura-text text-lg mb-10 max-w-lg mx-auto font-light">
                        Discover the art of self-care with our handcrafted organic bodycare collection.
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <Link to="/products" className="btn-primary inline-block shadow-lg shadow-aura-pink/20">
                            Shop Collection
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Featured Products */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-serif text-aura-charcoal mb-6">Featured Essentials</h2>
                        <div className="w-16 h-0.5 bg-aura-pink mx-auto rounded-full"></div>
                    </motion.div>

                    {loading ? (
                        <div className="text-center text-aura-pink font-serif italic text-xl">Loading luxury...</div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-3 gap-10"
                        >
                            {featuredProducts.map(product => (
                                <motion.div key={product._id} variants={fadeInUp}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    <div className="text-center mt-16">
                        <Link to="/products" className="btn-secondary inline-block">View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-aura-blue/20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-serif text-center text-aura-charcoal mb-16"
                    >
                        Stories from our Community
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-8 bg-white/50 rounded-2xl border border-white shadow-sm hover:shadow-xl hover:shadow-aura-pink/10 transition-all duration-300"
                        >
                            <img src="/testimonials/customer1.png" alt="Emma S." className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-md" />
                            <div className="text-aura-pink text-5xl font-serif mb-4 leading-none opacity-50">"</div>
                            <p className="text-aura-text italic mb-6 font-light">The soaps are absolutely divine. My skin has never felt softer.</p>
                            <p className="font-bold text-xs uppercase tracking-widest text-aura-charcoal">- Emma S.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-8 bg-white/50 rounded-2xl border border-white shadow-sm hover:shadow-xl hover:shadow-aura-pink/10 transition-all duration-300"
                        >
                            <img src="/testimonials/customer2.png" alt="Sarah L." className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-md" />
                            <div className="text-aura-pink text-5xl font-serif mb-4 leading-none opacity-50">"</div>
                            <p className="text-aura-text italic mb-6 font-light">I love the sustainable packaging and the lavender scent is heaven.</p>
                            <p className="font-bold text-xs uppercase tracking-widest text-aura-charcoal">- Sarah L.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-8 bg-white/50 rounded-2xl border border-white shadow-sm hover:shadow-xl hover:shadow-aura-pink/10 transition-all duration-300"
                        >
                            <img src="/testimonials/customer3.png" alt="Jessica M." className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-md" />
                            <div className="text-aura-pink text-5xl font-serif mb-4 leading-none opacity-50">"</div>
                            <p className="text-aura-text italic mb-6 font-light">A truly premium experience from unboxing to using the product.</p>
                            <p className="font-bold text-xs uppercase tracking-widest text-aura-charcoal">- Jessica M.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
