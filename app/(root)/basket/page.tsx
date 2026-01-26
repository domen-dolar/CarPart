// Pridobivanje seje (avtentikacija uporabnika)
import { auth } from "@/auth";
// Sanity client za branje podatkov iz CMS-a
import { client } from "@/sanity/lib/client";
// GROQ poizvedba za pridobitev izdelkov v košarici
import { BASKET_ITEMS_QUERY } from "@/sanity/lib/queries";
// Next.js redirect (server-side navigacija)
import { redirect } from "next/navigation";
// Komponenta za spreminjanje količine izdelka
import BasketItemQuantity from "@/app/components/BasketItemQuantity";
// Gumb za odstranjevanje izdelka iz košarice
import RemoveBasketItemButton from "@/app/components/RemoveBasketItemButton";
// Next.js server-side forma
import Form from "next/form";
// Server action za oddajo naročila
import { makeOrder } from "@/app/actions/basket";
// Komponenta za prikaz skupne cene
import TotalBasketPrice from "@/app/components/TotalBasketPrice";
// Client komponenta (za interaktivne elemente)
import BasketClient from "@/app/components/BasketClient";

// Server Component – prikaz košarice
const Basket = async () => {
    // Pridobimo trenutno prijavljenega uporabnika
    const session = await auth();

    // Če uporabnik ni prijavljen, ga preusmerimo na začetno stran
    if (!session || !session.user) {
        redirect("/");
    }

    // Iz Sanity CMS pridobimo košarico uporabnika
    const basket = await client.fetch(BASKET_ITEMS_QUERY, { userId: session?.user.id });

    // Boolean, ki pove ali ima košarica izdelke
    let basketItems = false;

    // Če košarica ne obstaja
    if (basket == null)
        basketItems = false;

    // Če obstaja in vsebuje vsaj en izdelek
    else if (basket.items.length > 0)
        basketItems = true;

    return (
        <div className="basketPage">
            <p className="text-xl text-light-gray">Your basket items:</p>

{/* Če košarica NI prazna */}
            {basketItems ? (
                <>
                    <BasketClient>
                        <ul className="space-y-5">
                            {/* Izpis vseh izdelkov v košarici */}
                            {basket.items.map((item: any) => (
                                <li className="basketItemCard" key={item.product._id}>
                                    <div className="w-9/10 grid grid-cols-3">
                                    {/* Slika izdelka */}
                                        <img src={item.product.images[0].asset.url} alt={item.product.name} className="rounded-sm max-h-40" />
                                        {/* Ime izdelka */}
                                        <p className="my-auto text-lg">{item.product.name}</p>
                                        {/* Cena in količina */}
                                        <div className="my-auto grid grid-cols-2">
                                            <div>
                                                <p>Price per item:</p>
                                                <p>Quantity:</p>
                                            </div>
                                            <div className="space-y-2 text-center">
                                                <p>{item.price} €</p>
                                                {/* Spreminjanje količine */}
                                                <BasketItemQuantity prevQuantity={item.quantity} stock={item.product.stock} slug={item.product.slug.current} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Gumb za odstranitev izdelka */}
                                    <div className="removeBasketItemParent">
                                        <RemoveBasketItemButton slug={item.product.slug.current} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        {/* Povzetek košarice */}
                        <div className="text-lg bg-shaddy-blue p-2 rounded-md">
                            <div className="flex justify-between">
                                {/* Skupna cena */}
                                <div className="flex items-center space-x-2">
                                    <span>Total price:</span>
                                    <TotalBasketPrice totalPrice={basket.items
                                        .reduce((total: number, item: any) => total + item.price * item.quantity, 0)
                                        .toFixed(2)}
                                    />
                                </div>

                                {/* Oddaja naročila */}
                                <Form action={makeOrder}>
                                    <button className="button" data-testid="checkout">
                                        Proceed with payment
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </BasketClient>
                </>
            ) : // Če je košarica prazna
                <p className="text-light-gray">Your basket is empty.</p>
            }
        </div>
    )
}
export default Basket;