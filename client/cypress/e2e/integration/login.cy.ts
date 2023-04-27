describe('login', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
  });
  it('admin mal logueado', () => {
    cy.visit('/');
    cy.get('.MuiFormControl-root').type('admin@mail.com.ar');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });
  it('admin bien logueado', () => {
    cy.visit('/');
    cy.get('.MuiFormControl-root').type('admin@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });
});
