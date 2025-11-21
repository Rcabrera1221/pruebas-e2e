describe('Mis Publicaciones - Proveedor', () => {
    it('Debe iniciar sesión correctamente como proveedor y redirigir a Mis publicaciones', () => {
      cy.visit('http://localhost:4200/auth/login');
      
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.contains('Mis publicaciones').should('be.visible');
      cy.contains('Hola, Edwin Proveedor SAC').should('be.visible');
    });
  
    it('Debe mostrar las publicaciones del proveedor en el dashboard', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.contains('Conroy PLC Service').should('be.visible');
      
      cy.contains('Stammshire, French Polynesia').should('be.visible');
      
      cy.contains('button', 'Editar').should('be.visible');
      cy.contains('button', 'Eliminar').should('be.visible');
    });
  
    it('Debe mostrar correctamente la información de las publicaciones', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.get('.card-title-main').first().should('contain', 'Conroy PLC Service');
      
      cy.get('.card-location').first().should('contain', 'Stammshire, French Polynesia');
          
      cy.contains('Reservas (Pendientes):').should('be.visible');
      
      cy.contains('Estrellas:').should('be.visible');
    });
  
    it('Debe redirigir al formulario de creación al hacer click en Crear Tour', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.contains('Crear Tour').click();
      
      cy.url().should('include', '/crear-tour');
      cy.contains('Publicar nuevo tour').should('be.visible');
      cy.contains('Datos del Tour').should('be.visible');
    });
  
    it('Debe redirigir al formulario de creación al hacer click en Crear Hotel', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.contains('Crear Hotel').click();
      
      cy.url().should('include', '/crear-hotel');
      cy.contains('Publicar nuevo hotel').should('be.visible');
      cy.contains('Datos del Hotel').should('be.visible');
    });
  
    it('Debe cerrar sesión correctamente y redirigir a la página de inicio de sesión', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.get('#email').type('edwinproveedor@gmail.com');
    cy.get('#password').type('proveedor');
    cy.contains('button', 'Iniciar Sesión').click();
    
    cy.contains('Hola, Edwin Proveedor SAC').should('be.visible');
    
    cy.contains('Hola, Edwin Proveedor SAC').click();
    
    cy.contains('Cerrar sesión').click({ force: true });
    
    cy.url().should('include', '/auth/login');
    cy.contains('Iniciar Sesión').should('be.visible');
    cy.contains('Ingresa tus credenciales para acceder a tu cuenta').should('be.visible');
    });
});