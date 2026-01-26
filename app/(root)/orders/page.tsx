// Avtentikacija uporabnika (server-side)
import { auth } from "@/auth";
// Sanity client za branje naročil
import { client } from "@/sanity/lib/client";
// GROQ query za uporabnikova naročila
import { ORDERS_QUERY } from "@/sanity/lib/queries";
// Ikone za status naročila
import { faCheck, faCircle, faHourglass2 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Next.js server-side forma
import Form from "next/form";
// Server-side redirect
import { redirect } from "next/navigation";

// Server Component – prikaz naročil
const Orders = async () => {
    // Pridobimo sejo
    const session = await auth();

    // Če uporabnik ni prijavljen → redirect
    if (!session || !session.user) {
        redirect("/");
    }

    // Pridobimo naročila iz Sanity CMS
    const orders = await client.fetch(ORDERS_QUERY, { userId: session?.user.id });

    // Boolean za preverjanje obstoja naročil
    let ordersExist = false;

    if (orders == null)
        ordersExist = false;

    else if (orders.length > 0)
        ordersExist = true;

    return (
        <div className="basketPage">
            <p className="text-xl text-light-gray">Your orders:</p>
            {/* Če naročila obstajajo */}
            {ordersExist ? (
                <>
                    <ul className="space-y-5">
                        {/* Iteracija čez naročila */}
                        {orders.map((order: any) => (
                            <li className="basketItemCard" key={order._id}>
                                <div className="grid grid-cols-2 w-full">
                                    {/* LEVA STRAN – izdelki */}
                                    <div>
                                        <p className="text-lg">Order items:</p>
                                        <ul className="mb-5">
                                            {order.items.map((item: any) => (
                                                <li className="grid grid-cols-2" key={item.product._id}>
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon className="text-[0.4em] mr-1" icon={faCircle} />
                                                        {item.product.name}
                                                    </div>
                                                    <div>
                                                        x {item.quantity}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* Datum ustvarjanja naročila */}
                                        <p className="text-lg">Order created at: {new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    {/* DESNA STRAN – status in plačilo */}
                                    <div className="grid grid-cols-2">
                                        {/* Podrobnosti plačila */}
                                        <div className="orderPaymentDetails">
                                            <div>
                                                <span>Payment status: </span>
                                                {/* ČAKA NA PLAČILO */}
                                                {order.status == "pending" ? 
                                                    <>
                                                        <span className="pendingOrderIndicator">
                                                            {order.status}
                                                            <FontAwesomeIcon className="ml-1" icon={faHourglass2} />
                                                        </span>
                                                        <div className="mt-2">Price: {order.total}€</div>
                                                    </> : /* PLAČANO */
                                                    <>
                                                        <span className="paidOrderIndicator">
                                                            {order.status}
                                                            <FontAwesomeIcon className="ml-1" icon={faCheck} />
                                                        </span>
                                                        <div>Price: {order.total.toFixed(2)}€</div>
                                                        <div>Paid at: {new Date(order.paidAt).toLocaleString()}</div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        {/* Akcija za pending naročilo */}
                                        <div className="flex items-center justify-center">
                                            {order.status == "pending" &&
                                                <Form action="/reviewOrder">
                                                    {/* Order ID se pošlje kot hidden field */}
                                                    <input type="text" name="orderId" value={order._id} readOnly hidden />
                                                    <button className="button">
                                                        Review & Pay
                                                    </button>
                                                </Form>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : // Če naročil ni
                <p className="text-light-gray">You haven't ordered anything yet.</p>
            }
        </div>
    )
}
export default Orders;