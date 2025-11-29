describe('Itinerario Básico - Validación', {retries: 2}, () => {
  
  beforeEach(() => {
    cy.session('andre-session', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('andre2002@gmail.com');
      cy.get('#password').type('Andre100');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
    });
  });

  it('Debe activar itinerario básico y mostrar itinerario sugerido', () => {
    cy.visit('http://localhost:4200/');
    cy.get('#destino').clear();
    cy.get('#destino').type('Lima');
    cy.get('#check-in').type('2025-11-28');
    cy.get('#check-out').type('2025-12-02');
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.wait(500);
    cy.contains('button', 'Mostrar hoteles').click();
    cy.contains('Hotel La Hacienda', { timeout: 10000 }).should('be.visible');
    cy.get('.btn-ver-itinerario').first().click();
    cy.wait(1000);
    cy.contains('Itinerario Sugerido').should('be.visible');
    cy.contains('Complementa tu estadía en Hotel La Hacienda').should('be.visible');
  });

  it('Debe mostrar actividades del itinerario por días', () => {
    cy.visit('http://localhost:4200/');
    cy.get('#destino').clear();
    cy.get('#destino').type('Lima');
    cy.get('#check-in').type('2025-11-28');
    cy.get('#check-out').type('2025-12-02');
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Mostrar hoteles').click();
    cy.contains('Hotel La Hacienda', { timeout: 10000 }).should('be.visible');
    cy.get('.btn-ver-itinerario').first().click();
    cy.wait(1000);
    
    // Verificar que aparece al menos Día 1
    cy.contains('Día 1:').should('be.visible');
    
    // Hacer scroll para verificar que hay más días
    cy.contains('Día 2:').scrollIntoView();
    cy.contains('Día 2:').should('be.visible');
  });

  it('Debe mostrar información completa de cada actividad', () => {
    cy.visit('http://localhost:4200/');
    cy.get('#destino').clear();
    cy.get('#destino').type('Lima');
    cy.get('#check-in').type('2025-11-28');
    cy.get('#check-out').type('2025-12-02');
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Mostrar hoteles').click();
    cy.contains('Hotel La Hacienda', { timeout: 10000 }).should('be.visible');
    cy.get('.btn-ver-itinerario').first().click();
    cy.wait(1000);
    
    // Verificar que Día 1 tiene actividad con información completa
    cy.contains('Día 1:').should('be.visible');
    
    // Verificar que aparecen elementos de calificación, reseñas, horas, precio
    cy.get('body').should('contain', 'reseñas');
    cy.get('body').should('contain', 'Horas');
    cy.get('body').should('contain', '$');
    cy.get('body').should('contain', '/persona');
    cy.get('body').should('contain', 'excl. tax');
    
    // Hacer scroll y verificar Día 2 tiene información similar
    cy.contains('Día 2:').scrollIntoView();
    cy.contains('Día 2:').should('be.visible');
  });
  it('Debe mostrar imágenes de las actividades', () => {
  cy.visit('http://localhost:4200/');
  cy.get('#destino').clear();
  cy.get('#destino').type('Lima');
  cy.get('#check-in').type('2025-11-28');
  cy.get('#check-out').type('2025-12-02');
  cy.get('input[type="checkbox"]').check({ force: true });
  cy.contains('button', 'Mostrar hoteles').click();
  cy.contains('Hotel La Hacienda', { timeout: 10000 }).should('be.visible');
  cy.get('.btn-ver-itinerario').first().click();
  cy.wait(1000);
  
  // Verificar imagen del Día 1
  cy.contains('Día 1:').should('be.visible');
  cy.get('img').should('have.length.greaterThan', 0);
  
  // Hacer scroll para ver Día 2
  cy.contains('Día 2:').scrollIntoView();
  cy.wait(500);
  
  // Verificar que ahora hay más imágenes visibles
  cy.get('img').should('have.length.greaterThan', 1);
});


});