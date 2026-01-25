import SearchOrFilter from '@/app/components/SearchOrFilter'

describe('SearchOrFilter', () => {
  it('allows typing search query', () => {
    cy.mount(<SearchOrFilter query="" sort="" />)

    cy.get('[data-testid="search-input"]').type('Brake')
    cy.get('[data-testid="search-input"]').should('have.value', 'Brake')
  })

  it('allows selecting sort option', () => {
    cy.mount(<SearchOrFilter query="" sort="" />)

    cy.get('[data-testid="sort-select"]').select('price_desc')
    cy.get('[data-testid="sort-select"]').should('have.value', 'price_desc')
  })
})
