import { payOrder } from "@/app/actions/basket";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { ORDER_BY_ID_QUERY, PENDING_ORDER_QUERY } from "@/sanity/lib/queries";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";
import { redirect } from "next/navigation";

const reviewOrder = async ({ searchParams }: {
    searchParams: Promise<{ orderId?: string }> }) => {
    const session = await auth();
    
    if (!session || !session.user) {
        redirect("/");
    }

    const { orderId } = await searchParams;
    let order;

    if (!orderId)
        order = await client.fetch(PENDING_ORDER_QUERY, { userId: session?.user.id });
    else
        order = await client.fetch(ORDER_BY_ID_QUERY, { userId: session?.user.id, orderId });

    if (!order)
        redirect("/basket");

    return (
        <div className="basketPage">
            <p className="text-xl">Review and pay your order:</p>
            <div className="bg-shaddy-blue p-2 rounded-md">
                <div className="grid grid-cols-3">
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

            <hr />

            <div className="flex justify-between items-center">
                <div className="text-xl">
                    Total price: {order.total.toFixed(2)} €
                </div>

                <Form action={payOrder}>
                    <button className="button bg-green-400!">
                        Pay
                        <FontAwesomeIcon className="ml-1" icon={faCheckCircle} />
                    </button>
                </Form>
            </div>
        </div>
    )
}
export default reviewOrder;