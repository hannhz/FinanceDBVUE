<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Laporan Keuangan</h1>
    </div>

    <!-- Period selector -->
    <div class="filter-bar" style="margin-bottom: 20px">
      <span
        style="
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-secondary);
        "
        >Periode:</span
      >
      <input type="month" class="filter-bar__input" v-model="startPeriod" />
      <span style="color: var(--color-text-muted)">â€”</span>
      <input type="month" class="filter-bar__input" v-model="endPeriod" />
      <button class="btn btn--primary btn--sm" @click="generateReport">
        Generate
      </button>
    </div>

    <!-- Report Type Tabs -->
    <div style="display: flex; gap: 12px; margin-bottom: 28px">
      <button
        v-for="rt in reportTypes"
        :key="rt.id"
        @click="activeReport = rt.id"
        :style="{
          flex: 1,
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          border: `2px solid ${
            activeReport === rt.id
              ? 'var(--color-primary)'
              : 'var(--color-border)'
          }`,
          background:
            activeReport === rt.id
              ? 'var(--color-primary-50)'
              : 'var(--color-surface)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }"
      >
        <component
          :is="rt.icon"
          :size="22"
          :style="{
            color:
              activeReport === rt.id
                ? 'var(--color-primary)'
                : 'var(--color-text-muted)',
          }"
        />
        <span
          :style="{
            fontWeight: 600,
            fontSize: '14px',
            color:
              activeReport === rt.id
                ? 'var(--color-primary)'
                : 'var(--color-text-secondary)',
          }"
          >{{ rt.label }}</span
        >
      </button>
    </div>

    <!-- Monthly Trend Chart -->
    <div class="chart-container" style="margin-bottom: 28px">
      <div class="chart-container__title" style="margin-bottom: 8px">
        Tren Bulanan
      </div>
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
        <DxValueAxis>
          <DxLabel :customize-text="customizeAxisLabel" />
        </DxValueAxis>
        <DxLegend
          vertical-alignment="top"
          horizontal-alignment="center"
          marker-size="12"
        />
        <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
      </DxChart>
    </div>

    <!-- Report Content (Profit & Loss) -->
    <div class="chart-container" style="padding: 32px">
      <div
        style="
          text-align: center;
          margin-bottom: 28px;
          border-bottom: 2px solid var(--color-text-primary);
          padding-bottom: 20px;
        "
      >
        <div
          style="
            font-size: 13px;
            color: var(--color-text-secondary);
            margin-bottom: 4px;
            font-weight: 500;
          "
        >
          CV. SEJAHTERA ABADI EKATAMA
        </div>
        <div style="font-size: 20px; font-weight: 700; margin-bottom: 4px">
          LAPORAN LABA / RUGI
        </div>
        <div style="font-size: 13px; color: var(--color-text-muted)">
          Periode: {{ startPeriod }} â€” {{ endPeriod }}
        </div>
      </div>

      <!-- Pendapatan -->
      <div style="margin-bottom: 24px">
        <div
          style="
            font-size: 14px;
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: 12px;
            text-transform: uppercase;
          "
        >
          Pendapatan
        </div>
        <div
          v-for="(item, idx) in plData.pendapatan"
          :key="idx"
          style="
            display: flex;
            justify-content: space-between;
            padding: 8px 16px;
            font-size: 14px;
            color: var(--color-text-secondary);
          "
        >
          <span>{{ item.label }}</span>
          <span style="font-variant-numeric: tabular-nums">{{
            formatRupiah(item.value)
          }}</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 700;
            border-top: 1px solid var(--color-border);
            margin-top: 4px;
            color: #16a34a;
          "
        >
          <span>Total Pendapatan</span>
          <span style="font-variant-numeric: tabular-nums">{{
            formatRupiah(totalPendapatan)
          }}</span>
        </div>
      </div>

      <!-- Beban -->
      <div style="margin-bottom: 24px">
        <div
          style="
            font-size: 14px;
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: 12px;
            text-transform: uppercase;
          "
        >
          Beban
        </div>
        <div
          v-for="(item, idx) in plData.beban"
          :key="idx"
          style="
            display: flex;
            justify-content: space-between;
            padding: 8px 16px;
            font-size: 14px;
            color: var(--color-text-secondary);
          "
        >
          <span>{{ item.label }}</span>
          <span style="font-variant-numeric: tabular-nums">{{
            formatRupiah(item.value)
          }}</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 700;
            border-top: 1px solid var(--color-border);
            margin-top: 4px;
            color: #e53e3e;
          "
        >
          <span>Total Beban</span>
          <span style="font-variant-numeric: tabular-nums">{{
            formatRupiah(totalBeban)
          }}</span>
        </div>
      </div>

      <!-- Laba Bersih -->
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          background: labaBersih >= 0 ? '#F0FFF4' : '#FFF5F5',
          borderRadius: 'var(--radius-md)',
          fontSize: '18px',
          fontWeight: 700,
          color: labaBersih >= 0 ? '#16A34A' : '#E53E3E',
          border: `1px solid ${labaBersih >= 0 ? '#C6F6D5' : '#FED7D7'}`,
        }"
      >
        <span>LABA BERSIH</span>
        <span style="font-variant-numeric: tabular-nums">{{
          formatRupiah(labaBersih)
        }}</span>
      </div>
    </div>

    <!-- Export -->
    <div style="display: flex; gap: 12px; margin-top: 20px">
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
import { Download, FileText, BarChart3, Wallet } from "vue-feather-icons";
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
    FileText,
    BarChart3,
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
        { id: "pl", label: "Laba / Rugi", icon: BarChart3 },
        { id: "bs", label: "Neraca Keuangan", icon: FileText },
        { id: "cf", label: "Arus Kas", icon: Wallet },
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
      // implementasi fetch data laporan nanti
      console.log("Generate report", this.startPeriod, this.endPeriod);
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

