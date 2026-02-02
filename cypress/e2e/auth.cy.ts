describe('Auth', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('user can login and logout', () => {
    cy.visit('/')

    cy.get('[data-testid="login-button"]').click()

    cy.get('[data-testid="login-identifier"]').type('test')
    cy.get('[data-testid="login-password"]').type('test')

    cy.get('[data-testid="submit-login"]').click()

    cy.wait(3000)

    cy.contains('Welcome').should('exist')

    cy.get('[data-testid="logout-button"]').click()

    cy.get('[data-testid="login-button"]').should('exist')
  })
})

