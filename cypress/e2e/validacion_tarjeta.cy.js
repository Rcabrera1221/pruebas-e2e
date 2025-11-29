describe('4', {retries: 2}, () => {
  
  beforeEach(() => {
    cy.session('andre-session', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('andre2002@gmail.com');
      cy.get('#password').type('Andre100');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
    });
  });

  it('BUG - Sistema acepta tarjeta con fecha expirada', () => {
    cy.visit('http://localhost:4200/');
    cy.get('#destino').clear();
    cy.get('#destino').type('Lima');
    cy.get('#check-in').type('2025-12-20');
    cy.get('#check-out').type('2025-12-22');
    cy.contains('button', 'Mostrar hoteles').click();
    
    cy.contains('Hotel La Hacienda').should('be.visible');
    cy.contains('button', 'Ver detalles').first().click();
    cy.url().should('include', '/hoteles/detalle');
    cy.wait(1000);
    
    cy.contains('Familiar Room').should('be.visible');
    cy.contains('Familiar Room').parent().parent().within(() => {
      cy.get('.quantity-controls').within(() => {
        cy.get('button').contains('+').click();
      });
    });
    
    cy.get('.final-reserve-button').click();
    cy.wait(1000);
    
    cy.get('.btn-pay').click();
    cy.wait(1000);
    
    // Llenar datos con TARJETA EXPIRADA (enero 2020)
    cy.get('input[name="nombreTitular"]').type('Fernando Cabrera');
    cy.get('input[name="numeroTarjeta"]').type('4532123456789012');
    cy.get('input[name="fechaExpiracion"]').type('2020-01');
    cy.get('input[name="cvc"]').type('123');
    
    cy.get('.modal-actions').within(() => {
      cy.get('.btn-primary').click();
    });
    
    // BUG: El sistema acepta la reserva con tarjeta expirada
    cy.contains('Reserva confirmada', { timeout: 10000 }).should('be.visible');
  });

});