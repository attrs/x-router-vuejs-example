import xrouter from 'x-router';
import components from './components';
import routes from './routes';

export default xrouter()
  .set('view target', '#page')
  .use(routes)
  .listen();
