describe('Prueba de vista start-workday', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.wait(5000);
    cy.loginAsDeliveryMan();
  });

  xit('muestra la lista de paquetes pendientes y el botón de "Obtener paquetes"', () => {
    cy.get('[data-testid="container-view"]').should('be.visible');

    cy.get(':nth-child(3) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-content')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.get(':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-content')
      .should('be.visible')
      .should('not.be.disabled')
      .click();
  });

  xit('al clickear el botón "Obtener paquetes", debe acceder a get-packages', () => {
    cy.wait(2000);
    cy.get('.ButtonApp_container_button__B8xkG > .MuiButtonBase-root').click();
    cy.url().should('include', '/views/get-packages');
  });

  xit('muestra un mensaje si no hay paquetes pendientes', () => {
    cy.get(
      ':nth-child(3) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-content'
    ).click();
    cy.contains('No tenés repartos pendientes');
  });

  xit('muestra un mensaje si no nada en el historial de repartos', () => {
    cy.get(
      ':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-content'
    ).click();
    cy.contains('Nada en el historial de repartos');
  });

  it('elimina correctamente un paquete cuando el usuario presiona el botón ícono de borrar', () => {
    cy.get(':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-content')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    if (cy.get('[data-testid="card-package"]')) {
      cy.get('[data-testid="DeleteForeverIcon"] > path:first').click();
      cy.contains('Paquete eliminado correctamente').should('be.visible');
    } else {
      cy.get(':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-content')
        .click()
        .then(() => {
          cy.contains('Nada en el historial de repartos').should('be.visible');
        });
    }
  });
});
