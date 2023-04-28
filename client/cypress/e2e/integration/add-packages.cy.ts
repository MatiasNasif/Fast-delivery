describe('addPackages', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.loginAsAdmin();
    cy.wait(5000);
    cy.visit('/views/add-package');
  });

  it('Validaciones, no permite enviar formulario', () => {
    cy.wait(3000);
    cy.get('.ButtonApp_container_button__B8xkG > .MuiButtonBase-root').click();
    cy.contains('La dirección es requerida').should('be.visible');
    cy.wait(1000);
    cy.contains('Nombre de quien recibe requerido').should('be.visible');
    cy.wait(1000);
    cy.contains('Peso requerido').should('be.visible');
    cy.wait(1000);
    cy.contains('Falta la fecha pa').should('be.visible');
  });

  it('Error al crear paquete', () => {
    cy.wait(3000);
    cy.get('form > :nth-child(4)').type('Rivadavia 4100');
    cy.get('form > :nth-child(6)').type('5');
    cy.get('.input-wrapper > input').click();
    cy.get('.input-wrapper > input').type('2023-04-28');
    cy.get('.MuiContainer-root > form').submit();
    cy.wait(2000);
  });

  it('Paquete creado', () => {
    cy.wait(3000);
    cy.get('form > :nth-child(4)').type('Rivadavia 4100');
    cy.get('form > :nth-child(5)').type('Marta Fernandez');
    cy.get('form > :nth-child(6)').type('3');
    cy.get('.input-wrapper > input').click();
    cy.get('.input-wrapper > input').type('2023-04-29');
    cy.get('.MuiContainer-root > form').submit();
  });
});
