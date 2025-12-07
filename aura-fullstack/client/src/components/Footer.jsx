const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-aura-blue/20 to-white pt-16 pb-8 border-t border-aura-pink/10 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/aura-logo.png" alt="Aura Logo" className="h-10 w-auto" />
                            <h3 className="text-2xl font-serif font-bold text-aura-charcoal">Aura</h3>
                        </div>
                        <p className="text-aura-lightText leading-relaxed">
                            Natural. Luxurious. You. <br />
                            Handcrafted organic bodycare for your daily ritual.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-aura-charcoal text-lg mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-aura-lightText uppercase tracking-wide">
                            <li><a href="/products?category=soap" className="hover:text-aura-pink transition-colors">Soaps</a></li>
                            <li><a href="/products?category=skincare" className="hover:text-aura-pink transition-colors">Skincare</a></li>
                            <li><a href="/products?category=bodycare" className="hover:text-aura-pink transition-colors">Bodycare</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-aura-charcoal text-lg mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-aura-lightText uppercase tracking-wide">
                            <li><a href="/about" className="hover:text-aura-pink transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-aura-pink transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-aura-pink transition-colors">Shipping & Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-aura-charcoal text-lg mb-6">Stay Connected</h4>
                        <div className="flex space-x-4">
                            {/* Simple Social Placeholders */}
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-aura-pink hover:text-white transition-all duration-300 shadow-sm cursor-pointer border border-aura-pink/10">IG</div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-aura-pink hover:text-white transition-all duration-300 shadow-sm cursor-pointer border border-aura-pink/10">FB</div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-aura-pink hover:text-white transition-all duration-300 shadow-sm cursor-pointer border border-aura-pink/10">PI</div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-aura-charcoal/5 pt-8 text-center text-aura-lightText text-sm">
                    &copy; {new Date().getFullYear()} Aura Bodycare. All rights reserved.
                </div>
            </div>
        </footer>

    );
};

export default Footer;
