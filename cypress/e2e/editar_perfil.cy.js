describe('Editar Perfil', {retries: 2}, () => {
    it('Debe cambiar el nombre de usuario correctamente', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('andre20046@gmail.com');
      cy.get('#password').type('Andre100');
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.contains('Hola,').should('be.visible');
      
      cy.visit('http://localhost:4200/editar-perfil');
      
      cy.get('#nombre').clear();
      cy.get('#nombre').type('Fernando');
      
      cy.contains('button', 'Guardar Cambios').click();
      
      cy.contains('Hola, Fernando').should('be.visible');
    });
  
    it('Debe cambiar el apellido correctamente', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('andre2002@gmail.com');
      cy.get('#password').type('Andre100');
      cy.contains('button', 'Iniciar Sesión').click();
      
      cy.contains('Hola,').should('be.visible');
      
      cy.visit('http://localhost:4200/editar-perfil');
      
      cy.get('#apellido').clear();
      cy.get('#apellido').type('Gutierrez');
      
      cy.contains('button', 'Guardar Cambios').click();
      
      cy.get('#apellido').should('have.value', 'Gutierrez');
    });
  
    it('Debe mostrar error cuando el celular tiene más de 9 dígitos', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('sambelito1222@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
      
      cy.visit('http://localhost:4200/editar-perfil');
      
      cy.get('#telefono').clear();
      cy.get('#telefono').type('+51 9750482955');
      
      cy.contains('Formato esperado:').should('be.visible');
    });
  
    it('Debe mostrar mensaje de que el RUC no puede ser modificado', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('sambelito1222@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
      
      cy.visit('http://localhost:4200/editar-perfil');
      
      cy.contains('Este campo no puede ser modificado').should('be.visible');
    });
  
    it('Debe actualizar el número de celular correctamente', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('sambelito1222@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
      
      cy.visit('http://localhost:4200/editar-perfil');
      
      cy.get('#telefono').clear();
      cy.get('#telefono').type('+51 975048291');
      
      cy.contains('button', 'Guardar Cambios').click();
      
      cy.get('#telefono').should('have.value', '+51 975048291');
    });
});