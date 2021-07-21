<script lang="ts">
  import { onMount } from 'svelte';
  import { MaterialApp } from 'svelte-materialify';
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import { ops as hOps } from '/@/stores/history';
  import { ops as sOps } from '/@/stores/settings';

  onMount(() => {
    hOps.load();
    sOps.load();
  });
</script>

<MaterialApp theme=light>
  <Router restoreScrollState={true} {routes} />
</MaterialApp>
