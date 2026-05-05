<template>
  <div :class="['kpi-card', `kpi-card--${color}`]">
    <div class="kpi-card__header">
      <div :class="['kpi-card__icon', `kpi-card__icon--${color}`]">
        <component :is="iconComponent" :size="22" />
      </div>
    </div>
    <div class="kpi-card__label">{{ label }}</div>
    <div class="kpi-card__value">{{ value }}</div>
    <span :class="['kpi-card__trend', `kpi-card__trend--${direction}`]">
      <component
        :is="direction === 'up' ? TrendingUp : TrendingDown"
        :size="14"
      />
      {{ direction === "up" ? "+" : "-" }}{{ trend }}%
    </span>
  </div>
</template>

<script>
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Landmark,
  BadgeDollarSign,
} from "lucide-vue";

export default {
  name: "KpiCard",
  props: {
    label: String,
    value: [String, Number],
    trend: [String, Number],
    direction: {
      type: String,
      validator: (val) => ["up", "down"].includes(val),
    },
    color: {
      type: String,
      default: "green",
      validator: (val) => ["green", "yellow", "orange", "blue"].includes(val),
    },
  },
  data() {
    return {
      TrendingUp,
      TrendingDown,
    };
  },
  computed: {
    iconComponent() {
      const map = {
        green: Wallet,
        yellow: CreditCard,
        orange: Landmark,
        blue: BadgeDollarSign,
      };
      return map[this.color] || Wallet;
    },
  },
};
</script>
