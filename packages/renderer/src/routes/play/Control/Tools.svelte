<script lang="ts">
  import { Button, Col, Row } from 'svelte-materialify';
  import Icon from '@iconify/svelte';
  import PlayArrow from '@iconify-icons/mdi/play-arrow';
  import Pause from '@iconify-icons/mdi/pause';
  import Fullscreen from '@iconify-icons/mdi/fullscreen';
  import FullscreenExit from '@iconify-icons/mdi/fullscreen-exit';
  import { ops, playing } from '/@/stores/music';

  let fullscreen = !!document.fullscreenElement;

  const toggleFullscreen = async () => {
    if (fullscreen) {
      await document.exitFullscreen();
      fullscreen = false;
    } else {
      await document.documentElement.requestFullscreen();
      fullscreen = true;
    }
  }
</script>

<Row>
  <Col>
    <Button icon on:click={() => ($playing ? ops.pause() : ops.play())}>
      <Icon icon={$playing ? Pause : PlayArrow} height="auto" />
    </Button>
  </Col>
  <Col>
    <Button
      icon
      on:click={toggleFullscreen}
    >
      <Icon icon={fullscreen ? FullscreenExit : Fullscreen} height="auto" />
    </Button>
  </Col>
</Row>
