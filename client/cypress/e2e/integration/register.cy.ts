describe('register', () => {
  const faker = require('faker');
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.visit('views/register');
  });
  it('tiene validaciónes', () => {
    cy.get('.MuiButton-root').click();
    cy.contains('Nombre y Apellido Requeridos').should('be.visible');
    cy.contains('Email Requerido').should('be.visible');
    cy.contains('Contraseña Requerida').should('be.visible');
  });
  it('registro fallido', () => {
    cy.get('.css-lszmvr-MuiFormControl-root-MuiTextField-root').type('Fabian');
    cy.get('.MuiFormControl-marginNormal').type('fabi@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('fabi');
    cy.get('form').submit();
    cy.contains('Usuario existente').should('be.visible');
    cy.wait(1000);
    cy.get(
      ':nth-child(1) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > .go703367398'
    ).click();
  });
  it('registro exitoso', () => {
    cy.visit('views/register');
    const email = faker.internet.email();
    const password = 'TestPassword123!';
    const name = faker.name.findName();
    cy.get('.css-lszmvr-MuiFormControl-root-MuiTextField-root').type(name);
    cy.get('.MuiFormControl-marginNormal').type(email);
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type(password);
    cy.get('form').submit();
    cy.contains('Usuario creado').should('be.visible');
  });

  it('Vuelve al inicio', () => {
    cy.get('.MuiTypography-root').click();
  });
});
