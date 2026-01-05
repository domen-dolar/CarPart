import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { ORDERS_QUERY } from "@/sanity/lib/queries";
import { faCheck, faCircle, faHourglass2 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";
import { redirect } from "next/navigation";

const Orders = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/");
    }

    const orders = await client.fetch(ORDERS_QUERY, { userId: session?.user.id });

    let ordersExist = false;

    if (orders == null)
        ordersExist = false;

    else if (orders.length > 0)
        ordersExist = true;

    return (
        <div className="basketPage">
            <p className="text-xl text-light-gray">Your orders:</p>

            {ordersExist ? (
                <>
                    <ul className="space-y-5">
                        {orders.map((order: any) => (
                            <li className="basketItemCard" key={order._id}>
                                <div className="grid grid-cols-2 w-full">
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
                                        <p className="text-lg">Order created at: {new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="orderPaymentDetails">
                                            <div>
                                                <span>Payment status: </span>
                                                {order.status == "pending" ? 
                                                    <>
                                                        <span className="pendingOrderIndicator">
                                                            {order.status}
                                                            <FontAwesomeIcon className="ml-1" icon={faHourglass2} />
                                                        </span>
                                                        <div className="mt-2">Price: {order.total}€</div>
                                                    </> :
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
                                        <div className="flex items-center justify-center">
                                            {order.status == "pending" &&
                                                <Form action="/reviewOrder">
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
            ) :
                <p className="text-light-gray">You haven't ordered anything yet.</p>
            }
        </div>
    )
}
export default Orders;