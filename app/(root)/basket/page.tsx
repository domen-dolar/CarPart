import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { BASKET_ITEMS_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";
import BasketItemQuantity from "@/app/components/BasketItemQuantity";
import RemoveBasketItemButton from "@/app/components/RemoveBasketItemButton";
import Form from "next/form";
import { makeOrder } from "@/app/actions/basket";
import TotalBasketPrice from "@/app/components/TotalBasketPrice";
import BasketClient from "@/app/components/BasketClient";

const Basket = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/");
    }

    const basket = await client.fetch(BASKET_ITEMS_QUERY, { userId: session?.user.id });

    let basketItems = false;

    if (basket == null)
        basketItems = false;

    else if (basket.items.length > 0)
        basketItems = true;

    return (
        <div className="basketPage">
            <p className="text-xl text-light-gray">Your basket items:</p>

            {basketItems ? (
                <>
                    <BasketClient>
                        <ul className="space-y-5">
                            {basket.items.map((item: any) => (
                                <li className="basketItemCard" key={item.product._id}>
                                    <div className="w-9/10 grid grid-cols-3">
                                        <img src={item.product.images[0].asset.url} alt={item.product.name} className="rounded-sm max-h-40" />
                                        <p className="my-auto text-lg">{item.product.name}</p>
                                        <div className="my-auto grid grid-cols-2">
                                            <div>
                                                <p>Price per item:</p>
                                                <p>Quantity:</p>
                                            </div>
                                            <div className="space-y-2 text-center">
                                                <p>{item.price} €</p>
                                                <BasketItemQuantity prevQuantity={item.quantity} stock={item.product.stock} slug={item.product.slug.current} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="removeBasketItemParent">
                                        <RemoveBasketItemButton slug={item.product.slug.current} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div className="text-lg bg-shaddy-blue p-2 rounded-md">
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    <span>Total price:</span>
                                    <TotalBasketPrice totalPrice={basket.items
                                        .reduce((total: number, item: any) => total + item.price * item.quantity, 0)
                                        .toFixed(2)}
                                    />
                                </div>

                                <Form action={makeOrder}>
                                    <button className="button" data-testid="checkout">
                                        Proceed with payment
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </BasketClient>
                </>
            ) :
                <p className="text-light-gray">Your basket is empty.</p>
            }
        </div>
    )
}
export default Basket;