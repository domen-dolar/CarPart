/*
  Komponenta za prikaz posameznega izdelka v seznamu ali galeriji.
  - Prikazuje ime izdelka, prvo sliko, kategorijo in ceno.
  - Povezava "details" vodi na stran izdelka.
  - Uporablja FontAwesome ikone za vizualni prikaz.
*/

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Props: 
// - product: objekt izdelka, ki vsebuje name, slug, price, category in images
const ProductCard = ({ product }: { product: any }) => {
    return (
        <li className="productCard" data-testid="product-card">
            {/* Ime izdelka */}
            <div className="text-center text-lg" data-testid="product-name">
                {product.name}
                </div>
                <div className="grid grid-cols-2">
                {/* Slika izdelka */}
                <div>
                    {product.images?.[0]?.asset?.url && (
                    <img src={product.images[0].asset.url} alt={product.name} className="rounded-sm max-h-40" data-testid="product-image" />
                    )}
                </div>
                {/* Podrobnosti izdelka */}
                <div className="productCardDetails">
                    {/* Kategorija */}
                    <p data-testid="product-category">Category: {product.category.name}</p>
                    {/* Cena */}
                    <p data-testid="product-price">Price: {product.price} €</p>
                    {/* Povezava do podrobnosti izdelka */}
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