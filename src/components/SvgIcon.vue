<template>
  <svg aria-hidden="true" :style="getStyle">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
interface Props {
  name: string;
  prefix?: string;
  color?: string;
  size?: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: '#333',
  size: 16,
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const getStyle = computed((): CSSProperties => {
  const { size } = props;
  let s = `${size}`;
  s = `${s.replace('px', '')}px`;
  return {
    width: s,
    height: s,
  };
});
</script>
