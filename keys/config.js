import prod from './config.prod.js';
import dev from './config.dev.js';

export default process.env.NODE_ENV == 'production' ?  prod : dev;