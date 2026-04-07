import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("user").title("Users"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("carModel").title("Car Models"),
      S.documentTypeListItem("order").title("Orders"),
      S.documentTypeListItem("orderItem").title("Order items"),
      S.documentTypeListItem("basket").title("Baskets"),
    ])