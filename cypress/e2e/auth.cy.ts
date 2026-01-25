describe('Auth', () => {
  it('user can login and logout', () => {
    cy.visit('/')
    cy.get('[data-testid="login-button"]').click()
    cy.login()
    cy.get('[data-testid="logout-button"]').click()
    cy.contains('Login').should('exist')
  })
})
