describe('SwornStatement', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.wait(5000);
    cy.loginAsDeliveryMan();
  });

  it('No debe permitir enviar el formulario si no se completan todos los campos', () => {
    cy.wait(10000);
    cy.get('[data-testid="si-button"]').click();
    cy.get('input[type="checkbox"]').check();
    cy.get('[type="submit"]').click();
    cy.contains('Tiene que completar todos los campos').should('be.visible');
    cy.url().should('include', '/views/start-workday');
  });

  it('Debe permitir enviar el formulario si se completan todos los campos', () => {
    cy.wait(10000);
    cy.get('[data-testid="si-button"]').click({ multiple: true });
    cy.get('input[type="checkbox"]').check();
    cy.get('[type="submit"]').click();
    cy.contains('El formulario se creó correctamente').should('be.visible');
    cy.url().should('include', '/views/start-workday');
  });

});
