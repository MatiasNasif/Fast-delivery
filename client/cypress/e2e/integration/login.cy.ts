describe('login', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.visit('/');
  });

  it('tiene validaciónes', () => {
    cy.get('.MuiButton-root').click();
    cy.contains('Email Requerido').should('be.visible');
    cy.contains('Contraseña Requerida').should('be.visible');
  });
  it('admin mal logueado', () => {
    cy.get('.MuiFormControl-root').type('admin@mail.com.ar');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });

  it('admin bien logueado', () => {
    cy.get('.MuiFormControl-root').type('admin@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });

  it('user mal logueado con email erroneo', () => {
    cy.get('.MuiFormControl-root').type('fabi@mail.com3');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('fabi');
    cy.get('form').submit();
    cy.contains('Usuario incorrecto o no existente').should('be.visible');
    cy.get('.go703367398 > .MuiButtonBase-root').click();

    cy.wait(2000);
  });
  it('user mal logueado con contraseña erronea', () => {
    cy.get('.MuiFormControl-root').type('fabi@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('fabi3');
    cy.get('form').submit();
    cy.contains('Contraseña incorrecta').should('be.visible');
    cy.get('.go703367398 > .MuiButtonBase-root').click();
    cy.wait(2000);
  });
  it('debe ir al registro', () => {
    cy.get('.MuiTypography-root').click();
  });
  it('user bien logueado', () => {
    cy.get('.MuiFormControl-root').type('fabi@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('fabi');
    cy.get('form').submit();
  });
});
