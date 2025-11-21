describe('Reseñas de Hotel', {retries: 2}, () => {
    beforeEach(() => {
      // Usar cy.session para mantener la sesión entre tests
      cy.session('viajero-session-reseñas', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#email').type('miguel200@gmail.com');
        cy.get('#password').type('Andre100');
        cy.contains('button', 'Iniciar Sesión').click();
        cy.contains('Hola,').should('be.visible');
      });
    });
  
    //  Seleccionar diferentes cantidades de estrellas
    it('Debe permitir seleccionar 1 estrella', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      // Seleccionar 1 estrella
      cy.get('.stars-container .fa-star').eq(0).click({ force: true });
      
      // Verificar que solo 1 estrella está seleccionada
      cy.get('.fa-star.selected').should('have.length', 1);
    });
  
    it('Debe permitir seleccionar 5 estrellas', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      // Seleccionar 5 estrellas
      cy.get('.stars-container .fa-star').eq(4).click({ force: true });
      
      // Verificar que las 5 estrellas están seleccionadas
      cy.get('.fa-star.selected').should('have.length', 5);
    });
  
    it('Debe cerrar el modal al hacer click en Cancelar', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      // Click en "Deja tu opinión" para abrir el modal
      cy.contains('button', 'Deja tu opinión').click();
      
      // Click en Cancelar para cerrar el modal
      cy.contains('button', 'Cancelar').click();
      
      // Verificar que el modal se cerró viendo que el botón "Deja tu opinión" vuelve a estar visible
      cy.contains('button', 'Deja tu opinión').should('be.visible');
    });
  
    // 7. Cambiar la calificación de estrellas
    it('Debe permitir cambiar de 3 estrellas a 5 estrellas', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      // Seleccionar 3 estrellas
      cy.get('.stars-container .fa-star').eq(2).click({ force: true });
      cy.get('.fa-star.selected').should('have.length', 3);
      
      // Cambiar a 5 estrellas
      cy.get('.stars-container .fa-star').eq(4).click({ force: true });
      cy.get('.fa-star.selected').should('have.length', 5);
    });
  
    // 8. Verificar que las estrellas cambien visualmente
    it('Debe cambiar estrellas de unselected a selected visualmente', () => {
      cy.visit('http://localhost:4200/');
      
      cy.get('#destino').clear();
      cy.get('#destino').type('Lima');
      cy.get('#check-in').type('2025-11-19');
      cy.get('#check-out').type('2025-11-21');
      cy.contains('button', 'Mostrar hoteles').click();
      
      cy.contains('button', 'Ver detalles').click();
      cy.url().should('include', '/hoteles/detalle');
      
      cy.contains('button', 'Deja tu opinión').click();
      
      // Verificar que inicialmente todas están unselected
      cy.get('.fa-star.unselected').should('have.length', 5);
      cy.get('.fa-star.selected').should('have.length', 0);
      
      // Seleccionar 4 estrellas
      cy.get('.stars-container .fa-star').eq(3).click({ force: true });
      
      // Verificar que 4 están selected y 1 unselected
      cy.get('.fa-star.selected').should('have.length', 4);
      cy.get('.fa-star.unselected').should('have.length', 1);
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
      
      // Seleccionar 3 estrellas
      cy.get('.stars-container .fa-star').eq(2).click({ force: true });
      
      // Escribir más de 300 caracteres
      cy.get('.comentario-textarea').type('El tour por Lima fue una experiencia realmente enriquecedora. La guía no solo explicó cada punto del recorrido con mucha claridad, sino que también añadió datos históricos y curiosidades que hicieron que todo el viaje fuera más interesante. Me encantó la visita al Centro Histórico, especialmente la Plaza de Armas y los balcones coloniales, que conservan ese estilo que caracteriza a la ciudad. También disfruté el paso por Miraflores y Barranco, donde se mezcla el arte urbano con vistas increíbles al mar. En general, fue un recorrido completo que permite apreciar la diversidad cultural y arquitectónica de Lima');
      
      // Verificar mensaje de advertencia (máximo 300 caracteres)
      cy.contains('máximo 300 caracteres').should('be.visible');
    });
});