describe('Crear Tour - Galería de Imágenes', {retries: 2}, () => {
    beforeEach(() => {
      cy.session('proveedor-session', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#email').type('edwinproveedor@gmail.com');
        cy.get('#password').type('proveedor');
        cy.contains('button', 'Iniciar Sesión').click();
        cy.contains('Hola, Edwin Proveedor SAC').should('be.visible');
      });
      
      cy.visit('http://localhost:4200/crear-tour');
      
      cy.contains('Publicar nuevo tour').should('be.visible');
    });
  
    it('Debe mostrar mensaje de límite al agregar 5 imágenes', () => {
      const imageUrl = 'https://ejemplo.com/imagen';
      
      for (let i = 0; i < 5; i++) {
        cy.get('input[placeholder="URL de nueva imagen"]').type(imageUrl + i + '.jpg');
        cy.contains('button', 'Agregar imagen').click();
      }
      
      cy.contains('Límite de 5 imágenes alcanzado').should('be.visible');
    });
  
    it('Debe eliminar una imagen al hacer click en el botón Eliminar', () => {
      const imageUrl = 'https://ejemplo.com/imagen';
      
      for (let i = 0; i < 3; i++) {
        cy.get('input[placeholder="URL de nueva imagen"]').type(imageUrl + i + '.jpg');
        cy.contains('button', 'Agregar imagen').click();
      }
      
      cy.get('.btn-remove').should('have.length', 3);
      
      cy.get('.btn-remove').first().click();
      
      cy.get('.btn-remove').should('have.length', 2);
    });
  
    it('Debe permitir agregar múltiples objetos a "Cosas para llevar"', () => {
      cy.get('.btn-remove').should('have.length', 0);
      
      cy.get('input[placeholder="Ej: Protector solar"]').type('Protector solar');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('.btn-remove').should('have.length', 1);
      
      cy.get('input[placeholder="Ej: Protector solar"]').type('Gorra');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('.btn-remove').should('have.length', 2);
      
      cy.get('input[placeholder="Ej: Protector solar"]').type('Agua embotellada');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('.btn-remove').should('have.length', 3);
    });
  
    it('Debe permitir eliminar un objeto de "Cosas para llevar"', () => {
      cy.get('input[placeholder="Ej: Protector solar"]').type('Protector solar');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('input[placeholder="Ej: Protector solar"]').type('Gorra');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('input[placeholder="Ej: Protector solar"]').type('Agua embotellada');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('.btn-remove').should('have.length', 3);
      
      cy.get('.btn-remove').eq(1).click();
      
      cy.get('.btn-remove').should('have.length', 2);
      
      cy.get('.btn-remove').eq(0).click();
      
      cy.get('.btn-remove').should('have.length', 1);
      
      cy.get('.btn-remove').eq(0).click();
      
      cy.get('.btn-remove').should('have.length', 0);
    });
  
    it('Debe validar que el campo de objeto no esté vacío al agregar', () => {
      cy.get('.btn-remove').should('have.length', 0);
      
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('.btn-remove').should('have.length', 0);
      
      cy.get('input[placeholder="Ej: Protector solar"]').type('   ');
      cy.contains('button', 'Agregar objeto').click();
      
      cy.get('.btn-remove').should('have.length', 0);
    });
  
    it('Debe permitir seleccionar una Categoría', () => {
      cy.get('select[formcontrolname="categoria"]').select('Aventura');
      
      cy.get('select[formcontrolname="categoria"]').should('have.value', 'Aventura');
      
      cy.get('select[formcontrolname="categoria"]').select('Gastronomía');
      
      cy.get('select[formcontrolname="categoria"]').should('have.value', 'Gastronomía');
      
      cy.get('select[formcontrolname="categoria"]').select('Cultura');
      
      cy.get('select[formcontrolname="categoria"]').should('have.value', 'Cultura');
    });
});