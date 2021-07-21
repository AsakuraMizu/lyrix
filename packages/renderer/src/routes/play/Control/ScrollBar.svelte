<script lang="ts">
  import dayjs from 'dayjs';
  import { duration, ms, ops, progress } from '/@/stores/music';

  const onWheel = (e: WheelEvent) => {
    e.stopPropagation();
    const dt = e.deltaY * 10;
    const target = $ms - dt;
    ops.seek(target);
  };

  const onMouse = (e: MouseEvent) => {
    if (!(e.buttons & 3)) return;
    const bar = e.currentTarget as HTMLDivElement;
    const x = e.pageX - bar.getBoundingClientRect().left;
    ops.seek((x / bar.clientWidth) * $duration);
  };

  const onTouch = (e: TouchEvent) => {
    const bar = e.currentTarget as HTMLDivElement;
    const x = e.changedTouches[0].pageX - bar.getBoundingClientRect().left;
    ops.seek((x / bar.clientWidth) * $duration);
  };

  function formatTime(ms: number): string {
    return dayjs.duration(Math.round(ms), 'ms').format('mm:ss');
  }
</script>

<div class="d-flex flex-row align-center flex-grow-1 bar" on:wheel={onWheel}>
  <div class="time">
    {formatTime($ms)}
  </div>
  <div
    class="flex-grow-1 bar"
    on:mousedown={onMouse}
    on:mousemove={onMouse}
    on:touchstart={onTouch}
    on:touchmove={onTouch}
  >
    <div class="d-flex layer align-center">
      <div class="midline" />
    </div>
    <div class="layer">
      <div class="progress" style={`left: ${$progress * 100}%`} />
    </div>
  </div>
  <div class="time">
    {formatTime($duration)}
  </div>
</div>

<style>
  .bar {
    position: relative;
    height: 100%;
  }

  .layer {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .midline {
    width: 100%;
    border-bottom: 1px solid grey;
  }

  .progress {
    position: absolute;
    height: 100%;
    border: 2px solid blue;

  }

  .time {
    margin: 2px;
    width: 80px;
    text-align: center;
    user-select: none;
  }
</style>
