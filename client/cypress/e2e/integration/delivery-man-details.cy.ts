describe('delivery man details', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.loginAsAdmin();
    cy.get(':nth-child(1) > .Schedule_boxBtn__y_KLa').click();
    cy.wait(5000);
    cy.get(':nth-child(2) > a').should('be.visible');
    cy.get(':nth-child(2) > a').click();
  });

  it('pasar inactivo a un usuario', () => {
    cy.wait(5000);
    cy.contains('Activo', { failOnStatusCode: false }).should('be.visible');
    cy.get('.DeliveryManDetails_slider__m6Tci').click();
  });

  it('pasar activo a un usuario', () => {
    cy.wait(5000);
    cy.contains('Inactivo', { failOnStatusCode: false }).should('be.visible');
    cy.get('.DeliveryManDetails_slider__m6Tci').click();
  });
});
