import { app } from './app';

const PRODUCTION_PORT = process.env.DATABASE_URL;
const DEVELOPMENT_PORT = 5000;

app.listen(PRODUCTION_PORT || DEVELOPMENT_PORT);
