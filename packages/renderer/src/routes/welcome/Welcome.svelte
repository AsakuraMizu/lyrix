<script lang="ts">
  import { Button, TextField } from 'svelte-materialify';
  import Icon from '@iconify/svelte';
  import Search from '@iconify-icons/mdi/search';
  import { push } from 'svelte-spa-router';
  import Hero from '/@/assets/hero.png';
  import History from './History.svelte';

  let keyword = '';
  let error = false;

  const search = () => {
    error = !keyword;
    if (!error) {
      push(`/search/${keyword}`);
    }
  }
</script>

<div class="d-flex flex-column align-center">
  <img src={Hero} alt="hero" width="400px" />
  <div class="px800">
    <TextField {error} filled clearable bind:value={keyword}>
      <div slot="append">
        <Button icon on:click={search}>
          <Icon icon={Search} height=auto />
        </Button>
      </div>
      Search
    </TextField>
  </div>
  <History />
</div>
