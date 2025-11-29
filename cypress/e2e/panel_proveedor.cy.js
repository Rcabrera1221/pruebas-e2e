describe('Proveedor - Mis Publicaciones', {retries: 2}, () => {
  
  beforeEach(() => {
    cy.session('proveedor-session', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
    });
  });

  it('Debe mostrar la sección Mis publicaciones con estadísticas', () => {
    cy.visit('http://localhost:4200/');
    
    cy.contains('Mis publicaciones').click();
    cy.wait(1000);
    cy.url().should('include', '/proveedor');
    
    cy.contains('Mis publicaciones').should('be.visible');
    
    cy.contains('Cantidad de reservas').should('be.visible');
    cy.contains('Calificación promedio').should('be.visible');
    cy.contains('Lugar más popular').should('be.visible');
  });

  it('Debe mostrar publicaciones de tours y hoteles', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Mis publicaciones').click();
    cy.wait(2000);
    
    // Hacer scroll hacia abajo gradualmente
    cy.scrollTo(0, 500);
    cy.wait(500);
    
    // Verificar que existen publicaciones (pueden ser TOUR o HOTEL)
    cy.get('body').should('contain', 'Precio base:');
    cy.get('body').should('contain', 'Reservas (Confirmadas):');
    cy.get('body').should('contain', 'Calificación promedio:');
  });

  it('Debe tener botones Editar y Eliminar en las publicaciones', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Mis publicaciones').click();
    cy.wait(2000);
    
    cy.scrollTo(0, 500);
    cy.wait(500);
    
    // Verificar que existen botones Editar y Eliminar
    cy.contains('button', 'Editar').should('be.visible');
    cy.contains('button', 'Eliminar').should('be.visible');
  });

  it('Debe redirigir a la página de edición al hacer click en Editar', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Mis publicaciones').click();
    cy.wait(2000);
    
    cy.scrollTo(0, 500);
    cy.wait(500);
    
    // Click en el primer botón Editar que encuentre
    cy.contains('button', 'Editar').first().click();
    cy.wait(1000);
    
    // Verificar que se abre una página de edición (puede ser tour o hotel)
    cy.get('body').should('contain', 'Editar');
    
    // Verificar que hay campos de formulario
    cy.contains('Nombre:').should('be.visible');
    cy.contains('Descripción:').should('be.visible');
  });

});