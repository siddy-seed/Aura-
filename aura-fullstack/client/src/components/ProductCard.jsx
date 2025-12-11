import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white rounded-2xl border border-aura-pink/10 hover:shadow-xl hover:shadow-aura-pink/5 transition-all duration-500 overflow-hidden">
            <Link to={`/products/${product._id}`} className="block overflow-hidden relative pb-[100%] md:pb-[75%]">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                />
                {product.stock === 0 && (
                    <div className="absolute top-3 right-3 bg-aura-charcoal text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold rounded-sm">
                        Out of Stock
                    </div>
                )}
            </Link>
            <div className="p-6 text-center">
                <p className="text-[10px] text-aura-pink font-bold uppercase tracking-[0.2em] mb-2">{product.category}</p>
                <Link to={`/products/${product._id}`}>
                    <h3 className="text-lg font-serif text-aura-charcoal hover:text-aura-pink transition-colors mb-2 duration-300">{product.name}</h3>
                </Link>
                <p className="text-aura-text font-medium text-sm">₹{product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
