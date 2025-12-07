const About = () => {
    return (
        <div className="py-20">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h1 className="text-5xl font-serif text-aura-dark mb-8">Our Story</h1>
                <p className="text-xl text-aura-lightText mb-12 leading-relaxed">
                    Aura was born from a desire to return to the simple, raw beauty of nature.
                    We believe that your daily ritual should be a moment of luxury, peace, and connection with yourself.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-20">
                    <div>
                        <h3 className="text-2xl font-serif text-aura-charcoal mb-4">Pure Ingredients</h3>
                        <p className="text-aura-lightText">
                            We source only the finest organic botanicals, essential oils, and clays.
                            No harsh chemicals, no synthetic fragrances. Just raw, earth-given goodness.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif text-aura-charcoal mb-4">Handcrafted</h3>
                        <p className="text-aura-lightText">
                            Every bar of soap, every jar of scrub is made by hand in small batches to ensure quality and care.
                            We pour our heart into every product we create.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
