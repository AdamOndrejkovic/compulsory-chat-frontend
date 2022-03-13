<template>
  <div class="text-gray-700 relative" :class="width">
    <span class="flex">
      <label v-if="label" :for="name">{{ label }}</label>
    </span>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      autocomplete="off"
      :tabindex="tabindex"
      :readonly="readonly"
      @input="(e) => update(e)"
      @blur="onBlur"
      @keydown.esc="clear"
    />
    <div v-if="validation && !value" class="bg-red-500 text-white rounded-b px-2 py-px text-xs">
      {{ label }} is required
    </div>
    <error-message v-show="isError" :message="errorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue"
import { ErrorMessage, useField } from "vee-validate";

export const isError = (meta: { valid: boolean; touched: boolean }): boolean => {
  return !meta.valid && meta.touched
}

export default defineComponent({
  components: {
    ErrorMessage,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"text" | "number">,
      default: "text",
    },
    min: {
      type: String,
      default: "",
    },
    max: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "w-88",
    },
    validation: {
      type: Boolean,
      default: false,
    },
    blur: {
      type: Boolean,
      default: false,
    },
    disableValidator: {
      type: Boolean,
      default: false,
    },
    standalone: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["update:modelValue", "update:blur"],
  setup(props, { emit }) {
    const { value, handleChange, handleBlur, errorMessage, meta } = useField(props.name, undefined, {
      initialValue: props.modelValue,
      standalone: props.standalone,
      validateOnMount: !props.disableValidator,
      validateOnValueUpdate: false,
    })

    const onBlur = () => {
      handleBlur()
      if (props.blur) {
        emit("update:blur")
      }
    }

    const update = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target) {
        handleChange(target.value)
        emit("update:modelValue", target.value)
      }
    }

    const clear = () => {
      handleChange("")
      emit("update:modelValue", "")
    }

    return {
      clear,
      handleChange,
      onBlur,
      errorMessage,
      value,
      update,
      isError: computed(() => isError(meta)),
    }
  },
})
</script>

