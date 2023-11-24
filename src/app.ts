import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

//application route
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to Programming Hero level 2 course Assignment 2 , Student: Md Asifuzzaman Suvo',
  );
});

export default app;
