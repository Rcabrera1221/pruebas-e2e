describe('Registro', () => {
    it('Registro cuenta viajero', () => {
      cy.visit('http://localhost:4200/auth/registro');
      const a = Math.floor(Math.random()*999);
      cy.get('#rol').select('viajero');
      cy.get('#nombre').type('Miguel');
      cy.get('#apellido').type('Magallanes');
      cy.xpath('//*[@id="email"]').type(`andre200${a}@gmail.com`);
      cy.xpath('//*[@id="password"]').type('Perro503');
      cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
      cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').click();
      cy.contains('Hola, ', {timeout: 10000}).should('be.visible');
    });
   // Test de email duplicado
  it('Debe mostrar error cuando el email ya está registrado', () => {
    cy.visit('http://localhost:4200/auth/registro');
    
    cy.get('#rol').select('viajero');
    cy.get('#nombre').type('Ruben');
    cy.get('#apellido').type('Cabrera');
    cy.xpath('//*[@id="email"]').type('andre2002@gmail.com'); 
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').click();
    
    cy.contains('The email has already been taken').should('be.visible');
  });
  //contraseñas duplicadas
  it('Debe mostrar error cuando las contraseñas no coinciden', () => {
    cy.visit('http://localhost:4200/auth/registro');
    
    cy.get('#rol').select('viajero');
    cy.get('#nombre').type('andre');
    cy.get('#apellido').type('cabrera');
    cy.xpath('//*[@id="email"]').type('edwinviajero1@gmail.com');
    cy.xpath('//*[@id="password"]').type('viajero');
    cy.xpath('//*[@id="confirmPassword"]').type('error');
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').click({ force: true });
    
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });
  // RUC MENOS DE 11 DIGITOS
  it('Proveedor - Debe mostrar error cuando el RUC tiene menos de 11 dígitos', () => {
    cy.visit('http://localhost:4200/auth/registro');
    const a = Math.floor(Math.random()*999);
    
    cy.get('#rol').select('proveedor');
    cy.get('#empresa_nombre').type('Hotel Paradise');
    cy.get('#ruc').type('1234'); // Solo 4 dígitos (inválido)
    cy.get('#telefono').type('+51987654321');
    cy.xpath('//*[@id="email"]').type(`proveedor${a}@gmail.com`);
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').click({ force: true });
    
    cy.contains('RUC es requerido y debe tener 11 dígitos numéricos').should('be.visible');
  });
  // NUMERO CELULAR MENOS 9 DIGITOS
  it('Proveedor - Debe mostrar error cuando el numero celular tiene menos de 9 digitos', () => {
    cy.visit('http://localhost:4200/auth/registro');
    const a = Math.floor(Math.random()*999);
    
    cy.get('#rol').select('proveedor');
    cy.get('#empresa_nombre').type('Hotel Paradise');
    cy.get('#ruc').type('12344567896'); 
    cy.get('#telefono').type('+519876543');
    cy.xpath('//*[@id="email"]').type(`proveedor${a}@gmail.com`);
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').click({ force: true });
    
    cy.contains('Celular requerido y debe tener 9 dígitos numéricos').should('be.visible');
  });
  // CAMPO NUMERO CELULAR NO ACEPTA SIMBOLOS
  it('Proveedor - Debe mostrar error cuando el numero celular tiene menos de 9 digitos', () => {
    cy.visit('http://localhost:4200/auth/registro');
    const a = Math.floor(Math.random()*999);
    
    cy.get('#rol').select('proveedor');
    cy.get('#empresa_nombre').type('Hotel Paradise');
    cy.get('#ruc').type('12344567896'); 
    cy.get('#telefono').type('+519876543#');
    cy.xpath('//*[@id="email"]').type(`proveedor${a}@gmail.com`);
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').click({ force: true });
    
    cy.contains('Celular requerido y debe tener 9 dígitos numéricos').should('be.visible');
  });
  // campo correo vacío
  it('Proveedor - Debe validar que el RUC no esté vacío', () => {
    cy.visit('http://localhost:4200/auth/registro');
    const a = Math.floor(Math.random()*999);
    
    cy.get('#rol').select('proveedor');
    cy.get('#empresa_nombre').type('Hotel Paradise');
    // No escribimos RUC
    cy.get('#telefono').type('+51987654321');
    cy.xpath('//*[@id="email"]').type(`proveedor${a}@gmail.com`);
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    
    // Verificar que el botón está deshabilitado
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').should('be.disabled');
  });
  //campo celular vacío
  it('Proveedor - Debe validar que el celular no esté vacío', () => {
    cy.visit('http://localhost:4200/auth/registro');
    const a = Math.floor(Math.random()*999);
    
    cy.get('#rol').select('proveedor');
    cy.get('#empresa_nombre').type('Hotel Paradise');
    cy.get('#ruc').type('12345678901');
    cy.xpath('//*[@id="email"]').type(`proveedor${a}@gmail.com`);
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    
    // Verificar que el botón está deshabilitado
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').should('be.disabled');
  });
  // CAMPO NOMBRE DE LA EMPRESA VACIO
  it('Proveedor - Debe validar que el nombre de la empresa no esté vacío', () => {
    cy.visit('http://localhost:4200/auth/registro');
    const a = Math.floor(Math.random()*999);
    
    cy.get('#rol').select('proveedor');
    cy.get('#ruc').type('12345678901');
    cy.get('#telefono').type('+51987654321');
    cy.xpath('//*[@id="email"]').type(`proveedor${a}@gmail.com`);
    cy.xpath('//*[@id="password"]').type('Perro503');
    cy.xpath('//*[@id="confirmPassword"]').type('Perro503');
    
    // Verificar que el botón está deshabilitado
    cy.xpath('//button[@type="submit" and text()="Crear cuenta"]').should('be.disabled');
  });
})

