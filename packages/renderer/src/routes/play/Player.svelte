<script lang="ts">
  import { onMount } from 'svelte';
  import { ops } from '/@/stores/music';
  import Control from './Control/Control.svelte';
  import Lyrics from './Lyrics/Lyrics.svelte';

  export let lrc_text: string;

  onMount(() => {
    ops.pause();
    ops.seek(0);
  });
</script>

<div class="root">
  <div class="lyrics">
    <Lyrics {lrc_text} />
  </div>
  <div class="control">
    <Control />
  </div>
</div>

<style>
  .root {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .control {
    position: absolute;
    bottom: 0;
  }
</style>
