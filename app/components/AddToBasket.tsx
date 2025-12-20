"use client"

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";
import { useState } from "react";

const AddtoBasket = ({ product }: { product: any }) => {
    const [quantity, changeQuantity] = useState(1);

    return (
        <Form
            action="#"
            className="addProductToBasketForm"
        >
            <input type="text" name="product" value={product.slug.current} readOnly hidden />

            <label htmlFor="quantity" className="text-center">Quantity:</label>
            <div className="bg-white rounded-md">
                <button
                    type="button"
                    onClick={() => changeQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="button changeProductQuantityButton"
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-10 outline-none text-center"
                />
                <button
                    type="button"
                    onClick={() => changeQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="button changeProductQuantityButton"
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>

            <button className="button">Add to basket</button>
        </Form>
    )
}
export default AddtoBasket;