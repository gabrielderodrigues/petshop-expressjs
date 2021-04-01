const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
  atualizarBanco: () => {
    // Converte o JS object atualizado em JSON e sobrescreve o db-pets.json de forma sincrona
    let petsAtualizado = JSON.stringify(bancoDados, null, 2);
    fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
  },
  listarPets: () => {
    let textoListaPets = "PETSHOP \n"

    bancoDados.pets.forEach((pet) => {
    textoListaPets += (`${pet.nome}, ${pet.idade} anos, ${pet.peso}Kg, ${pet.tipo}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado': 'não vacinado'}\n`);
      pet.servicos.forEach((servico) => {
        textoListaPets += (`${servico.data} - ${servico.nome}`);
      })
    })
    return textoListaPets
  },
  vacinarPets: (pet) => {
    let { vacinado, nome } = pet; 
    if(!vacinado) {
      vacinado = true;
      console.log(`${nome} acabou de ser vacinado.`);
    } else {
      console.log(`${nome} foi vacinado anteriormente.`);
    }
  },
  campanhaVacina: () => {
    console.log("Campanha de vacina 2021");
    console.log("vacinando...");

    let petVacinadosCampanha = 0;

    bancoDados.pets = bancoDados.pets.map((pet) => {
      if (!pet.vacinado) {
       vacinarPet(pet);
        petVacinadosCampanha++;
      }
      return pet;
    })
  },
  adicionarPet: (...novosPets) => {
    novosPets.forEach((novoPet) => {
      bancoDados.pets.push(novoPet);
    })
    
    petshop.atualizarBanco();
    novosPets.forEach((pet) => {
      console.log(`${pet.nome} foi adicionado com sucesso!`);
    })
  },
  darBanhoPet: (pet) => {
    const { servicos, nome } = pet;
    servicos.push({
      servico: 'banho',
      data: moment().format("L-LTS")
    })
    console.log(`${nome} já tomou banho.`)
  },
  tosarPet: (pet) => {
    const { servicos, nome } = pet;
    servicos.push({
      servico: "tosar",
      data: moment().format("L-LTS")
    });
      console.log(`${nome} já foi tosado.`)  
  },
  apararUnhasPet: (pet) => {
    const { servicos, nome } = pet;
    servicos.push({
      servico: "unha",
      data: moment().format("L - LTS")
    });
    console.log(`${nome} está de unhas aparadas!`);
  } ,
  atenderCliente: (pet, servico) => {
    console.log(`Olá, ${pet.nome}`);
    servico(pet);
    console.log('Até mais!');
  },
  buscarPet: (nomePet) => {
    let petEncontrado = bancoDados.pets.find((pet) => {
      return pet.nome == nomePet;
    });
    return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
  },
  filtrarTipoPet: (tipoPet) => {
    // && E - AND
    // || OU - OR
    // == verifica valores iguais
    // === verifica valores e tipos iguais
    let petsEncontrados = bancoDados.pets.filter((pet) => {
      return pet.tipo == tipoPet;
    });
    
    return petsEncontrados;
  },
  clientePremium: (pet) => {
    // let nome = pet.nome;
    let {nome} = pet;
    
    let nServicos = pet.servicos.length;
    
    if (nServicos > 5) {
      console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
    } else {
      console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
    }
  },
  contatoTutor: (pet) => {
    let {nome, tutor, contato} = pet;
        
    return `Tutor: ${tutor}
    Contato: ${contato}
    Pet: ${nome}`;
  },
  filtrarTutor: (nomeTutor) => {
    let petsTutor = bancoDados.pets.filter((pet) => {
      return pet.tutor == nomeTutor;
    });
        
    console.log(`Pets do tutor ${nomeTutor}:`)
    petsTutor.forEach((pet) => {
      console.log(`${pet.nome} - ${pet.tipo}`)
    })
  }  
}

module.exports = petshop;