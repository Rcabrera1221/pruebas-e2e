describe('Validación de tarjeta expirada en Tours', {retries: 2}, () => {
  
  beforeEach(() => {
    cy.session('andre-session', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('andre2002@gmail.com');
      cy.get('#password').type('Andre100');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
    });
  });

  it('BUG - Sistema acepta tarjeta expirada en reserva de tours', () => {
    // PASO 1: Click en "Encontrar Tour"
    cy.visit('http://localhost:4200/');
    cy.contains('Encontrar Tour').click();
    cy.url().should('include', '/tour');
    
    // PASO 2: Llenar campos de búsqueda
    cy.get('#destino-tour').clear();
    cy.get('#destino-tour').type('South Imaport');
    
    cy.get('#categoria-tour').select('Aventura');
    
    cy.get('#check-in').clear();
    cy.get('#check-in').type('2025-11-28');
    
    cy.get('#check-out').clear();
    cy.get('#check-out').type('2025-11-30');
    
    // PASO 3: Click en "Mostrar tours"
    cy.contains('button', 'Mostrar tours').click();
    cy.wait(2000);
    
    // PASO 4: Click en "Ver detalles" del primer tour
    cy.get('.btn-ver-detalles').first().click();
    cy.url().should('include', '/tour/detalle');
    cy.wait(1000);
    
    // PASO 5: Click en el cuadrado de fecha (salida-card selected)
    cy.get('.salida-card').first().click();
    cy.wait(500);
    
    // PASO 6: Click en "Continuar con la reserva"
    cy.get('.final-reserve-button').click();
    cy.wait(1000);
    
    // PASO 7: Click en "Confirmar y pagar"
    cy.get('.btn-pay').click();
    cy.wait(1000);
    
    // PASO 8: Llenar datos de tarjeta CON FECHA EXPIRADA
    cy.get('input[name="numeroTarjeta"]').type('7889898989898998');
    
    // Fecha expirada - abril 2005
    cy.get('input[name="fechaExpiracion"]').type('2005-04');
    
    cy.get('input[name="cvc"]').type('123');
    
    cy.get('input[name="nombreTitular"]').type('fernando perez');
    
    // PASO 9: Confirmar pago (DEBERÍA RECHAZAR pero acepta - BUG)
    cy.get('.modal-actions').within(() => {
      cy.contains('button', 'Confirmar pago').click();
    });
    
    // PASO 10: BUG - El sistema acepta la reserva con tarjeta expirada
    cy.contains('¡Reserva confirmada!', { timeout: 10000 }).should('be.visible');
  });

});