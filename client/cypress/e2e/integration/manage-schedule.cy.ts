describe('login', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.loginAsAdmin();
    // cy.visit('/views/manage-schedule')
  });

  it('acceder a manage-schedule', () => {
    cy.wait(10000);
    cy.get('.DaysOfWeek_selectedDay__DBfmv').click();
  });
});
