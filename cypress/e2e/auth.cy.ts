describe('Auth', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('user can login and logout', () => {
    cy.visit('/')

    // login brez klikanja gumba
    cy.login()

    cy.contains('Welcome').should('exist')

    cy.get('[data-testid="logout-button"]').click()

    cy.get('[data-testid="login-button"]').should('exist')
  })
})
