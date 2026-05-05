<template>
  <div class="transactions-page">
    <div class="page-header">
      <h1 class="page-title">Manajemen Transaksi</h1>
      <button class="btn btn--primary">
        <Plus :size="18" /> Tambah Transaksi
      </button>
    </div>

    <div class="table-container">
      <div class="transactions-toolbar">
        <label class="transactions-toolbar__search">
          <Search class="transactions-toolbar__search-icon" :size="16" />
          <input
            v-model="searchQuery"
            type="text"
            class="transactions-toolbar__search-input"
            placeholder="Cari deskripsi, klien..."
            @input="applySearch"
          />
        </label>

        <div class="transactions-toolbar__actions">
          <button
            class="btn btn--secondary btn--sm transactions-toolbar__action"
            type="button"
            @click="openColumnChooser"
          >
            <Columns3 :size="16" />
            Pilih Kolom
          </button>

          <button
            class="btn btn--secondary btn--sm transactions-toolbar__action"
            type="button"
            @click="exportGrid"
          >
            <Download :size="16" />
            Ekspor
          </button>
        </div>
      </div>

      <DxDataGrid
        ref="transactionsGrid"
        :data-source="allTransactions"
        :show-borders="false"
        :show-row-lines="true"
        :row-alternation-enabled="true"
        :hover-state-enabled="true"
        column-auto-width
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        column-resizing-mode="widget"
        :style="{ fontSize: '14px' }"
      >
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxSorting mode="multiple" />
        <DxSelection mode="multiple" show-check-boxes-mode="always" />
        <DxColumnChooser :enabled="true" mode="select" title="Pilih Kolom" />
        <DxColumn
          data-field="id"
          caption="No"
          :width="60"
          alignment="center"
          :allow-filtering="false"
        />
        <DxColumn
          data-field="tanggal"
          caption="Tanggal"
          data-type="date"
          format="dd/MM/yyyy"
          :width="130"
          :sort-order="'desc'"
        />
        <DxColumn data-field="deskripsi" caption="Deskripsi" :min-width="180" />
        <DxColumn
          data-field="kategori"
          caption="Kategori"
          :width="130"
          :cell-render="kategoriCellRender"
        />
        <DxColumn data-field="klien" caption="Klien/Vendor" :width="170" />
        <DxColumn
          data-field="jumlah"
          caption="Jumlah (Rp)"
          :width="170"
          alignment="right"
          data-type="number"
          :cell-render="amountCellRender"
        />
        <DxColumn
          data-field="status"
          caption="Status"
          :width="130"
          alignment="center"
          :cell-render="statusCellRender"
        />
        <DxPaging :default-page-size="10" />
        <DxPager
          :show-page-size-selector="true"
          :allowed-page-sizes="[5, 10, 25, 50]"
          :show-info="true"
          info-text="Menampilkan {0}-{1} dari {2}"
          :show-navigation-buttons="true"
        />
      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import { Plus, Search, Columns3, Download } from "lucide-vue-next";
import {
  recentTransactions,
  formatRupiah,
  statusLabels,
} from "../data/mockData";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxSorting,
  DxFilterRow,
  DxHeaderFilter,
  DxSelection,
  DxColumnChooser,
} from "devextreme-vue/data-grid";

export default {
  name: "Transactions",
  components: {
    Plus,
    Search,
    Columns3,
    Download,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxSorting,
    DxFilterRow,
    DxHeaderFilter,
    DxSelection,
    DxColumnChooser,
  },
  data() {
    const allTransactions = [
      ...recentTransactions,
      {
        id: 9,
        tanggal: "2026-04-22",
        deskripsi: "Langganan Software Adobe",
        kategori: "Pengeluaran",
        klien: "Adobe Systems",
        jumlah: -450000,
        status: "dibatalkan",
      },
      {
        id: 10,
        tanggal: "2026-04-20",
        deskripsi: "Refund Layanan Server",
        kategori: "Pemasukan",
        klien: "AWS Inc.",
        jumlah: 500000,
        status: "selesai",
      },
      {
        id: 11,
        tanggal: "2026-04-18",
        deskripsi: "Sewa Gudang April",
        kategori: "Pengeluaran",
        klien: "PT Gudang Utama",
        jumlah: -15000000,
        status: "selesai",
      },
      {
        id: 12,
        tanggal: "2026-04-15",
        deskripsi: "Proyek Redesign Website",
        kategori: "Pemasukan",
        klien: "CV Kreatif Digital",
        jumlah: 22000000,
        status: "selesai",
      },
    ];
    return {
      allTransactions,
      formatRupiah,
      statusLabels,
      searchQuery: "",
    };
  },
  methods: {
    applySearch() {
      this.$refs.transactionsGrid?.instance?.searchByText(this.searchQuery);
    },
    openColumnChooser() {
      this.$refs.transactionsGrid?.instance?.showColumnChooser();
    },
    exportGrid() {
      console.log("Export grid");
    },
    amountCellRender(cellInfo) {
      const val = cellInfo.data.jumlah;
      const color = val >= 0 ? "#16A34A" : "#E53E3E";
      const sign = val >= 0 ? "+" : "";
      return `<span style="font-weight:600;color:${color}">${sign}${formatRupiah(val)}</span>`;
    },
    kategoriCellRender(cellInfo) {
      const isIncome = cellInfo.data.kategori === "Pemasukan";
      const badgeClass = isIncome ? "badge--selesai" : "badge--terlambat";
      return `<span class="badge ${badgeClass}">${cellInfo.data.kategori}</span>`;
    },
    statusCellRender(cellInfo) {
      return `<span class="badge badge--${cellInfo.data.status}">${this.statusLabels[cellInfo.data.status]}</span>`;
    },
  },
};
</script>

<style scoped>
.transactions-page {
  margin-top: -8px;
}

.transactions-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
  flex-wrap: nowrap;
}

.transactions-toolbar__search {
  position: relative;
  flex: 1 1 320px;
  max-width: 420px;
}

.transactions-toolbar__search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.transactions-toolbar__search-input {
  width: 100%;
  height: 42px;
  padding: 0 16px 0 40px;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: 14px;
  outline: none;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.transactions-toolbar__search-input::placeholder {
  color: var(--color-text-muted);
}

.transactions-toolbar__search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-50);
}

.transactions-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.transactions-toolbar__action {
  min-height: 42px;
}

.transactions-page :deep(.page-header) {
  margin-bottom: 18px;
}

.transactions-page :deep(.page-title) {
  font-size: 1.6rem;
}

.transactions-page :deep(.btn--primary) {
  min-height: 42px;
  padding: 0 20px;
}

.transactions-page :deep(.table-container) {
  margin-top: 0;
}

.transactions-page :deep(.dx-datagrid-headers) {
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 1024px) {
  .transactions-page {
    margin-top: -4px;
  }

  .transactions-page :deep(.page-header) {
    margin-bottom: 14px;
  }

  .transactions-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .transactions-toolbar__search {
    max-width: none;
    flex-basis: auto;
  }

  .transactions-toolbar__actions {
    width: 100%;
  }

  .transactions-toolbar__action {
    flex: 1;
  }
}
</style>
