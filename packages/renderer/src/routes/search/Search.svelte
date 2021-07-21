<script lang="ts">
  import { AppBar, Button, Tab, Tabs } from 'svelte-materialify';
  import Icon from '@iconify/svelte';
  import ArrowLeft from '@iconify-icons/mdi/arrow-left';
  import { pop } from 'svelte-spa-router';
  import providers from '/@/providers';
  import Result from '../search/Result.svelte';

  export let params: { keyword?: string } = {};
  const keyword = params.keyword ?? '忐忑';

  let provider = 0;
</script>

<AppBar>
  <div slot="icon">
    <Button icon on:click={() => pop()}>
      <Icon icon={ArrowLeft} height="auto" />
    </Button>
  </div>
  <span slot="title">{keyword}</span>
  <div slot="extension">
    <Tabs bind:value={provider} fixedTabs>
      <div slot="tabs">
        {#each providers as p}
          <Tab>{p.name}</Tab>
        {/each}
      </div>
    </Tabs>
  </div>
</AppBar>

<Result {provider} {keyword} />
