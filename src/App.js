import { useEffect, useState } from "react";
import "./css/App.css";

const mock = [
  {
    id: 388,
    name: "Zeep Xanflorp",
    status: "Alive",
    species: "Humanoid",
    type: "Microverse inhabitant",
    gender: "Male",
    origin: {
      name: "Rick's Battery Microverse",
      url: "https://rickandmortyapi.com/api/location/24",
    },
    location: {
      name: "Rick's Battery Microverse",
      url: "https://rickandmortyapi.com/api/location/24",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/388.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/17"],
    url: "https://rickandmortyapi.com/api/character/388",
    created: "2018-01-10T19:56:57.790Z",
  },
];

function App() {
  const [conteudo, setConteudo] = useState(<></>);

  function traduzirStatus(status){
    switch (status) {
      case 'Alive':
          return 'Vivo'
      case 'unknown':
          return 'Desconhecido'
      case 'Dead':
          return 'Morto'
      default:
        return status
    }
  }

  function traduzirSpecies(species){
    switch (species) {
      case 'Human':
          return 'Humano'
      default:
        return species
    }
  }

  function traduzirGender(gender){
    switch (gender) {
      case 'Male':
          return 'Macho'
      case 'Female':
          return 'Fêmea'
      case 'unknown':
          return 'Desconhecido'
      default:
        return gender
    }
  }

  async function carregarTodosOsPersonagens() {
    const retorno = await fetch(
      "https://rickandmortyapi.com/api/character",
      { method: "GET" }
    )
    .then((reponse) => reponse.json())

    // console.log(retorno)

    return retorno.results

    return mock;
  }

  async function listaPersonagem() {
    const todosPersonagens = await carregarTodosOsPersonagens();

    return todosPersonagens.map((personagem) => (
      <div className="card char">
        <img src={personagem.image} alt={personagem.name}></img>
        <p>
          <strong>{personagem.name}</strong>
        </p>
        <p>
          <strong>Espécie: </strong>
          {traduzirSpecies(personagem.species)}
        </p>
        <p>
          <strong>Genero: </strong>
          {traduzirGender(personagem.gender)}
        </p>
        <p>
          <strong>Participação: </strong>
          {personagem.episode.map(ep => (
            <span key={personagem.name+(ep.split('episode/')[1])}>
              Ep-{(ep.split('episode/')[1])}
            </span>
          ))}
        </p>
        <p>
          <strong>Status: </strong>
          {traduzirStatus(personagem.status)}
        </p>
      </div>
    ));
  }

  useEffect(() => {
    async function carregar() {
      setConteudo(await listaPersonagem());
    }
    carregar();
  }, []);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className="lista-principal">{conteudo}</div>
    </div>
  );
}

export default App;
