describe('Proveedor - Crear Tour - Cosas para llevar', {retries: 2}, () => {
  
  beforeEach(() => {
    cy.session('proveedor-session', () => {
      cy.visit('http://localhost:4200/auth/login');
      cy.get('#email').type('edwinproveedor@gmail.com');
      cy.get('#password').type('proveedor');
      cy.contains('button', 'Iniciar Sesión').click();
      cy.contains('Hola,').should('be.visible');
    });
  });

  it('Debe mostrar la página de Crear Tour', () => {
    cy.visit('http://localhost:4200/');
    
    cy.contains('Crear Tour').click();
    cy.wait(1000);
    
    cy.url().should('include', '/crear-tour');
    cy.contains('Crear Tour').should('be.visible');
    
    cy.contains('Cosas para llevar (Máx. 5)').scrollIntoView();
    cy.contains('Cosas para llevar (Máx. 5)').should('be.visible');
  });

  it('Debe permitir agregar un ítem a Cosas para llevar', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Crear Tour').click();
    cy.wait(1000);
    
    cy.contains('Cosas para llevar').scrollIntoView();
    cy.wait(500);
    
    cy.get('input[formcontrolname="nombre"]').last().scrollIntoView();
    cy.get('input[formcontrolname="nombre"]').last().type('protector');
    
    cy.get('.btn-add').first().click();
    cy.wait(500);
   
  });

  it('Debe mostrar botones de emoji para seleccionar', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Crear Tour').click();
    cy.wait(1000);
    
    cy.contains('Cosas para llevar').scrollIntoView();
    cy.wait(500);
    
    cy.get('input[formcontrolname="nombre"]').last().scrollIntoView();
    cy.get('input[formcontrolname="nombre"]').last().type('camara');
    cy.wait(500);
    
    cy.get('.btn-emoji').should('have.length.greaterThan', 0);
    cy.get('.btn-emoji').should('be.visible');
  });

  it('Debe permitir agregar hasta 5 ítems máximo', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Crear Tour').click();
    cy.wait(1000);
    
    cy.contains('Cosas para llevar').scrollIntoView();
    cy.wait(500);
    
    const items = ['protector', 'polo', 'camara', 'celular', 'maleta'];
    
    items.forEach((item) => {
      cy.get('input[formcontrolname="nombre"]').last().scrollIntoView();
      cy.get('input[formcontrolname="nombre"]').last().clear();
      cy.get('input[formcontrolname="nombre"]').last().type(item);
      cy.get('.btn-add').first().click();
      cy.wait(300);
    });
    
    cy.scrollTo('bottom');
    cy.wait(500);
    
  });

  it('Debe mostrar mensaje de advertencia al alcanzar el límite de 5 ítems', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Crear Tour').click();
    cy.wait(1000);
    
    cy.contains('Cosas para llevar').scrollIntoView();
    cy.wait(500);
    
    const items = ['protector', 'polo', 'camara', 'celular', 'maleta'];
    
    items.forEach((item) => {
      cy.get('input[formcontrolname="nombre"]').last().scrollIntoView();
      cy.get('input[formcontrolname="nombre"]').last().clear();
      cy.get('input[formcontrolname="nombre"]').last().type(item);
      cy.get('.btn-add').first().click();
      cy.wait(300);
    });
    
    cy.scrollTo('bottom');
    cy.wait(500);
    
  });

  
});