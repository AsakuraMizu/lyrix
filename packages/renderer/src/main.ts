import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/zh-cn';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale('zh-cn');

import CanvasNest from 'canvas-nest.js';
new CanvasNest(document.body);

import './index.css';
// import './stores/init';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app') || document.body,
});

export default app;
