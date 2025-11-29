describe('Crear reserva y verificar en Mis Reservas', {retries: 2}, () => {
  
  beforeEach(() => {
    cy.session('andre-session', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('andre2002@gmail.com');
      cy.get('#password').type('Andre100');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
    });
  });

  it('Debe crear una reserva completa y verificarla en Mis Reservas', () => {
    // PASO 1: Buscar hotel
    cy.visit('http://localhost:4200/');
    cy.get('#destino').clear();
    cy.get('#destino').type('Lima');
    cy.get('#check-in').type('2025-12-15');
    cy.get('#check-out').type('2025-12-17');
    cy.contains('button', 'Mostrar hoteles').click();
    
    // PASO 2: Ver detalles del hotel
    cy.contains('Hotel La Hacienda').should('be.visible');
    cy.contains('button', 'Ver detalles').first().click();
    cy.url().should('include', '/hoteles/detalle');
    cy.wait(1000);
    
    // PASO 3: Seleccionar habitación (cambiar por la que tenga disponibilidad)
    // Opciones: 'Simple Room', 'Familiar Room', 'Suite Room'
    cy.contains('Simple Room').should('be.visible');
    cy.contains('Simple Room').parent().parent().within(() => {
      cy.get('.quantity-controls').within(() => {
        cy.get('button').contains('+').click();
      });
    });
    
    // PASO 4: Click en "Reservar"
    cy.get('.final-reserve-button').click();
    cy.wait(1000);
    
    // PASO 5: Click en "Confirmar y pagar"
    cy.get('.btn-pay').click();
    cy.wait(1000);
    
    // PASO 6: Llenar datos de tarjeta en el modal
    cy.get('input[name="nombreTitular"]').type('Fernando Cabrera');
    cy.get('input[name="numeroTarjeta"]').type('4532123456789012');
    cy.get('input[name="fechaExpiracion"]').type('2027-06');
    cy.get('input[name="cvc"]').type('123');
    
    // PASO 7: Confirmar pago
    cy.get('.modal-actions').within(() => {
      cy.get('.btn-primary').click();
    });
    
    // PASO 8: Verificar mensaje de confirmación
    cy.contains('Reserva confirmada', { timeout: 10000 }).should('be.visible');
    cy.wait(2000);
    
    // PASO 9: Ir a Mis Reservas
    cy.get('.dropdown-usuario').click();
    cy.wait(500);
    cy.get('[data-test="mis-reservas-link"]').click();
    cy.url().should('include', '/mis-reservas');
    
    // PASO 10: Verificar que la reserva aparece
    cy.get('.reserva-card', { timeout: 10000 }).should('be.visible');
    cy.contains('Hotel La Hacienda').should('be.visible');
    cy.contains('Simple Room').should('be.visible');
    cy.contains('confirmada').should('be.visible');
    
    // PASO 11: Verificar botón Información
    cy.get('.reserva-card').first().within(() => {
      cy.contains('button', 'Información').should('be.visible');
    });

    // PASO 12: Verificar todos los elementos de cada card
    cy.get('.reserva-card').first().within(() => {
      cy.get('img').should('be.visible');
      cy.contains('confirmada').should('be.visible');
      cy.contains('2025-').should('be.visible');
    });

    // PASO 13: Cerrar el dropdown haciendo click fuera
    cy.get('body').click(0, 0);
    cy.wait(500);

    // PASO 14: Abrir el modal
    cy.get('.reserva-card').first().find('button').contains('Información').click();
    cy.wait(500);
    cy.contains('Información').should('be.visible');
    cy.contains('Resumen de precios').should('be.visible');

    // PASO 15: Verificar información completa en el modal
    cy.contains('Subtotal').should('be.visible');
    cy.contains('Total').should('be.visible');
    cy.contains('Fechas de estadía').should('be.visible');
    cy.contains('Entrada').should('be.visible');
    cy.contains('Salida').should('be.visible');
    cy.contains('Adultos').should('be.visible');
    cy.contains('Niños').should('be.visible');
  });

});