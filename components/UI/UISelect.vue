<template>
  <div ref="selectRef" :class="{ _open: isOpen }" @click="toggleSelect">
    <input
      class="m-select__field"
      type="hidden"
      :disabled="disabled"
      :required="required"
      :value="initialCurrentText?.value"
    />
    <div class="m-select__toggle">
      <span class="m-select__current">
        {{
          options?.find((option) => option.value === modelValue)?.text ||
          placeholder
        }}
      </span>
    </div>
    <div v-if="isOpen" class="m-select__dropdown">
      <div
        v-for="option in options"
        :key="option.text"
        :class="[
          'm-select__option',
          { selected: initialCurrentText === option },
        ]"
        @click="selectOption(option)"
      >
        <span>{{ option.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
const selectRef = ref<HTMLDivElement>();
const props = defineProps({
  options: {
    type: Array as PropType<
      | {
          text?: string;
          value?: string;
        }[]
      | undefined
    >,
    required: true,
  },
  rules: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  initialCurrentText: {
    type: Object as PropType<{
      text?: string;
      value?: string;
    }>,
    default: () => null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const modelValue = defineModel<string>();
const emits = defineEmits(['input']);
const isOpen = ref(false);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
};
const selectOption = (option: typeof props.initialCurrentText) => {
  // console.log('option ', option);
  // initialCurrentText.value = option;
  modelValue.value = option.value;
  isOpen.value = false;
};
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && selectRef.value.contains(event.target as Node)) return;
  isOpen.value = false;
};
</script>
