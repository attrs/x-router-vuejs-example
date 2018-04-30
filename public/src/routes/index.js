import xrouter from 'x-router';
import main from './main';
import sub from './sub';

var router = xrouter.Router()
.get('/', main)
.get('/sub', sub);

export default router;