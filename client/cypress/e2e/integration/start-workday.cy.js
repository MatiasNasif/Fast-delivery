describe('Prueba de vista de deliveryMan', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.loginAsDeliveryMan();
    cy.visit('views/start-workday');
  });

  it('acceder a lista de pedidos', () => {
    cy.wait(10000);
    // cy.get('.DaysOfWeek_selectedDay__DBfmv').click();
  });
  // it('acceder a get-packages', () => {
  //   cy.wait(10000);
  //   cy.get(
  //     '.MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-fullWidth ButtonApp_button__Va3uE css-1evprfk-MuiButtonBase-root-MuiButton-rootv'
  //   ).click();
  // });
});
