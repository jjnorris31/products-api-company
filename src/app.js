import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes'
import { createRoles } from './libs/initialSetup';
import dotenv from 'dotenv';


const app = express();
createRoles();
dotenv.config();

// setting a const for app
app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json())
app.listen(process.env.PORT);

app.get('/', (req, res) => {
	res.json({
		author: app.get('pkg').name,
		description: app.get('pkg').description,
		version: app.get('pkg').version
	});
});

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

export default app;