import 'reflect-metadata';
import express from 'express';
import "./database";
import { router } from './router';

/* 
  GET => Buscar
  POST => Salvar
  PUT => Alterar
  DELETE => Deletar
  PATCH => Alteração específica
*/

const app = express();

app.use(express.json());
app.use(router);

export { app };