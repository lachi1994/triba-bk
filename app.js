require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const chalk = require('chalk');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./settings/swagger');
const connectDB = require('./db/dbConnect');

const jsDocs = swaggerJsDoc(swaggerOptions);

connectDB();

const app = express();

const { errorHandlerMiddleware, notFoundMiddleware } = require('./middlewares');

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(jsDocs));

app.get('/', (_req, res) => res.send(`
<kbd style=
    "
     display: flex;
     justify-content: center;
     margin-top: 50px;
     font-size: 2rem;
     color: green;
    "
  >
    Yup!!! ✔️ Server's is running successfully.
</kbd>
`));
morgan.token('id', (req) => req.params.id);
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':id :body :method :url :response-time'));
app.use('/api/v1', require('./routes'));
app.use('/api/v1/auth', require('./routes/api/user'));

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(chalk.blue(`Connected to Port ${port}`)));
