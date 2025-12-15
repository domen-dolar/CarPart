import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
    return (
        <li className="productCard">
            <div className="text-center text-lg">
            {product.name}
            </div>
            <div className="grid grid-cols-2">
            <div>
                {product.images?.[0]?.asset?.url && (
                <img src={product.images[0].asset.url} alt={product.name} className="rounded-sm max-h-40" />
                )}
            </div>
            <div className="productCardDetails">
                <p>Category: {product.category.name}</p>

                <p>Price: {product.price} €</p>

                <Link href={`/product/${product.slug.current}`} className="button w-fit">
                    details
                </Link>
            </div>
            </div>
        </li>
    )
}
export default ProductCard;