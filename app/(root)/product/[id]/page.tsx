// Komponenta za dodajanje izdelka v košarico
import AddtoBasket from "@/app/components/AddToBasket";
// Swiper za slike izdelka
import ProductImageSwiper from "@/app/components/ProductImageSwiper";
// Avtentikacija uporabnika (server-side)
import { auth } from "@/auth";
// Sanity client
import { client } from "@/sanity/lib/client";
// GROQ query za izdelek po slug-u
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

// Server Component – stran posameznega izdelka
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Slug izdelka iz URL-ja
    const slug = (await params).id;
    
    // Pridobimo izdelek iz Sanity CMS
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

    // Preverimo, ali je uporabnik prijavljen
    // (pretvorimo session v boolean)
    const session = await auth() ? true : false;

    return (
        <div className="productPage">
            {/* ZGORNJI DEL – slike + osnovni podatki */}
            <div className="grid grid-cols-2 gap-2">
                {/* Leva stran – ime in slike */}
                <div className="space-y-2 text-lg text-center">
                    <p>{product.name}</p>

                    <ProductImageSwiper images={product.images} />
                </div>
                {/* Desna stran – cena in košarica */}
                <div className="productCardDetails">
                    <p>SKU / part number: {product.sku}</p>
                    <div className="addProductToBasketParent">
                        <p>Price: <span className="text-lg">{product.price}</span> €</p>
                        {/* Dodajanje v košarico */}
                        <AddtoBasket product={product} session={session} />
                        <p>Items left in stock: {product.stock}</p>
                    </div>
                </div>
            </div>
            <hr />
            {/* SPODNJI DEL – opis in dodatni podatki */}
            <div className="whitespace-pre-wrap">
                <p className="text-lg">Product details:</p>
                <div className="grid grid-cols-2 gap-4">
                     {/* Opis izdelka */}
                    <div className="border-r">
                        {product.description}
                    </div>
                    {/* Kategorija in kompatibilnost */}
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