import { motion } from 'framer-motion';

const About = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
    };

    return (
        <div className="min-h-screen bg-aura-cream text-aura-charcoal">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="py-24 md:py-32 px-6 text-center"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.span variants={fadeInUp} className="text-aura-pink uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                        Est. 2024
                    </motion.span>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif text-aura-charcoal mb-8 leading-tight">
                        Our Story
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-aura-text font-serif italic font-light leading-relaxed max-w-2xl mx-auto">
                        "Beauty is not just what you see. <br /> It is a feeling, a ritual, a return to nature."
                    </motion.p>
                </div>
            </motion.section>

            {/* Narrative Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative flex justify-center items-center">
                                <img
                                    src="https://res.cloudinary.com/dgdpqdahl/image/upload/v1765457652/aura/brand/about-logo-floral.png"
                                    alt="Aura Floral Logo"
                                    className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-700 filter drop-shadow-xl"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-serif mb-6 text-aura-charcoal">Rooted in Earth</h2>
                            <p className="text-aura-text leading-loose mb-6 font-light text-lg">
                                Aura began with a simple belief: that skincare should be pure, intentional, and kind.
                                In a world of noise and synthetics, we sought silence. We turned to the earth—to the
                                healing power of botanicals, the richness of cold-compressed oils, and the softness of natural clays.
                            </p>
                            <p className="text-aura-text leading-loose font-light text-lg">
                                Every product is a handcrafted invitation to slow down. To breathe. To nourish not just your skin,
                                but your spirit. We don't just make skincare; we curate moments of peace.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-aura-sand/30">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-aura-pink/10 transition-all duration-500 text-center border border-aura-pink/10">
                            <div className="w-16 h-16 mx-auto mb-6 bg-aura-pink/10 rounded-full flex items-center justify-center text-aura-pink text-2xl font-serif">
                                🌿
                            </div>
                            <h3 className="text-xl font-serif mb-4">Pure Ingredients</h3>
                            <p className="text-aura-lightText font-light leading-relaxed">
                                Sourced with integrity. We use only organic, wild-crafted botanicals naturally rich in vitamins and antioxidants.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-aura-pink/10 transition-all duration-500 text-center border border-aura-pink/10">
                            <div className="w-16 h-16 mx-auto mb-6 bg-aura-pink/10 rounded-full flex items-center justify-center text-aura-pink text-2xl font-serif">
                                🤲
                            </div>
                            <h3 className="text-xl font-serif mb-4">Handcrafted</h3>
                            <p className="text-aura-lightText font-light leading-relaxed">
                                Made in small batches. Each product is poured, cut, and packaged by hand to ensure the highest quality.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-aura-pink/10 transition-all duration-500 text-center border border-aura-pink/10">
                            <div className="w-16 h-16 mx-auto mb-6 bg-aura-pink/10 rounded-full flex items-center justify-center text-aura-pink text-2xl font-serif">
                                ✨
                            </div>
                            <h3 className="text-xl font-serif mb-4">Conscious Luxury</h3>
                            <p className="text-aura-lightText font-light leading-relaxed">
                                Luxury without compromise. Sustainable packaging and ethical sourcing for a guilt-free indulgence.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
