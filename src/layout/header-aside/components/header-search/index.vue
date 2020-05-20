<template>
  <el-button  @click="handleClick">
    <d2-icon name="search"/>
  </el-button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
