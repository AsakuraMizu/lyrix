<script>
  import ScrollBar from './ScrollBar.svelte';
  import Tools from './Tools.svelte';
</script>

<div class="d-flex flex-column align-center bottom">
  <div class="bar"><ScrollBar /></div>
  <Tools />
</div>

<style>
  .bottom {
    margin-top: auto;
  }

  .bar {
    width: 800px;
    height: 50px;
  }

  @media screen and (max-width: 800px) {
    .bar {
      width: 100%;
    }
  }
</style>
