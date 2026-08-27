const EMAIL_EMPLOYEE = 'byeomwooseok@gmail.com'
const PASSWORD_EMPLOYEE = '12345678'
const T60 = { timeout: 60000 }

const loginEmployee = () => {
  cy.visit('/login')
  cy.get('input[placeholder="Email"]').type(EMAIL_EMPLOYEE)
  cy.get('input[placeholder*="Kata Sandi"]').type(PASSWORD_EMPLOYEE)
  cy.contains('button', /masuk/i).click()
  cy.url().should('not.include', '/login')
}

describe('Menguji dashboard employee WiraPOS', () => {
  beforeEach(() => {
    loginEmployee()
    cy.contains('Beranda', T60).should('be.visible')
  })

  // WP-EMP-001
  it('Menguji halaman Beranda employee', () => {
    cy.contains(/employee/i).should('be.visible')
    cy.contains('Beranda').should('be.visible')
    cy.contains('Penjualan').should('not.exist')
  })

  // WP-EMP-002
  it('Menguji kartu statistik Beranda', () => {
    cy.contains(/produk tersedia/i).should('be.visible')
    cy.contains(/stok hampir habis/i).should('be.visible')
    cy.contains(/diskon digunakan/i).should('be.visible')
    cy.contains(/stok aman/i).should('be.visible')
  })

  // WP-EMP-003
  it('Menguji section Daftar Produk Baru', () => {
    cy.contains('Daftar Produk Baru').should('be.visible')
    cy.contains('Paket Huawei MatePad 12X').should('be.visible')
    cy.contains(/\+\d+ pcs/).should('be.visible')
  })

  // WP-EMP-004
  it('Menguji section Diskon Digunakan', () => {
    cy.contains(/diskon digunakan/i).should('be.visible')
    cy.contains(/belum ada diskon digunakan/i).should('be.visible')
  })

  // WP-EMP-005
  it('Menguji section Stok Hampir Habis', () => {
    cy.contains(/stok hampir habis/i).should('be.visible')
    cy.contains('th', 'No').should('be.visible')
    cy.contains('th', 'Produk').should('be.visible')
    cy.contains('th', 'Kategori').should('be.visible')
    cy.contains('th', 'Stok').should('be.visible')
  })
})