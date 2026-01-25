describe('Home page product cards', () => {
  it('shows product cards with correct info and opens details', () => {
    cy.visit('/')

    cy.get('[data-testid="product-card"]').should('exist')

    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="product-name"]').should('exist')
      cy.get('[data-testid="product-image"]').should('exist')
      cy.get('[data-testid="product-category"]').should('exist')
      cy.get('[data-testid="product-price"]').should('exist')

      // klik na details link
      cy.get('[data-testid="product-details-button"]').click()
    })

    cy.url().should('include', '/product/')
  })
})
