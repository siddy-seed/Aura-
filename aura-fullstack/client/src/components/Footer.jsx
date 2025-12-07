const Footer = () => {
    return (
        <footer className="bg-aura-cream pt-20 pb-10 border-t border-aura-charcoal/5 mt-auto font-sans">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            {/* Logo */}
                            <span className="text-3xl font-serif font-bold text-aura-charcoal tracking-tight">Aura</span>
                        </div>
                        <p className="text-aura-lightText text-sm leading-7 font-light tracking-wide max-w-xs">
                            Handcrafted organic bodycare for your daily ritual. <br />
                            Natural. Luxurious. You.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif text-aura-charcoal text-lg mb-6 tracking-wide">Shop</h4>
                        <ul className="space-y-4 text-xs text-aura-lightText uppercase tracking-widest font-medium">
                            <li><a href="/products?category=soap" className="hover:text-aura-pink transition-colors duration-300">Soaps</a></li>
                            <li><a href="/products?category=skincare" className="hover:text-aura-pink transition-colors duration-300">Skincare</a></li>
                            <li><a href="/products?category=bodycare" className="hover:text-aura-pink transition-colors duration-300">Bodycare</a></li>
                            <li><a href="/products" className="hover:text-aura-pink transition-colors duration-300">All Products</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif text-aura-charcoal text-lg mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-4 text-xs text-aura-lightText uppercase tracking-widest font-medium">
                            <li><a href="/about" className="hover:text-aura-pink transition-colors duration-300">About Us</a></li>
                            <li><a href="/contact" className="hover:text-aura-pink transition-colors duration-300">Contact</a></li>
                            <li><a href="#" className="hover:text-aura-pink transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-aura-pink transition-colors duration-300">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif text-aura-charcoal text-lg mb-6 tracking-wide">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-aura-charcoal/10 flex items-center justify-center text-aura-charcoal/60 hover:bg-aura-charcoal hover:text-white hover:border-aura-charcoal transition-all duration-300">
                                <span className="text-xs">IG</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-aura-charcoal/10 flex items-center justify-center text-aura-charcoal/60 hover:bg-aura-charcoal hover:text-white hover:border-aura-charcoal transition-all duration-300">
                                <span className="text-xs">FB</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-aura-charcoal/10 flex items-center justify-center text-aura-charcoal/60 hover:bg-aura-charcoal hover:text-white hover:border-aura-charcoal transition-all duration-300">
                                <span className="text-xs">PI</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-aura-charcoal/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-aura-lightText uppercase tracking-widest font-medium">
                    <p>&copy; {new Date().getFullYear()} Aura Bodycare.</p>
                    <p className="mt-2 md:mt-0">Crafted with intention.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
