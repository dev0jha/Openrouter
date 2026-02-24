import { Elysia } from "elysia";

import { app as apiKeysApp } from "./modules/apikeys";
import { app as authApp } from "./modules/auth";
import { app as modelsApp } from "./modules/models";
import { app as paymentApp } from "./modules/payment";

const app = new Elysia()
  .use(authApp)
  .use(modelsApp)
  .use(apiKeysApp)
  .use(paymentApp)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
