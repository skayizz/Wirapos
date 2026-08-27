const EMAIL = 'arliseka08@gmail.com'
const PASSWORD = '12345678'
const T60 = { timeout: 60000 }

Cypress.Commands.add('loginKasirGudang', () => {
  cy.session('kasir-gudang', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').type(EMAIL)
    cy.get('input[placeholder*="Kata Sandi"]').type(PASSWORD)
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/outlets')
  })
})

const bukaAddProduct = () => {
  cy.contains('button', 'Add Product', T60).click()
}

const tambahPaket = () => {
  bukaAddProduct()
  cy.contains('Paket Huawei MatePad 12X').click()
  cy.contains('button', /Simpan Perubahan/).click()
}

const tambahVarian = () => {
  bukaAddProduct()
  cy.contains('Huawei MatePad 12X 2026').click()
  cy.contains('penyimpanan - 256GB').click()
  cy.contains('penyimpanan - 512GB').click()
  cy.contains('button', /Simpan Perubahan/).click()
}

const expandDetailVarian = () => {
  cy.get('body').then(($body) => {
    if (!$body.text().includes('penyimpanan - 256GB')) {
      cy.get('div:has(h3:contains("Huawei MatePad 12X 2026")) button:contains("Detail")').last().click()
    }
  })
}

const pasangDiskon = () => {
  cy.contains('Gunakan Diskon').first().click()
  cy.get('input[placeholder="Cari voucher..."]').should('be.visible')
  cy.contains('diskon huawei').first().click()
  cy.contains('button', 'Pakai Voucher').click()
}

const isiPembayaran = (nominal) => {
  cy.get('input[placeholder="Nama pembeli"]').type('Test Buyer')
  cy.get('input[placeholder*="Masukkan nominal uang"]').type(nominal)
}

const konfirmasiBayar = () => {
  cy.contains('button', 'Bayar & Cetak Struk').click()
  cy.contains('Apakah anda yakin melanjutkan transaksi').should('be.visible')
  cy.contains('Transaksi akan diproses').should('be.visible')
  cy.contains('button', /^Ya$/).click()
}

