import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import SearchOrFilter from "../components/SearchOrFilter";
import ProductCard from "../components/ProductCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string; sort?: string }>;
}) {
  const { query, sort } = await searchParams;
  const params = {search: query || null };

  const ORDER_MAP: Record<string, string> = {
    name: "name asc",
    name_desc: "name desc",
    price_asc: "price asc",
    price_desc: "price desc",
  }

  const orderClause = ORDER_MAP[sort as string] ?? "name asc"

  const { data : products } = await sanityFetch({ query: PRODUCTS_QUERY(orderClause), params });

  return (
    <div className="mainContent">
      <div className="heading">
        Welcome to CarPart, your top online shop for car parts all just for you!
      </div>

      <SearchOrFilter query={query} sort={sort} />

      <ul className="grid grid-cols-2 gap-5">
        {products?.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))) : <p>No products available.</p>
        }
      </ul>
      
      <SanityLive />
    </div>
  );
}
