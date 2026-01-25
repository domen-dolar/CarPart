import BasketButton from '@/app/components/BasketButton'

describe('BasketButton', () => {
  it('renders basket button', () => {
    cy.mount(<BasketButton basketFill={false} />)

    cy.get('[data-testid="basket-button"]').should('exist')
    cy.contains('Basket').should('be.visible')
  })

  it('shows empty basket state', () => {
    cy.mount(<BasketButton basketFill={false} />)

    cy.get('[data-testid="basket-button"]')
      .should('have.attr', 'data-filled', 'false')
  })

  it('shows filled basket state', () => {
    cy.mount(<BasketButton basketFill={true} />)

    cy.get('[data-testid="basket-button"]')
      .should('have.attr', 'data-filled', 'true')
  })
})
