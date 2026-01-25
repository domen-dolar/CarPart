import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
    return (
        <li className="productCard" data-testid="product-card">
            <div className="text-center text-lg" data-testid="product-name">
                {product.name}
                </div>
                <div className="grid grid-cols-2">
                <div>
                    {product.images?.[0]?.asset?.url && (
                    <img src={product.images[0].asset.url} alt={product.name} className="rounded-sm max-h-40" data-testid="product-image" />
                    )}
                </div>
                <div className="productCardDetails">
                    <p data-testid="product-category">Category: {product.category.name}</p>

                    <p data-testid="product-price">Price: {product.price} €</p>

                    <Link href={`/product/${product.slug.current}`} className="button w-fit" data-testid="product-details-button">
                        details
                        <FontAwesomeIcon className="ml-1" icon={faInfoCircle} />
                    </Link>
                </div>
            </div>
        </li>
    )
}
export default ProductCard;