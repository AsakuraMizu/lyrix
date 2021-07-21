<script lang="ts">
  import {
    Col,
    List,
    ListItem,
    Overlay,
    ProgressCircular,
    Row,
  } from 'svelte-materialify';
  import { push } from 'svelte-spa-router';
  import dayjs from 'dayjs';
  import providers from '/@/providers';
  import type { Entry, Provider } from '/@/providers';
  import { ops } from '/@/stores/history';

  export let provider: number;
  export let keyword: string;

  const g = providers[provider].search(keyword);
  let results: Entry[] = [];
  const getNext = async () => {
    pending = true;
    for (let i = 1; i <= 10; ++i) {
      const t = await g.next();
      if (t.done) break;
      results = [...results, t.value];
    }
    pending = false;
  };

  let pending = false;
  getNext();

  const play = (r: Entry) => {
    ops.add({
      name: r.name,
      artist: r.artist,
      provider,
      time: dayjs().unix(),
      $ref: r.$ref,
    });
    push(`/play/${provider}/${r.$ref}`);
  };
</script>

<div class="d-flex justify-center">
  <div class="px600 elevation-5">
    <List>
      {#each results as r}
        <ListItem on:click={() => play(r)}>
          {r.name}
          <span slot="subtitle">{r.artist}</span>
        </ListItem>
      {/each}
      {#if !pending}
        <ListItem on:click={() => getNext()}>更多</ListItem>
      {/if}
    </List>
    <Overlay active={pending}>
      <ProgressCircular indeterminate size={70} />
    </Overlay>
  </div>
</div>
