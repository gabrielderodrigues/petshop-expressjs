// servidor e rotas
const express = require('express');
const petshop = require('./petshop');
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor está sendo executado...')
});

// console.log(petshop.listarPets());

app.get('/pets', (request, response) => {
  return response.send(petshop.listarPets());
})

app.post('/pets', (request, response) => {
  const { nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos } = request.body;

  const newPet = {
    nome,
    tipo,
    idade,
    raca,
    peso,
    tutor,
    contato,
    vacinado,
    servicos
  };

  return response.json(petshop.adicionarPet(newPet));
})

app.get('/pets/:nome', (request, response) => {
  const { nome } = request.params;

  const findPet = petshop.buscarPet(nome);

  if (!findPet) {
    return response.status(400).json({ error: 'Não foi possível encontrar o pet.'})
  }

  return response.json(findPet);
})
