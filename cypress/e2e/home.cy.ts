describe('Home page', () => {
  it('shows products and opens product', () => {
    cy.visit('/')
    cy.get('[data-testid="product-card"]').should('exist')
    cy.get('[data-testid="sort-select"]').select('name_desc')
    cy.get('[data-testid="product-card"]').first().find('[data-testid="product-details-button"]').click()
    cy.url().should('include', '/product/')
  })
})
