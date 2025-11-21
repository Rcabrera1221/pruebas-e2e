describe('Inicio sesion', {retries: 2}, () => {
  it('Inicio de sesión satisfactorio', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.xpath('//*[@id="email"]').type('jean200@gmail.com');
    cy.xpath('//*[@id="password"]').type('Andre100');
    cy.xpath('//button[@type="submit" and text()=" Iniciar Sesión "]').click();
    cy.contains('Hola, ').should('be.visible');
  });
 
  it('Inicio de sesión, contraseña incorrecta', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.xpath('//*[@id="email"]').type('luis200@gmail.com');
    cy.xpath('//*[@id="password"]').type('error503');
    cy.xpath('//button[@type="submit" and text()=" Iniciar Sesión "]').click();
    cy.contains('Credenciales inválidas').should('be.visible');
  });
  it('Inicio de sesión, email incorrecto', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.xpath('//*[@id="email"]').type('12445789@gmail.com');
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//button[@type="submit" and text()=" Iniciar Sesión "]').click();
    cy.contains('Credenciales inválidas').should('be.visible');
  });
  it('El botón debe estar deshabilitado cuando la contraseña está vacía', () => {
    cy.visit('http://localhost:4200/auth/login');
    
    // Escribir solo email, dejar contraseña vacía
    cy.get('#email').type('andre12214@gmail.com');
    // No escribir contraseña
    
    // Verificar que el botón está deshabilitado
    cy.contains('button', 'Iniciar Sesión').should('be.disabled');
  });

  it('El botón debe estar deshabilitado cuando el correo está vacío', () => {
    cy.visit('http://localhost:4200/auth/login');
    
    // No escribir email, solo escribir contraseña
    cy.get('#password').type('password123');
    
    // Verificar que el botón está deshabilitado
    cy.contains('button', 'Iniciar Sesión').should('be.disabled');
  });

  it('El botón debe estar deshabilitado cuando ambos campos están vacíos', () => {
    cy.visit('http://localhost:4200/auth/login');
    
    // No escribir nada en ningún campo
    
    // Verificar que el botón está deshabilitado
    cy.contains('button', 'Iniciar Sesión').should('be.disabled');
  });
})
