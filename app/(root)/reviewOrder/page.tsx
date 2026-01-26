// Server action za plačilo naročila
import { payOrder } from "@/app/actions/basket";
// Avtentikacija uporabnika
import { auth } from "@/auth";
// Sanity client
import { client } from "@/sanity/lib/client";
// GROQ queryji
import { ORDER_BY_ID_QUERY, PENDING_ORDER_QUERY } from "@/sanity/lib/queries";
// Ikona za gumb "Pay"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Next.js server-side forma
import Form from "next/form";

// Server-side redirect
import { redirect } from "next/navigation";

// Server Component – pregled in plačilo naročila
const reviewOrder = async ({ searchParams }: {
    searchParams: Promise<{ orderId?: string }> }) => {
    // Preverimo prijavo uporabnika
    const session = await auth();
    
    if (!session || !session.user) {
        redirect("/");
    }

    // Order ID iz query parametrov
    const { orderId } = await searchParams;
    let order;

    // Če orderId NI podan → vzamemo pending order
    if (!orderId)
        order = await client.fetch(PENDING_ORDER_QUERY, { userId: session?.user.id });
    else
        // Če je orderId podan → naložimo točno določen order
        order = await client.fetch(ORDER_BY_ID_QUERY, { userId: session?.user.id, orderId });

    // Če je orderId podan → naložimo točno določen order
    if (!order)
        redirect("/basket");

    return (
        <div className="basketPage">
            <p className="text-xl text-light-gray">Review and pay your order:</p>
            {/* Pregled postavk */}
            <div className="bg-shaddy-blue p-2 rounded-md">
                <div className="grid grid-cols-3">
                    {/* Ime izdelka */}
                    <div>
                        <p className="text-center text-lg">Item</p>
                        <hr />
                        <ul className="m-2 text-center">
                            {
                                order.items.map((item: any) => (
                                    <li key={item.product._id}>
                                        {item.product.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    
                    {/* Količina */}
                    <div>
                        <p className="text-center text-lg">Quantity</p>
                        <hr />
                        <ul className="m-2 text-center">
                            {
                                order.items.map((item: any) => (
                                    <li key={item.product._id}>
                                        x {item.quantity}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    
                    {/* Cena na kos */}
                    <div>
                        <p className="text-center text-lg">Price per item</p>
                        <hr />
                        <ul className="m-2 text-center">
                            {
                                order.items.map((item: any) => (
                                    <li key={item.product._id}>
                                        {item.price} €
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <hr className="text-light-gray" />

            {/* Skupna cena + plačilo */}
            <div className="flex justify-between items-center">
                <div className="text-xl text-light-gray">
                    Total price: {order.total.toFixed(2)} €
                </div>

                <Form action={payOrder}>
                    <button className="button bg-green-400!" data-testid="pay">
                        Pay
                        <FontAwesomeIcon className="ml-1" icon={faCheckCircle} />
                    </button>
                </Form>
            </div>
        </div>
    )
}
export default reviewOrder;