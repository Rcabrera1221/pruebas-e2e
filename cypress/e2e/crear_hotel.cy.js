describe('Crear Hotel - Galería de Imágenes y Habitaciones', {retries: 2}, () => {
    beforeEach(() => {
      cy.session('proveedor-session', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#email').type('edwinproveedor@gmail.com');
        cy.get('#password').type('proveedor');
        cy.contains('button', 'Iniciar Sesión').click();
        cy.contains('Hola, Edwin Proveedor SAC').should('be.visible');
      });
      
      cy.visit('http://localhost:4200/crear-hotel');
      cy.contains('Publicar nuevo hotel').should('be.visible');
    });
  
    it('Debe permitir agregar múltiples imágenes a la galería (máximo 5)', () => {
      cy.contains('Galería de imágenes').scrollIntoView();
      
      cy.get('input[placeholder="URL de nueva imagen"]').type('https://ejemplo.com/imagen1.jpg');
      cy.contains('button', 'Agregar imagen').click();
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 1);
      });
      
      cy.get('input[placeholder="URL de nueva imagen"]').type('https://ejemplo.com/imagen2.jpg');
      cy.contains('button', 'Agregar imagen').click();
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 2);
      });
      
      cy.get('input[placeholder="URL de nueva imagen"]').type('https://ejemplo.com/imagen3.jpg');
      cy.contains('button', 'Agregar imagen').click();
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 3);
      });
    });
  
    it('Debe mostrar mensaje de límite al agregar 5 imágenes', () => {
      cy.contains('Galería de imágenes').scrollIntoView();
      
      for (let i = 1; i <= 5; i++) {
        cy.get('input[placeholder="URL de nueva imagen"]').type(`https://ejemplo.com/imagen${i}.jpg`);
        cy.contains('button', 'Agregar imagen').click();
      }
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 5);
      });
      
      cy.contains('Límite de 5 imágenes alcanzado').should('be.visible');
    });
  
    it('Debe permitir eliminar imágenes de la galería', () => {
      cy.contains('Galería de imágenes').scrollIntoView();
      
      for (let i = 1; i <= 3; i++) {
        cy.get('input[placeholder="URL de nueva imagen"]').type(`https://ejemplo.com/imagen${i}.jpg`);
        cy.contains('button', 'Agregar imagen').click();
      }
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 3);
      });
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').eq(1).click();
      });
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 2);
      });
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').eq(0).click();
      });
      
      cy.contains('Galería de imágenes').parent().within(() => {
        cy.get('.btn-remove').should('have.length', 1);
      });
    });
  
    it('Debe permitir agregar una habitación completa', () => {
      cy.contains('Habitaciones').scrollIntoView();
      
      cy.get('.habitacion-card').should('have.length', 1);
      
      cy.contains('button', 'Agregar habitación').click();
      
      cy.get('.habitacion-card').should('have.length', 2);
      
      cy.contains('Habitación 2').should('be.visible');
    });
  
    it('Debe permitir eliminar una habitación agregada', () => {
      cy.contains('Habitaciones').scrollIntoView();
      
      cy.contains('button', 'Agregar habitación').click();
      
      cy.get('.habitacion-card').should('have.length', 2);
      
      cy.get('.habitacion-card').eq(1).within(() => {
        cy.contains('button', 'Eliminar').click();
      });
      
      cy.get('.habitacion-card').should('have.length', 1);
      
      cy.contains('Habitación 2').should('not.exist');
    });
  
    it('Debe permitir agregar múltiples habitaciones', () => {
      cy.contains('Habitaciones').scrollIntoView();
      
      cy.get('.habitacion-card').should('have.length', 1);
      
      for (let i = 0; i < 3; i++) {
        cy.contains('button', 'Agregar habitación').click();
      }
      
      cy.get('.habitacion-card').should('have.length', 4);
      
      cy.contains('Habitación 1').should('be.visible');
      cy.contains('Habitación 2').should('be.visible');
      cy.contains('Habitación 3').should('be.visible');
      cy.contains('Habitación 4').should('be.visible');
    });
});