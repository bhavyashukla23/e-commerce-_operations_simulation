require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require('./routes/order-routes');
const errorHandler = require('./middlewares/errorHandler-middleware');
const rateLimitMiddleware = require('./middlewares/rateLimit-middleware');
const logRequestMiddleware = require('./middlewares/logRequest-middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimitMiddleware);
app.use(logRequestMiddleware);

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
