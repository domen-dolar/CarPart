describe('Order flow', () => {
  beforeEach(() => {
    cy.session('user', () => cy.login())
  })

  it('user can place an order', () => {
    cy.visit('/product/air-filter')
    cy.get('[data-testid="add-to-basket"]').click()
    cy.visit('/basket')
    cy.get('[data-testid="checkout"]').click()
    cy.get('[data-testid="pay"]').click()
  })
})
