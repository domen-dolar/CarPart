import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = (orderClause: string) => defineQuery(`
  *[
    _type == "product" &&
    isActive == true &&
    (
      !defined($search) ||
      name match "*" + $search + "*" ||
      category->name match "*" + $search + "*"
    )
  ]
  | order(${orderClause}) {
    _id,
    name,
    slug,
    sku,
    price,
    stock,
    description,

    "category": category->{
      _id,
      name,
      slug
    },

    "compatibleCars": compatibleCars[]->{
      _id,
      make,
      model,
      yearFrom,
      yearTo
    },

    "images": images[]{
      asset->{
        _id,
        url
      }
    }
  }
`);
