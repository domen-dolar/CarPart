// Sanity live fetch (ISR + live preview)
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// GROQ query za izdelke
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
// Komponenta za iskanje in sortiranje
import SearchOrFilter from "../components/SearchOrFilter";
// Kartica posameznega izdelka
import ProductCard from "../components/ProductCard";

// Server Component – Home page
export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string; sort?: string }>;
}) {
  // Query parametri iz URL-ja
  const { query, sort } = await searchParams;
  // Parametri za Sanity query
  const params = {search: query || null };

  // Mapa dovoljenih sort opcij (whitelist)
  const ORDER_MAP: Record<string, string> = {
    name: "name asc",
    name_desc: "name desc",
    price_asc: "price asc",
    price_desc: "price desc",
  }

  // Izberemo sort ali fallback
  const orderClause = ORDER_MAP[sort as string] ?? "name asc"

  // Fetch produktov iz Sanity (live + caching)
  const { data : products } = await sanityFetch({ query: PRODUCTS_QUERY(orderClause), params });

  return (
    <div className="mainContent">
      {/* Heading */}
      <div className="heading">
        Welcome to CarPart, your top online shop for car parts all just for you!
      </div>

      {/* Iskanje + sortiranje */}
      <SearchOrFilter query={query} sort={sort} />

      {/* Grid produktov */}
      <ul className="grid grid-cols-2 gap-5">
        {products?.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))) : <p>No products available.</p>
        }
      </ul>
      
      {/* Live Sanity preview (dev/editor) */}
      <SanityLive />
    </div>
  );
}
