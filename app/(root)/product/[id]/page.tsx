import AddtoBasket from "@/app/components/AddToBasket";
import ProductImageSwiper from "@/app/components/ProductImageSwiper";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const slug = (await params).id;
    
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

    const session = await auth() ? true : false;

    return (
        <div className="productPage">
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2 text-lg text-center">
                    <p>{product.name}</p>

                    <ProductImageSwiper images={product.images} />
                </div>
                <div className="productCardDetails">
                    <p>SKU / part number: {product.sku}</p>
                    <div className="addProductToBasketParent">
                        <p>Price: <span className="text-lg">{product.price}</span> €</p>
                        <AddtoBasket product={product} session={session} />
                        <p>Items left in stock: {product.stock}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="whitespace-pre-wrap">
                <p className="text-lg">Product details:</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-r">
                        {product.description}
                    </div>
                    <div>
                        <p>Category: {product.category.name}</p>
                        <div className="my-5">
                            <p>Compatible cars:</p>
                            <ul className="list-disc list-inside">
                                {product.compatibleCars.map((car: any) => (
                                    <li key={car._id}>
                                        {car.make} {car.model} ({car.yearFrom} - {car.yearTo})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page;