const express = require('express');
const app = express();
const userRoute = require('./src/routes/user.route')
const connectDatabase = require('./src/database/db')
const dotenv = require('dotenv')
const authRoute = require('./src/routes/auth.route')
const newsRoute = require('./src/routes/news.route')
const swaggerRoute = require('./src/routes/swagger.route')
const cors = require('cors');


dotenv.config();

const allowedOrigins = ['http://localhost:3000', 'https://api-breakingnews-jfhc.onrender.com', 'https://api-breakingnews.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

const port = process.env.PORT || 3000;

connectDatabase()
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/news', newsRoute)
app.use('/doc', swaggerRoute)

app.listen(3000, () => console.log(`Servidor rodando na porta ${port}`));