"use client";

/*
  Client wrapper komponenta za košarico.
  Uporablja React useTransition za:
  - globalni "pending" state
  - mehke (non-blocking) UI posodobitve
  - boljši UX pri asinhronih akcijah (npr. sprememba količine)
*/

import { useTransition } from "react";
import { BasketTransitionContext } from "./BasketTransitionContext";

/*
  Props:
  - children: vse komponente, ki potrebujejo dostop
    do transition stanja (isPending, startTransition)
*/

const BasketClient = ({ children }: { children: React.ReactNode }) => {
    // React concurrent state za tranzicije
    const [isPending, startTransition] = useTransition();

    return (
        /*
      Context Provider:
      - isPending → ali je tranzicija v teku
      - startTransition → funkcija za zagon tranzicije
    */
        <BasketTransitionContext.Provider
        value={{ isPending, startTransition }}
        >
        {children}
        </BasketTransitionContext.Provider>
    )
}
export default BasketClient;