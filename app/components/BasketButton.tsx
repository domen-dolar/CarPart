import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BasketButton = ({ basketFill }: {basketFill: boolean}) => {
    let basketStyle: string;

    basketFill ? basketStyle = "ml-1 text-red-500" : basketStyle = "ml-1";

    return (
        <Link className="button" href="/basket" data-testid="basket-button" data-filled={basketFill}>
            Basket
            <FontAwesomeIcon className={basketStyle} icon={faBasketShopping} />
        </Link>
    )
}
export default BasketButton;