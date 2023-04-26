describe('login', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
  });
  it('usuario mal logueado', () => {
    cy.visit('/');
    cy.get('.MuiFormControl-root').type('admin@mail.com.ar');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });
  it('usuario bien logueado', () => {
    cy.visit('/');
    cy.get('.MuiFormControl-root').type('admin@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });
});
