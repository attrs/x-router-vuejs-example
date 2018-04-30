<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    @click="handleClick">
    <Icon class="ivu-load-loop" type="load-c" v-if="loading"></Icon>
    <Icon :type="icon" v-if="icon && !loading"></Icon>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
  </button>
</template>

<style lang="less">
  @import "../variables";

  .x-button {
    -webkit-appearance: none;
    color: @text-color;
    padding: 6px 10px;
    font-size: 14px;
    background-color: white;
  }
</style>

<script>
  import Icon from '../icon';
  
  const prefixCls = 'x-button';
  
  function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
    }
    return false;
  }

  export default {
    name: 'Button',
    components: { Icon },
    props: {
      type: {
        validator (value) {
          return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default']);
        }
      },
      shape: {
        validator (value) {
          return oneOf(value, ['circle', 'circle-outline']);
        }
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        }
      },
      loading: Boolean,
      disabled: Boolean,
      htmlType: {
        default: 'button',
        validator (value) {
          return oneOf(value, ['button', 'submit', 'reset']);
        }
      },
      icon: String,
      long: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showSlot: true
      };
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-long`]: this.long,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-${this.size}`]: !!this.size,
            [`${prefixCls}-loading`]: this.loading != null && this.loading,
            [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
          }
        ];
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event);
      }
    },
    mounted () {
      this.showSlot = this.$slots.default !== undefined;
    }
  };
</script>
