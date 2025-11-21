describe('Búsqueda y visualización de hoteles', {retries: 2}, () => {
    beforeEach(() => {
      // Usar cy.session para mantener la sesión entre tests
      cy.session('viajero-session', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#email').type('andre2002@gmail.com');
        cy.get('#password').type('Andre100');
        cy.contains('button', 'Iniciar Sesión').click();
        cy.contains('Hola,').should('be.visible');
      });
    });
  
    it('Debe realizar búsqueda de hoteles y mostrar resultados', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('Hotel La Hacienda').should('be.visible');
    });
  
    it('Debe navegar a ver detalles del hotel', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      
      cy.url().should('include', '/hoteles/detalle');
      cy.contains('Hotel La Hacienda').should('be.visible');
    });
  
    it('El botón debe estar deshabilitado sin Check Out', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      
      cy.contains('button', 'Mostrar hoteles').should('be.disabled');
    });
  
    it('Debe mostrar advertencia al intentar enviar reseña sin seleccionar estrellas', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      cy.contains('button', 'Enviar').click();
      
      cy.contains('Selecciona una calificación').should('be.visible');
    });
  
    it('Debe mostrar advertencia al enviar 3 estrellas sin comentario', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      cy.get('.stars-container .fa-star').eq(2).click({ force: true });
      
      cy.contains('button', 'Enviar').click();
      
      cy.contains('Escribe un comentario').should('be.visible');
    });
  
    it('Debe mostrar advertencia con comentario de menos de 10 caracteres', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      cy.get('.stars-container .fa-star').eq(2).click({ force: true });
      cy.get('.comentario-textarea').type('bueno');
      
      cy.contains('button', 'Enviar').click();
      
      cy.contains('El comentario debe tener al menos 10 caracteres').should('be.visible');
    });
  
    it('Debe mostrar advertencia con comentario de más de 300 caracteres', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      cy.get('.stars-container .fa-star').eq(2).click({ force: true });
      cy.get('.comentario-textarea').type('El tour por Lima me sorprendió más de lo que esperaba. La guía explicó cada punto con claridad y manejaba muy bien la historia de la ciudad, lo que hizo que todo el recorrido fuera interesante. Me gustó mucho la visita al Centro Histórico, especialmente la Plaza de Armas y los balcones coloniales. A');
      
      cy.contains('button', 'Enviar').click();
      
      cy.contains('máximo 300 caracteres').should('be.visible');
    });
  });