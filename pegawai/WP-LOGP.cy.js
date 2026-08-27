const EMAIL_EMPLOYEE = 'byeomwooseok@gmail.com'
const PASSWORD_EMPLOYEE = '12345678'
const T = { timeout: 30000 }

describe('WP-LOGP | Menguji halaman login WiraPOS (Pegawai)', () => {

  // WP-LOGP-001
  it('Membuka halaman Login', () => {
    cy.visit('/')
    cy.contains('a, button', /masuk/i).first().click()
    cy.url().should('include', '/login')
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder*="Kata Sandi"]').should('be.visible')
    cy.contains('button', /masuk/i).should('be.visible')
  })

  // WP-LOGP-002
  it('Login dengan akun employee valid', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').clear().type(EMAIL_EMPLOYEE)
    cy.get('input[placeholder*="Kata Sandi"]').clear().type(PASSWORD_EMPLOYEE)
    cy.contains('button', /masuk/i).click()
    cy.url().should('not.include', '/login')
    cy.contains(/employee/i).should('be.visible')
  })

  // WP-LOGP-003
  it('Login tanpa mengisi email', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').clear()
    cy.get('input[placeholder*="Kata Sandi"]').clear().type(PASSWORD_EMPLOYEE)
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/login')
    cy.contains('Email tidak boleh kosong').should('be.visible')
  })

  // WP-LOGP-004
  it('Login tanpa mengisi password', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').clear().type(EMAIL_EMPLOYEE)
    cy.get('input[placeholder*="Kata Sandi"]').clear()
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/login')
    cy.contains('Password tidak boleh kosong').should('be.visible')
  })
})