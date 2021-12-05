<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import clsx from 'clsx';
  import { ops } from '/@/stores/music';

  export let text: string;
  export let i: number;
  export let time: number = 0;

  const index = getContext<Writable<number>>('lyrix:index');
</script>

<p class={clsx('line', i === $index && 'current')}>
  {#if text}
    <div on:click={() => ops.seek(time * 1000)}>
      {text}
    </div>
  {:else}
    <br />
  {/if}
</p>

<style>
  .line {
    text-align: center;
    font-size: var(--fontSize);
    transition: font 0.6s ease;
  }

  .current {
    font-size: var(--fontSizeX);
  }
</style>
