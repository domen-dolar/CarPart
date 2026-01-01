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
    price,


    "category": category->{
      _id,
      name,
      slug
    },

    "images": images[]{
      asset->{
        _id,
        url
      }
    }
  }
`);

export const PRODUCT_BY_SLUG_QUERY =  defineQuery(`
  *[
    _type == "product" &&
    slug.current == $slug
  ][0] {
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

export const BASKET_ITEMS_QUERY = defineQuery(`
  *[_type == "basket" && user._ref == $userId][0]{
    _id,
    items[]{
      quantity,
      price,
      product->{
        _id,
        name,
        slug,
        stock,
        images[]{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`);

export const PENDING_ORDER_QUERY = defineQuery(`
  *[
    _type == "order" &&
    status == "pending" &&
    user._ref == $userId
  ]
  | order(createdAt desc)[0]{
    _id,
    createdAt,
    total,
    status,

    items[]{
      _key,
      quantity,
      price,
      product->{
        _id,
        name,
        slug,
        images[]{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`);

export const ORDER_BY_ID_QUERY = defineQuery(`
  *[
    _type == "order" &&
    status == "pending" &&
    user._ref == $userId &&
    _id == $orderId
  ]
  | order(createdAt desc)[0]{
    createdAt,
    total,
    status,

    items[]{
      _key,
      quantity,
      price,
      product->{
        _id,
        name,
        slug,
        images[]{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`);

export const ORDERS_QUERY = defineQuery(`
  *[
    _type == "order" &&
    user._ref == $userId
  ]
  | order(createdAt desc){
    _id,
    createdAt,
    paidAt,
    total,
    status,

    items[]{
      _key,
      quantity,
      price,
      product->{
        _id,
        name,
        slug,
        images[]{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`);