describe('login', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.get('.MuiFormControl-root').type('admin@mail.com');
    cy.get('.MuiInputBase-adornedEnd > .MuiInputBase-input').type('admin');
    cy.get('form').submit();
  });
  it('acceder a manage-schedule', () => {
    cy.wait(10000);
    cy.get('.DaysOfWeek_selectedDay__DBfmv').click();
  });
});
