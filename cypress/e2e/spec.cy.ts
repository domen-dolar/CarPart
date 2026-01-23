describe('template spec', () => {
  
it('test', function() {
  cy.visit('localhost:3000')
  
  cy.get('span.button').click();
  cy.get('[name="identifier"]').click();
  cy.get('[name="identifier"]').type('test');
  cy.get('[name="password"]').click();
  cy.get('[name="password"]').type('test');
  cy.get('button.disabled\\:cursor-not-allowed').click();
  cy.get('[name="sort"]').select('name_desc');
  cy.get('a[href="/product/wiper-blade"]').click();
  cy.get('div.swiper-button-next').click();
  cy.get('div.swiper-button-next').click();
  cy.get('div.swiper-button-prev').click();
  cy.get('svg.fa-angle-up').click();
  cy.get('svg.fa-angle-up').click();
  cy.get('svg.fa-angle-down').click();
  cy.get('button.disabled\\:cursor-not-allowed\\!').click();
  cy.get('img[alt="logo"]').click();
  cy.get('a[href="/product/air-filter"]').click();
  cy.get('button.disabled\\:cursor-not-allowed\\!').click();
  cy.get('a[href="/basket"]').click();
  cy.get('.justify-between > form > .button').click();
  cy.get('.basketPage > .flex > form > .button').click();
  cy.get('.gap-5 > form > .button').click();
  })
});