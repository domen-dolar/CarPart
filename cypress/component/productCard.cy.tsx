import ProductCard from "@/app/components/ProductCard";

const mockProduct = {
  name: "Brake Pad",
  price: 49.99,
  slug: { current: "brake-pad" },
  category: { name: "Brakes" },
  images: [
    {
      asset: {
        url: "https://example.com/brake.jpg",
      },
    },
  ],
};


describe("ProductCard", () => {
  it("renders product name, category and price", () => {
    cy.mount(<ProductCard product={mockProduct} />);

    cy.contains("Brake Pad").should("be.visible");
    cy.contains("Category: Brakes").should("be.visible");
    cy.contains("Price: 49.99 €").should("be.visible");
  });
});
