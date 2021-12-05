<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { flip } from 'svelte/animate';
  import { Lrc, Runner } from 'lrc-kit';
  import { duration, ms } from '/@/stores/music';
  import { fontSize, fontSizeX, semi } from '/@/stores/settings';
  import SingleLine from './SingleLine.svelte';

  export let lrc_text: string;

  const lrc = Lrc.parse(lrc_text);
  const runner = new Runner(lrc);

  const preload = () => {
    let maxt = 0;
    lrc.lyrics.forEach((l) => {
      if (l.timestamp > maxt) {
        maxt = l.timestamp;
      }
    });
    duration.set(maxt * 1000);
  };
  preload();

  const index = writable(-1);
  $: {
    runner.timeUpdate($ms / 1000);
    index.set(runner.curIndex());
  }
  setContext('lyrix:index', index);

  runner.timeUpdate
</script>

<div style={`--fontSize: ${$fontSize}px; --fontSizeX: ${$fontSizeX}px`}>
  {#each Array.from({ length: $semi - $index }) as _, i}
    <SingleLine text="" i={$index === -1 && i === 0 ? -1 : -2} />
  {/each}
  {#each runner.getLyrics() as l, i (l.timestamp)}
    <div animate:flip={{ duration: 600 }} hidden={i < $index - $semi || i > $index + $semi}>
      <SingleLine text={l.content} {i} time={l.timestamp} />
    </div>
  {/each}
  {#each Array.from({ length: $semi - (lrc.lyrics.length - $index - 1) }) as _}
    <SingleLine text="" i={-2} />
  {/each}
</div>
