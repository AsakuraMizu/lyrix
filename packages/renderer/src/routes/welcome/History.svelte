<script lang="ts">
  import { List, ListItem } from 'svelte-materialify';
  import { push } from 'svelte-spa-router';
  import dayjs from 'dayjs';
  import { entries, ops } from '/@/stores/history';
  import type { HistoryEntry } from '/@/stores/history';

  const play = (e: HistoryEntry) => {
    ops.add({
      ...e,
      time: dayjs().unix(),
    });
    push(`/play/${e.provider}/${e.$ref}`);
  };
</script>

<div class="px600 elevation-5">
  <List>
    {#each $entries.sort((a, b) => b.time - a.time) as e}
      <ListItem on:click={() => play(e)}>
        {e.name}
        <span slot="subtitle">{e.artist}</span>
        <span slot="append">{dayjs.unix(e.time).locale('zh-cn').fromNow()}</span>
      </ListItem>
    {/each}
  </List>
</div>
