"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application route
app.use('/api', user_route_1.UserRoutes);
app.get('/', (req, res) => {
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
exports.default = app;
