describe('Basket', () => {
  beforeEach(() => {
    cy.session('user', () => cy.login())
  })

  it('shows basket items', () => {
    cy.visit('/basket')
    cy.contains('Basket').should('exist')
  })
})
