/*
  Komponenta gumba za košarico.
  Prikazuje ikono košarice in vizualno nakaže,
  ali košarica vsebuje izdelke.
*/

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

/*
  Props:
  - basketFill: boolean
    true  → košarica ni prazna
    false → košarica je prazna
*/

const BasketButton = ({ basketFill }: {basketFill: boolean}) => {
    // CSS razred za ikono (obarvamo, če košarica ni prazna)
    let basketStyle: string;

    basketFill ? basketStyle = "ml-1 text-red-500" : basketStyle = "ml-1";

    return (
        /*
      Link deluje kot gumb in vodi na stran košarice.
      data-filled atribut se lahko uporabi za testiranje ali stiliranje.
    */
        <Link className="button" href="/basket" data-testid="basket-button" data-filled={basketFill}>
            Basket
            <FontAwesomeIcon className={basketStyle} icon={faBasketShopping} />
        </Link>
    )
}
export default BasketButton;