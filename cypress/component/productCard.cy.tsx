import ProductCard from '@/app/components/ProductCard'

const product = {
  name: 'Brake Pad',
  price: 49.99,
  slug: { current: 'brake-pad' },
  category: { name: 'Brakes' },
  images: [
    {
      asset: { url: 'https://example.com/brake.jpg' }
    }
  ]
}

describe('ProductCard', () => {
  it('renders product info', () => {
    cy.mount(<ProductCard product={product} />)

    cy.contains('Brake Pad').should('be.visible')
    cy.contains('Category: Brakes').should('be.visible')
    cy.contains('Price: 49.99 €').should('be.visible')
  })

  it('renders product image', () => {
    cy.mount(<ProductCard product={product} />)

    cy.get('img')
      .should('exist')
      .and('have.attr', 'src', product.images[0].asset.url)
  })

  it('links to product detail page', () => {
    cy.mount(<ProductCard product={product} />)

    cy.get('a')
      .should('have.attr', 'href', '/product/brake-pad')
  })
})
