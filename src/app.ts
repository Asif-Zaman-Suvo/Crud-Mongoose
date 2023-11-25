import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

//application route
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Programming Hero</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
        }

        .welcome-container {
          text-align: center;
          padding: 50px;
          margin: 50px auto;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }

        h1 {
          color: #333;
        }

        p {
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="welcome-container">
        <h1>Welcome to Programming Hero Level 2 Course - Assignment 2</h1>
        <p>This is a simple web application built with Express, TypeScript, and CORS.</p>
      </div>
    </body>
  </html>
`;
  res.send(htmlContent);
});

export default app;
