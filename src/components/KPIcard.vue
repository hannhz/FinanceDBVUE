<template>
  <div class="kpi-card">
    <div class="kpi-card__label">{{ label }}</div>
    <div class="kpi-card__value" :style="{ color: color }">{{ value }}</div>
    <div
      v-if="trend"
      class="kpi-card__trend"
      :class="`kpi-card__trend--${direction}`"
    >
      {{ trend }}
    </div>
  </div>
</template>

<script>
export default {
  name: "KpiCard",
  props: {
    label: String,
    value: String,
    trend: String,
    direction: {
      type: String,
      default: "up",
      validator: (val) => ["up", "down"].includes(val),
    },
    color: {
      type: String,
      default: "var(--color-text-primary)",
    },
  },
};
</script>

<style scoped>
.kpi-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.2s;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.kpi-card__label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.kpi-card__value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
}

.kpi-card__trend {
  font-size: 0.75rem;
  font-weight: 500;
}

.kpi-card__trend--up {
  color: var(--color-success);
}

.kpi-card__trend--down {
  color: var(--color-danger);
}
</style>
