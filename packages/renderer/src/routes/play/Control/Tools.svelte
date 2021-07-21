<script lang="ts">
  import { Button, Col, Row } from 'svelte-materialify';
  import Icon from '@iconify/svelte';
  import PlayArrow from '@iconify-icons/mdi/play-arrow';
  import Pause from '@iconify-icons/mdi/pause';
  import Fullscreen from '@iconify-icons/mdi/fullscreen';
  import FullscreenExit from '@iconify-icons/mdi/fullscreen-exit';
  import { ops, playing } from '/@/stores/music';
</script>

<Row>
  <Col>
    <Button icon on:click={() => ($playing ? ops.pause() : ops.play())}>
      <Icon icon={$playing ? Pause : PlayArrow} height="auto" />
    </Button>
  </Col>
  <Col>
    <Button icon>
      <Icon icon={Fullscreen} height="auto" />
    </Button>
  </Col>
</Row>