describe('Menguji halaman Kasir WiraPOS', () => {
  beforeEach(() => {
    cy.loginKasirGudang()
    cy.visit('/outlets')
    cy.contains('button', 'Add Product', T60).should('be.visible')
  })

  // WP-KASIR-001
  it('Menguji submenu Kasir', () => {
    cy.contains('Penjualan').click()
    cy.contains('a, button', 'Kasir').click()
    cy.contains('button', 'Add Product', T60).should('be.visible')
    cy.contains('button', 'Add Member').should('be.visible')
    cy.contains('button', 'Reset').should('be.visible')
    cy.contains('Pending Transactions').should('be.visible')
    cy.contains('Data Pembeli').should('be.visible')
    cy.contains('Pembayaran').should('be.visible')
  })

  // WP-KASIR-002
  it('Menguji tombol Add Product', () => {
    bukaAddProduct()
    cy.get('input[placeholder="Search Product (Code/Name)"]').should('be.visible')
    cy.contains('All Categories').should('be.visible')
    cy.contains('Paket Huawei MatePad 12X').should('be.visible')
    cy.contains(/Stok Bundling: \d+ pcs/).should('be.visible')
    cy.contains('Huawei MatePad 12X 2026').should('be.visible')
    cy.contains(/Stok Total: \d+ pcs/).should('be.visible')
    cy.contains('Menampilkan 1 sampai 2 dari 2 produk').should('be.visible')
    cy.contains('Halaman 1 of 1').should('be.visible')
    cy.contains('button', 'Batal').should('be.visible')
    cy.contains('button', 'Tidak ada perubahan').should('be.visible')
    cy.contains('button', 'Batal').click()
  })

  // WP-KASIR-003
  it('Menguji pilih produk bervarian pada Add Product', () => {
    bukaAddProduct()
    cy.contains('Huawei MatePad 12X 2026').click()
    cy.contains('Variants - Huawei MatePad 12X 2026').should('be.visible')
    cy.get('input[placeholder="Search Variant"]').should('be.visible')
    cy.contains('Kembali ke produk').should('be.visible')
    cy.contains('Select All').should('be.visible')
    cy.contains('HMP12X-256').should('be.visible')
    cy.contains('Rp 8.999.000').should('be.visible')
    cy.contains('HMP12X-512').should('be.visible')
    cy.contains('Rp 9.999.000').should('be.visible')
    cy.contains('penyimpanan - 256GB').click()
    cy.contains('penyimpanan - 512GB').click()
    cy.contains('Selected').should('exist')
    cy.contains('button', /Simpan Perubahan/).click()
    cy.contains('h3', 'Huawei MatePad 12X 2026').should('be.visible')
    expandDetailVarian()
    cy.contains('penyimpanan - 256GB').should('be.visible')
    cy.contains('penyimpanan - 512GB').should('be.visible')
  })

  // WP-KASIR-004
  it('Menguji produk masuk Pending Transactions dan perhitungan total', () => {
    tambahPaket()
    tambahVarian()
    expandDetailVarian()
    cy.contains('Paket Huawei MatePad 12X').should('be.visible')
    cy.contains('Nama Varian').should('be.visible')
    cy.contains('Harga Produk').should('be.visible')
    cy.contains('Quantity').should('be.visible')
    cy.contains('Harga / pcs').should('be.visible')
    cy.contains('Total Harga').should('be.visible')
    cy.contains('Stok').should('be.visible')
    cy.contains('Rp 18.500.000').should('be.visible')
    cy.contains('Rp 8.999.000').should('be.visible')
    cy.contains('Rp 9.999.000').should('be.visible')
    cy.contains('Subtotal Harga').should('be.visible')
    cy.contains('Rp 37.498.000').should('be.visible')
  })

  // WP-KASIR-005
  it('Menguji Gunakan Diskon pada produk', () => {
    tambahPaket()
    pasangDiskon()
    cy.get('.line-through').should('exist')
    cy.contains('Rp 12.950.000').should('be.visible')
    cy.contains('Batalkan Diskon').should('be.visible')
  })

  // WP-KASIR-006
  it('Menguji pembayaran gagal saat voucher member dipakai non-member', () => {
    tambahPaket()
    pasangDiskon()
    isiPembayaran('40000000')
    konfirmasiBayar()
    cy.contains('Pembayaran Gagal', T60).should('be.visible')
    cy.contains('Diskon hanya untuk member').should('be.visible')
    cy.url().should('include', '/outlets')
    cy.contains('Paket Huawei MatePad 12X').should('be.visible')
    cy.contains('Batalkan Diskon').should('be.visible')
    cy.contains('Rp 12.950.000').should('be.visible')
  })

  // WP-KASIR-007
  it('Menguji Batalkan Diskon', () => {
    tambahPaket()
    pasangDiskon()
    cy.contains('Rp 12.950.000').should('be.visible')
    cy.contains('Batalkan Diskon').click()
    cy.contains('Rp 18.500.000').should('be.visible')
    cy.get('.line-through').should('not.exist')
    cy.contains('Batalkan Diskon').should('not.exist')
  })

  // WP-KASIR-008
  it('Menguji tombol Bayar & Cetak Struk dan modal konfirmasi', () => {
    tambahPaket()
    isiPembayaran('20000000')
    cy.intercept('POST', '**/api/transactions').as('trx')
    konfirmasiBayar()
    cy.wait('@trx').its('response.statusCode').should('eq', 200)
  })

  // WP-KASIR-009
  it('Menguji transaksi berhasil masuk Riwayat Penjualan', () => {
    tambahPaket()
    isiPembayaran('20000000')
    cy.intercept('POST', '**/api/transactions').as('trx')
    konfirmasiBayar()
    cy.wait('@trx').its('response.statusCode').should('eq', 200)
    cy.contains('Penjualan').click()
    cy.contains('a, button', 'Riwayat Penjualan').click()
    cy.url().should('include', '/riwayat-penjualan')
    cy.contains('Nama Kasir').should('be.visible')
    cy.contains('Nama Pembeli').should('be.visible')
    cy.contains('Jumlah Dibeli').should('be.visible')
    cy.contains('Total Harga').should('be.visible')
    cy.contains('Tanggal').should('be.visible')
    cy.contains('Status').should('be.visible')
    cy.contains('keonhooo').should('be.visible')
    cy.contains('Test Buyer', T60).should('be.visible')
    cy.contains('BERHASIL').should('be.visible')
  })

  // WP-KASIR-010
  it('Menguji tombol Add Member', () => {
    cy.contains('button', 'Add Member').click()
    cy.contains('Tambahkan Member').should('be.visible')
    cy.contains('Nama').should('be.visible')
    cy.contains('Email').should('be.visible')
    cy.contains('No. Telp').should('be.visible')
    cy.get('input[placeholder="Nama lengkap"]').should('be.visible')
    cy.get('input[placeholder="Email aktif"]').should('be.visible')
    cy.get('input[placeholder="0812345678910"]').should('be.visible')
    cy.contains('button', 'Buat Member').should('be.visible')
  })

  // WP-KASIR-011
  it('Menguji tombol Buat Member', () => {
    const unik = Date.now()
    cy.contains('button', 'Add Member').click()
    cy.get('input[placeholder="Nama lengkap"]').type('Member Test')
    cy.get('input[placeholder="Email aktif"]').type(`member${unik}@test.com`)
    cy.get('input[placeholder="0812345678910"]').type('081234567890')
    cy.contains('button', 'Buat Member').click()
    cy.contains(/berhasil/i).should('be.visible')
    cy.get('input[placeholder="Nama pembeli"]').should('have.value', 'Member Test')
  })
})