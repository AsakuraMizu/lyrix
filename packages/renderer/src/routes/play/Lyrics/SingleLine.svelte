<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import clsx from 'clsx';

  export let text: string;
  export let i: number;

  const index = getContext<Writable<number>>('lyrix:index');
</script>

<p class={clsx('line', i === $index && 'current')}>
  {#if text}
    {text}
  {:else}
    <br />
  {/if}
</p>

<style>
  .line {
    text-align: center;
    font-size: var(--fontSize);
  }

  .current {
    font-size: var(--fontSizeX);
  }
</style>
