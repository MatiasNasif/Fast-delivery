describe('delivery man details', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.loginAsDeliveryMan();
  });

  //   it('seleccionar un paquete', () => {
  //     cy.wait(5000);
  //     cy.get(
  //       ':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ArrowDropDownIcon"]'
  //     ).click();
  //     cy.get(':nth-child(2) > .Card_card_container___WUmL > a').should('be.visible');
  //     cy.get(':nth-child(2) > .Card_card_container___WUmL > a').click();
  //     cy.get('[data-testid="ExpandMoreIcon"]').click();
  //   });

  it('finalizar un paquete, si no esta finalizado', () => {
    cy.wait(5000);
    cy.get(
      ':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ArrowDropDownIcon"]'
    ).click();
    if (Cypress.$('body').find('Nada en el historial de repartos').length > 0) {
      console.log('if');
      cy.contains('Nada en el historial de repartos').should('be.visible');
    } else {
      console.log('else');
      cy.get('.Card_card_container___WUmL').then((cards) => {
        if (cards.length === 0) {
          cy.contains('Nada en el historial de repartos').should('be.visible');
        } else {
          const randomCardIndex = Math.floor(Math.random() * cards.length);
          const randomCard = cards[randomCardIndex];
          cy.wrap(randomCard).find('a').should('be.visible').click();

          cy.get('[data-testid="ExpandMoreIcon"]').click();
          cy.get('.CurrentDistribution_container_button__DG8ew', { timeout: 5000 })
            .invoke('text')
            .then((text) => {
              if (text === 'Finalizar') {
                cy.get(
                  '.CurrentDistribution_container_button__DG8ew > .MuiButtonBase-root'
                ).click();
                cy.get(
                  ':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ArrowDropDownIcon"]'
                ).click();
              } else if (text === 'Finalizado') {
                setTimeout(() => {
                  cy.get('.CurrentDistribution_container_button__DG8ew').should('exist');
                });
              }
            });
        }
      });
    }
  });
});

// cy.contains('Nada en el historial de repartos').should('be.visible');
// cy.get(
//   ':nth-child(4) > .MuiPaper-root > #panel1a-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ArrowDropDownIcon"]'
// ).click();
