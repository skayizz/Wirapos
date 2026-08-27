describe('WiraPOS - Login', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com')
    cy.viewport(1366, 768)
    cy.wait(2000)

    // Klik tombol MASUK di navbar
    cy.contains('MASUK')
      .click({ force: true })

    cy.url().should('include', '/login')
  })

  // ==========================
  // WP-LOG-001
  // ==========================
  it('WP-LOG-001 - Membuka Halaman Login', () => {

    cy.contains('Login').should('be.visible')
    cy.get('input').should('have.length.at.least', 2)

  })

  // ==========================
  // WP-LOG-002
  // ==========================
  it('WP-LOG-002 - Login dengan data valid', () => {

    cy.get('input').eq(0)
      .type('faisalgaming1245@gmail.com')

    cy.get('input').eq(1)
      .type('12345678')

    cy.contains('button', 'Masuk')
      .click({ force: true })

    // Sesuaikan jika login berhasil
    cy.url().should('not.include', '/login')

  })

  // ==========================
  // WP-LOG-003
  // ==========================
  it('WP-LOG-003 - Login tanpa mengisi email', () => {

    cy.get('input').eq(1)
      .type('password123')

    cy.contains('button', 'Masuk')
      .click({ force: true })

    // Tetap berada di halaman login
    cy.url().should('include', '/login')

  })
  // ==========================
  // WP-LOG-004
  // ==========================
  it('WP-LOG-004 - Password kosong', () => {

    cy.get('input[type="email"]')
      .type('email@test.com')

    cy.contains('button','Masuk')
      .click({force:true})

    cy.contains('Password').should('exist')

  })

  // ==========================
  // WP-LOG-005
  // ==========================
  it('WP-LOG-005 - Email dan Password kosong', () => {

    cy.contains('button','Masuk')
      .click({force:true})

    cy.contains('Login').should('be.visible')

  })

})