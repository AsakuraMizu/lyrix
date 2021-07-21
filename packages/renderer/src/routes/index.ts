import Welcome from './welcome/Welcome.svelte';
import Search from './search/Search.svelte';
import Play from './play/Play.svelte';

const routes = {
  '/': Welcome,
  '/search/:keyword': Search,
  '/play/:provider/:ref': Play,
};

export default routes;
