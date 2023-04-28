describe('getPackages', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.wait(3000);
    cy.loginAsDeliveryMan();
    cy.wait(3000);
    cy.visit('/views/get-packages');
  });

  xit('Seleccionar paquetes', () => {
    cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get(':nth-child(4) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get(':nth-child(6) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiContainer-root > :nth-child(3)').submit();
  });

  xit('No hay paquetes', () => {
    cy.get(':nth-child(2) > .MuiTypography-root').should('be.visible');
  });
});
