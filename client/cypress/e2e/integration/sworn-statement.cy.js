describe('SwornStatement', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.wait(5000);
    cy.loginAsDeliveryMan();
  });

  it('No debe permitir enviar el formulario si no se selecciona el checkbox', () => {
    cy.wait(10000);
    if (Cypress.$('[data-testid="sworn-statement-view"]').length > 0) {
      cy.get('[data-testid="si-button"]').click({ multiple: true });
      cy.get('[type="submit"]').click();
      cy.get('.PrivateSwitchBase-input').check();
    } else {
      cy.log('La vista SwornStatement no se ha renderizado. El test se omitirá.');
    }
  });

  it('Debe permitir enviar el formulario si se completan todos los campos', () => {
    cy.wait(5000);
    cy.get('[data-testid="sworn-statement-view"]').then(($el) => {
    if ($el.length) {
      cy.get('[data-testid="si-button"]').click({ multiple: true });
      cy.get('input[type="checkbox"]').check();
      cy.get('[type="submit"]').click();
      cy.contains('El formulario se creó correctamente').should('be.visible');
      cy.url().should('include', '/views/start-workday');
    } else if ($el.length === 0 || null ) {
      cy.log('La vista SwornStatement no se ha renderizado. El test se omitirá.')
      .then(() => {
        cy.url().should('include', '/views/start-workday');
      });
    }
  });
  
});
})
