import 'reflect-metadata';
import express from 'express';
import "./database";

const app = express();

/* 
  GET => Buscar
  POST => Salvar
  PUT => Alterar
  DELETE => Deletar
  PATCH => Alteração específica
*/

app.get("/", (req, res) => {
   return res.json({message:"Hello World"})})


app.post("/", (req, res) => {
  
  // Dados a serem recebidos

  return res.json({message:"Dados foram salvos"})
})

app.listen(3333, () => console.log('Server is running!'));
