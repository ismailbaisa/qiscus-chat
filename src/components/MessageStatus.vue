<template>
  <div>
    <p class="status">
      {{ statusText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed:{
    statusText() {
      let symbol = '⏱️'
      switch (this.status) {
        case 'sent':
          symbol = '✔';
          break;
        case 'delivered':
          symbol = '✔✔';
          break;
        case 'read':
          symbol = '✔✔';
          break;
        case 'pending':
          symbol = '⏱️';
          break;
        case 'failed':
          symbol = '✗';
          break;
        default:
          break;
      }
      return symbol;
    }
  }
}
</script>

<style>

</style>