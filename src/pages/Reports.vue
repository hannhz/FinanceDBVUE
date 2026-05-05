<template>
  <div>
    <div class="page-header"><h1 class="page-title">Laporan Keuangan</h1></div>

    <div class="filter-bar mb-4">
      <span class="filter-label">Periode:</span>
      <input type="month" class="filter-bar__input" v-model="startPeriod" />
      <span>—</span>
      <input type="month" class="filter-bar__input" v-model="endPeriod" />
      <button class="btn btn--primary btn--sm" @click="generateReport">
        Generate
      </button>
    </div>

    <div class="report-tabs mb-6">
      <button
        v-for="rt in reportTypes"
        :key="rt.id"
        @click="activeReport = rt.id"
        :class="[
          'report-tab',
          { 'report-tab--active': activeReport === rt.id },
        ]"
      >
        <component :is="rt.iconComponent" :size="22" />
        <span>{{ rt.label }}</span>
      </button>
    </div>

    <div class="chart-container mb-6">
      <div class="chart-container__title mb-2">Tren Bulanan</div>
      <DxChart :data-source="monthlySummary" :style="{ height: '260px' }">
        <DxCommonSeriesSettings
          argument-field="bulan"
          type="bar"
          :bar-padding="0.3"
        />
        <DxSeries value-field="pendapatan" name="Pendapatan" color="#38B2AC" />
        <DxSeries value-field="beban" name="Beban" color="#FC8181" />
        <DxSeries
          value-field="laba"
          name="Laba Bersih"
          color="#3182CE"
          type="spline"
        />
        <DxArgumentAxis />
        <DxValueAxis
          ><DxLabel :customize-text="customizeAxisLabel"
        /></DxValueAxis>
        <DxLegend
          vertical-alignment="top"
          horizontal-alignment="center"
          marker-size="12"
        />
        <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
      </DxChart>
    </div>

    <div class="chart-container report-content">
      <div class="report-header">
        <div class="company-name">CV. SEJAHTERA ABADI EKATAMA</div>
        <div class="report-title">LAPORAN LABA / RUGI</div>
        <div class="report-period">
          Periode: {{ startPeriod }} — {{ endPeriod }}
        </div>
      </div>

      <div class="report-section">
        <div class="section-title">Pendapatan</div>
        <div
          v-for="(item, idx) in plData.pendapatan"
          :key="idx"
          class="report-row"
        >
          <span>{{ item.label }}</span
          ><span>{{ formatRupiah(item.value) }}</span>
        </div>
        <div class="report-row total-row" style="color: #16a34a">
          <span>Total Pendapatan</span
          ><span>{{ formatRupiah(totalPendapatan) }}</span>
        </div>
      </div>

      <div class="report-section">
        <div class="section-title">Beban</div>
        <div v-for="(item, idx) in plData.beban" :key="idx" class="report-row">
          <span>{{ item.label }}</span
          ><span>{{ formatRupiah(item.value) }}</span>
        </div>
        <div class="report-row total-row" style="color: #e53e3e">
          <span>Total Beban</span><span>{{ formatRupiah(totalBeban) }}</span>
        </div>
      </div>

      <div
        class="laba-box"
        :class="{
          'laba-positive': labaBersih >= 0,
          'laba-negative': labaBersih < 0,
        }"
      >
        <span>LABA BERSIH</span><span>{{ formatRupiah(labaBersih) }}</span>
      </div>
    </div>

    <div class="export-buttons">
      <button class="btn btn--primary">
        <Download :size="16" /> Unduh PDF
      </button>
      <button class="btn btn--secondary">
        <Download :size="16" /> Unduh Excel
      </button>
      <button class="btn btn--secondary">
        <Download :size="16" /> Unduh CSV
      </button>
    </div>
  </div>
</template>

<script>
import { Download, BarChart3, FileText, Wallet } from "lucide-vue-next";
import { formatRupiah, formatRupiahShort } from "../data/mockData";
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxValueAxis,
  DxCommonSeriesSettings,
  DxLegend,
  DxTooltip,
  DxLabel,
} from "devextreme-vue/chart";

export default {
  name: "Reports",
  components: {
    Download,
    BarChart3,
    FileText,
    Wallet,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxLegend,
    DxTooltip,
    DxLabel,
  },
  data() {
    return {
      activeReport: "pl",
      startPeriod: "2026-01",
      endPeriod: "2026-05",
      reportTypes: [
        { id: "pl", label: "Laba / Rugi", iconComponent: BarChart3 },
        { id: "bs", label: "Neraca Keuangan", iconComponent: FileText },
        { id: "cf", label: "Arus Kas", iconComponent: Wallet },
      ],
      plData: {
        pendapatan: [
          { label: "Pendapatan Usaha", value: 850000000 },
          { label: "Pendapatan Lain-lain", value: 35000000 },
        ],
        beban: [
          { label: "Beban Gaji", value: 225000000 },
          { label: "Beban Operasional", value: 95000000 },
          { label: "Beban Material", value: 45000000 },
          { label: "Beban Pajak", value: 63750000 },
        ],
      },
      monthlySummary: [
        {
          bulan: "Jan",
          pendapatan: 160000000,
          beban: 82000000,
          laba: 78000000,
        },
        {
          bulan: "Feb",
          pendapatan: 175000000,
          beban: 88000000,
          laba: 87000000,
        },
        {
          bulan: "Mar",
          pendapatan: 190000000,
          beban: 95000000,
          laba: 95000000,
        },
        {
          bulan: "Apr",
          pendapatan: 180000000,
          beban: 92000000,
          laba: 88000000,
        },
        {
          bulan: "Mei",
          pendapatan: 180000000,
          beban: 71750000,
          laba: 108250000,
        },
      ],
      formatRupiah,
      formatRupiahShort,
    };
  },
  computed: {
    totalPendapatan() {
      return this.plData.pendapatan.reduce((s, i) => s + i.value, 0);
    },
    totalBeban() {
      return this.plData.beban.reduce((s, i) => s + i.value, 0);
    },
    labaBersih() {
      return this.totalPendapatan - this.totalBeban;
    },
  },
  methods: {
    generateReport() {
      console.log("Generate", this.startPeriod, this.endPeriod);
    },
    customizeAxisLabel(e) {
      return formatRupiahShort(e.value);
    },
    customizeTooltip(pointInfo) {
      return {
        text: `${pointInfo.seriesName}: ${formatRupiah(pointInfo.value)}`,
      };
    },
  },
};
</script>

<style scoped>
.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}
.report-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
}
.report-tab {
  flex: 1;
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.report-tab--active {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}
.report-tab--active span {
  color: var(--color-primary);
  font-weight: 600;
}
.report-tab span {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-secondary);
}
.report-content {
  padding: 32px;
}
.report-header {
  text-align: center;
  margin-bottom: 28px;
  border-bottom: 2px solid var(--color-text-primary);
  padding-bottom: 20px;
}
.company-name {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}
.report-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}
.report-period {
  font-size: 13px;
  color: var(--color-text-muted);
}
.report-section {
  margin-bottom: 24px;
}
.section-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  color: var(--color-text-primary);
}
.report-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-text-secondary);
}
.total-row {
  border-top: 1px solid var(--color-border);
  margin-top: 4px;
  font-weight: 700;
}
.laba-box {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: var(--radius-md);
  font-size: 18px;
  font-weight: 700;
}
.laba-positive {
  background: #f0fff4;
  color: #16a34a;
  border: 1px solid #c6f6d5;
}
.laba-negative {
  background: #fff5f5;
  color: #e53e3e;
  border: 1px solid #fed7d7;
}
.export-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
</style>
