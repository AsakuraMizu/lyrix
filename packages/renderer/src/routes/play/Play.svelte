<script lang="ts">
  import { AppBar, Button, ProgressLinear } from 'svelte-materialify';
  import Icon from '@iconify/svelte';
  import ArrowLeft from '@iconify-icons/mdi/arrow-left';
  import Settings from '@iconify-icons/mdi/settings';
  import { pop } from 'svelte-spa-router';
  import providers from '/@/providers';
  import Player from './Player.svelte';
  import SettingsDialog from './SettingsDialog.svelte';

  export let params: { provider?: number; ref?: any } = {};
  const provider = providers[params.provider ?? 0];
  const ref = params.ref!;

  let activeSettings = false;
</script>

<AppBar>
  <div slot="icon">
    <Button icon on:click={() => pop()}>
      <Icon icon={ArrowLeft} height="auto" />
    </Button>
  </div>
  <div style="flex-grow:1" />
  <Button icon on:click={() => (activeSettings = true)}>
    <Icon icon={Settings} height="auto" />
  </Button>
</AppBar>

<SettingsDialog bind:active={activeSettings} />

{#await provider.getLrc(ref)}
  <ProgressLinear indeterminate />
{:then lrc_text}
  <Player {lrc_text} />
{/await}
