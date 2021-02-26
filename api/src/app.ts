import 'reflect-metadata';
import express from 'express';
import createConnection from "./database";
import { router } from './router';

/* 
  GET => Buscar
  POST => Salvar
  PUT => Alterar
  DELETE => Deletar
  PATCH => Alteração específica
*/

createConnection()

const app = express();

app.use(express.json());
app.use(router);

export { app };