<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Dashboard Keuangan</h1>
      <div class="date-text">{{ formattedDate }}</div>
    </div>

    <div class="kpi-grid">
      <KpiCard
        v-for="kpi in kpiData"
        :key="kpi.id"
        :label="kpi.label"
        :value="formatRupiahShort(kpi.value)"
        :trend="kpi.trend"
        :direction="kpi.direction"
        :color="kpi.color"
      />
    </div>

    <div class="chart-container mb-6">
      <div class="chart-header">
        <div class="chart-container__title">Tren Arus Kas</div>
        <select class="filter-bar__select">
          <option>30 Hari Terakhir</option>
          <option>90 Hari Terakhir</option>
          <option>Tahun Ini</option>
        </select>
      </div>

      <DxChart
        id="cashFlowChart"
        :data-source="cashFlowData"
        palette="['#38B2AC', '#FC8181']"
        :style="{ height: '280px' }"
      >
        <DxCommonSeriesSettings argument-field="tanggal" type="splinearea">
          <DxPoint :visible="true" :size="8" />
        </DxCommonSeriesSettings>
        <DxSeries
          value-field="pemasukan"
          name="Pemasukan"
          color="#38B2AC"
          :opacity="0.3"
        />
        <DxSeries
          value-field="pengeluaran"
          name="Pengeluaran"
          color="#FC8181"
          :opacity="0.3"
        />
        <DxArgumentAxis>
          <DxLabel :rotation-angle="0" />
        </DxArgumentAxis>
        <DxValueAxis>
          <DxLabel :customize-text="customizeValueAxisLabel" />
        </DxValueAxis>
        <DxLegend
          vertical-alignment="top"
          horizontal-alignment="center"
          marker-size="12"
        />
        <DxTooltip
          :enabled="true"
          :customize-tooltip="customizeTooltip"
          shared
        />
      </DxChart>
    </div>

    <div class="table-container">
      <div class="table-container__header">
        <span class="table-container__title">Transaksi Terakhir</span>
        <button class="btn btn--ghost btn--sm" @click="goToTransactions">
          Lihat Semua <ArrowRight :size="14" />
        </button>
      </div>

      <DxDataGrid
        :data-source="recentTransactions"
        :show-borders="false"
        :show-row-lines="true"
        :row-alternation-enabled="true"
        :hover-state-enabled="true"
        column-auto-width
        :style="{ fontSize: '14px' }"
      >
        <DxSorting mode="multiple" />
        <DxPaging :default-page-size="8" />
        <DxColumn
          data-field="tanggal"
          caption="Tanggal"
          data-type="date"
          format="dd/MM/yyyy"
          :width="120"
          :sort-order="'desc'"
        />
        <DxColumn data-field="deskripsi" caption="Deskripsi" />
        <DxColumn data-field="kategori" caption="Kategori" :width="130" />
        <DxColumn data-field="klien" caption="Klien/Vendor" :width="160" />
        <DxColumn
          data-field="jumlah"
          caption="Jumlah (Rp)"
          :width="160"
          alignment="right"
          :cell-render="amountCellRender"
        />
        <DxColumn
          data-field="status"
          caption="Status"
          :width="120"
          alignment="center"
          :cell-render="statusCellRender"
        />
      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import KpiCard from "../components/KpiCard.vue";
import { ArrowRight } from "lucide-vue-next";
import {
  kpiData,
  recentTransactions,
  cashFlowData,
  formatRupiahShort,
  formatRupiah,
  statusLabels,
} from "../data/mockData";
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxValueAxis,
  DxCommonSeriesSettings,
  DxLegend,
  DxTooltip,
  DxPoint,
  DxLabel,
} from "devextreme-vue/chart";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSorting,
} from "devextreme-vue/data-grid";

export default {
  name: "Dashboard",
  components: {
    KpiCard,
    ArrowRight,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxLegend,
    DxTooltip,
    DxPoint,
    DxLabel,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSorting,
  },
  data() {
    return {
      kpiData,
      recentTransactions,
      cashFlowData,
      formatRupiahShort,
      statusLabels,
    };
  },
  computed: {
    formattedDate() {
      return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
  methods: {
    goToTransactions() {
      this.$router.push("/transaksi");
    },
    customizeValueAxisLabel(e) {
      return formatRupiahShort(e.value);
    },
    customizeTooltip(pointInfo) {
      return {
        text: `${pointInfo.seriesName}: ${formatRupiah(pointInfo.value)}`,
      };
    },
    amountCellRender(cellInfo) {
      const val = cellInfo.data.jumlah;
      const color = val >= 0 ? "#16A34A" : "#E53E3E";
      const sign = val >= 0 ? "+" : "";
      return `<span style="font-weight:600;font-variant-numeric:tabular-nums;color:${color}">${sign}${formatRupiah(val)}</span>`;
    },
    statusCellRender(cellInfo) {
      const status = cellInfo.data.status;
      return `<span class="badge badge--${status}">${this.statusLabels[status]}</span>`;
    },
  },
};
</script>

<style scoped>
.date-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.chart-container__title {
  font-weight: 600;
  font-size: 1rem;
}
</style>
