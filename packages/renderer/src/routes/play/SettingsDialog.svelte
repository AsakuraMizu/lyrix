<script lang="ts">
  import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    Dialog,
    Select,
    Slider,
  } from 'svelte-materialify';
  import { fontSize, fontSizeX, semi, ops } from '/@/stores/settings';

  export let active: boolean = false;

  const items = Array.from({ length: 10 }).map((_, i) => ({
    name: (i + 1) * 2 + 1,
    value: i + 1,
  }));

  const ok = () => {
    ops.save();
    active = false;
  };
</script>

<Dialog bind:active fullscreen>
  <Card>
    <CardTitle>设置</CardTitle>
    <CardText>
      <Slider thumb persistentThumb bind:value={$fontSize}>字体大小</Slider>
      <br />
      <Slider thumb persistentThumb bind:value={$fontSizeX}
        >字体大小（当前行）</Slider
      >
      <br />
      <Select {items} bind:value={$semi}>显示行数</Select>
    </CardText>
    <CardActions class="justify-end">
      <Button text on:click={ok}>确定</Button>
    </CardActions>
  </Card>
</Dialog>
