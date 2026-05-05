export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export const formatRupiahShort = (amount) => {
  const abs = Math.abs(amount);
  if (abs >= 1e9) return `Rp ${(abs / 1e9).toFixed(1)}M`;
  if (abs >= 1e6) return `Rp ${(abs / 1e6).toFixed(1)}JT`;
  return `Rp ${abs.toLocaleString('id-ID')}`;
};

export const statusLabels = {
  selesai: 'Selesai',
  belum: 'Belum Bayar',
  terlambat: 'Terlambat',
  dibatalkan: 'Dibatalkan',
  draft: 'Draft',
};

export const kpiData = [
  { id: 1, label: 'Total Pendapatan', value: 885000000, trend: '+8.2%', direction: 'up', color: '#16A34A' },
  { id: 2, label: 'Total Pengeluaran', value: 456000000, trend: '+2.1%', direction: 'up', color: '#E53E3E' },
  { id: 3, label: 'Laba Bersih', value: 429000000, trend: '+15.3%', direction: 'up', color: '#0F766E' },
  { id: 4, label: 'Invoice Belum Lunas', value: 127500000, trend: '-3.2%', direction: 'down', color: '#D69E2E' },
];

export const cashFlowData = [
  { tanggal: '01/05', pemasukan: 28000000, pengeluaran: 18200000 },
  { tanggal: '03/05', pemasukan: 42000000, pengeluaran: 21500000 },
  { tanggal: '05/05', pemasukan: 35000000, pengeluaran: 19800000 },
  { tanggal: '07/05', pemasukan: 39000000, pengeluaran: 22400000 },
  { tanggal: '09/05', pemasukan: 31000000, pengeluaran: 17600000 },
  { tanggal: '11/05', pemasukan: 45000000, pengeluaran: 23200000 },
  { tanggal: '13/05', pemasukan: 38000000, pengeluaran: 19500000 },
];

export const recentTransactions = [
  { id: 1, tanggal: '2026-05-15', deskripsi: 'Invoice PT Maju Jaya - Proyek A', kategori: 'Pemasukan', klien: 'PT Maju Jaya', jumlah: 42500000, status: 'selesai' },
  { id: 2, tanggal: '2026-05-14', deskripsi: 'Pembelian Material Baja', kategori: 'Pengeluaran', klien: 'CV Baja Kuat', jumlah: -12500000, status: 'selesai' },
  { id: 3, tanggal: '2026-05-12', deskripsi: 'Gaji Karyawan Mei', kategori: 'Pengeluaran', klien: 'Internal', jumlah: -68500000, status: 'selesai' },
  { id: 4, tanggal: '2026-05-10', deskripsi: 'Invoice CV Kreasi Digital', kategori: 'Pemasukan', klien: 'CV Kreasi Digital', jumlah: 28000000, status: 'belum' },
  { id: 5, tanggal: '2026-05-08', deskripsi: 'Sewa Gedung Bulan Mei', kategori: 'Pengeluaran', klien: 'PT Properti Sentosa', jumlah: -25000000, status: 'selesai' },
  { id: 6, tanggal: '2026-05-05', deskripsi: 'Pembayaran Listrik & Air', kategori: 'Pengeluaran', klien: 'PLN/PDAM', jumlah: -4850000, status: 'selesai' },
  { id: 7, tanggal: '2026-05-03', deskripsi: 'Invoice PT Sejahtera Abadi', kategori: 'Pemasukan', klien: 'PT Sejahtera Abadi', jumlah: 53000000, status: 'terlambat' },
  { id: 8, tanggal: '2026-05-01', deskripsi: 'Langganan Software', kategori: 'Pengeluaran', klien: 'Microsoft', jumlah: -2750000, status: 'dibatalkan' },
];

export const expenses = [
  { id: 1, tanggal: '2026-05-14', deskripsi: 'Pembelian Material Baja', kategori: 'Material', jumlah: 12500000, bukti: true },
  { id: 2, tanggal: '2026-05-12', deskripsi: 'Gaji Karyawan Mei', kategori: 'Gaji', jumlah: 68500000, bukti: false },
  { id: 3, tanggal: '2026-05-08', deskripsi: 'Sewa Gedung Bulan Mei', kategori: 'Sewa', jumlah: 25000000, bukti: true },
  { id: 4, tanggal: '2026-05-05', deskripsi: 'Pembayaran Listrik & Air', kategori: 'Utilitas', jumlah: 4850000, bukti: true },
  { id: 5, tanggal: '2026-05-01', deskripsi: 'Langganan Software', kategori: 'Lainnya', jumlah: 2750000, bukti: false },
  { id: 6, tanggal: '2026-04-28', deskripsi: 'Perawatan Servis AC', kategori: 'Operasional', jumlah: 1800000, bukti: true },
];

export const expenseCategories = [
  { label: 'Gaji', value: 68500000, color: '#3182CE', percentage: 48 },
  { label: 'Material', value: 12500000, color: '#38B2AC', percentage: 9 },
  { label: 'Sewa', value: 25000000, color: '#ED8936', percentage: 17 },
  { label: 'Utilitas', value: 4850000, color: '#9F7AEA', percentage: 3 },
  { label: 'Operasional', value: 1800000, color: '#F6AD55', percentage: 1 },
  { label: 'Lainnya', value: 2750000, color: '#A0AEC0', percentage: 2 },
];

export const invoices = [
  { id: 'INV-001', klien: 'PT Maju Jaya', tanggalBuat: '2026-05-01', jatuhTempo: '2026-05-31', jumlah: 42500000, status: 'selesai' },
  { id: 'INV-002', klien: 'CV Kreasi Digital', tanggalBuat: '2026-05-05', jatuhTempo: '2026-06-05', jumlah: 28000000, status: 'belum' },
  { id: 'INV-003', klien: 'PT Sejahtera Abadi', tanggalBuat: '2026-04-20', jatuhTempo: '2026-05-20', jumlah: 53000000, status: 'terlambat' },
  { id: 'INV-004', klien: 'CV Kreatif Digital', tanggalBuat: '2026-04-15', jatuhTempo: '2026-05-15', jumlah: 22000000, status: 'selesai' },
  { id: 'INV-005', klien: 'PT Teknologi Nusantara', tanggalBuat: '2026-05-10', jatuhTempo: '2026-06-10', jumlah: 76500000, status: 'belum' },
];