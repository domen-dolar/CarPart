import ProductImageSwiper from "@/app/components/ProductImageSwiper";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const slug = (await params).id;
    
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

    return (
        <div className="mx-[10%] mt-20 p-2 rounded-md bg-shaddy-blue">
            <div className="grid grid-cols-2">
                <div className="space-y-2 text-lg text-center">
                    <p>{product.name}</p>

                    <ProductImageSwiper images={product.images} />
                </div>
            </div>
        </div>
    )
}
export default Page;