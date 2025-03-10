<template>
  <div class="inputCustom">
    <fieldset>
      <textarea
        v-if="type === 'textarea'"
        :name="name"
        :placeholder="label"
        :value="modelValue"
        @input="onInput"
        ref="textareaRef"
      ></textarea>
      <input
        v-else
        :name="name"
        :placeholder="label"
        :type="type"
        :value="modelValue"
        @input="onInput"
      />
      <legend :data-label="label"></legend>
      <label className="replacer">{{ label }}</label>
    </fieldset>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/*------------------- PROPS -------------------*/
const props = defineProps({
  modelValue: [String, Number],
  name: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
})

/*------------------- EMITS -------------------*/
const emit = defineEmits(['update:modelValue'])

/*------------------- COMPUTED -------------------*/
const computedValue = computed({
  get: () => (props.type === 'number' ? Number(props.modelValue) : props.modelValue),
  set: (value) => {
    emit('update:modelValue', props.type === 'number' ? Number(value) : value)
  },
})

/*------------------- FUNCTION -------------------*/
const onInput = (event) => {
  computedValue.value = event.target.value
}
</script>

<style scoped>
input {
  background-color: transparent;
  width: 100%;
}

[type='text'],
input:where(:not([type])),
[type='email'],
[type='url'],
[type='password'],
[type='number'],
[type='date'],
[type='datetime-local'],
[type='month'],
[type='search'],
[type='tel'],
[type='time'],
[type='week'],
[multiple],
textarea,
select,
button {
  appearance: none;
  background-color: transparent;
  border-color: unset;
  border-width: 0;
  border-radius: unset;
  padding: unset;
  font-size: unset;
  line-height: unset;
  color: inherit;
}

input:focus-visible,
[multiple]:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
}

.inputCustom {
  fieldset {
    position: relative;
    border: 1px solid gray;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:has(select:focus),
    &:has(input:focus),
    &:has(textarea:focus) {
      border-color: black;
    }

    legend {
      max-width: 0%;
      text-wrap: nowrap;
      overflow: hidden;
      font-size: 12px;
      padding: 0px 0px;
      transition: all 0.3s ease-in-out;

      &::after {
        content: attr(data-label);
        color: transparent;
      }
    }

    textarea,
    select,
    input {
      color: gray;
      font-size: 16px;
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: transparent;
      }

      &:focus,
      &:not(:placeholder-shown) {
        color: black;
      }
    }

    textarea {
      resize: none;
      width: 100%;
      min-height: 100px;
    }

    & > select:focus ~ label,
    & > input:focus ~ label,
    & > input:not(:placeholder-shown) ~ label {
      top: -50%;
      left: 14px;
      font-size: 12px;
      color: black;
      padding-left: 5px;
      padding-right: 5px;
      z-index: 3;
    }

    & > textarea:focus ~ label,
    & > textarea:not(:placeholder-shown) ~ label {
      top: -20px;
      left: 14px;
      font-size: 12px;
      color: black;
      padding-left: 5px;
      padding-right: 5px;
      z-index: 3;
    }

    & > textarea:focus ~ legend,
    & > textarea:not(:placeholder-shown) ~ legend,
    & > input:focus + legend,
    & > input:not(:placeholder-shown) + legend {
      display: block;
      padding-left: 5px;
      padding-right: 10px;
      max-width: 100%;
    }

    & > select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      padding-top: 5px;
      padding-bottom: 5px;
      width: 100%;

      option {
        padding: 20px;
        color: green;
      }
    }

    & > label {
      position: absolute;
      top: 5%;
      left: 10px;
      color: gray;
      font-size: 16px;
      transition: all 0.3s ease-in-out;
      pointer-events: none;
    }
  }
}
</style>
