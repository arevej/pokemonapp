import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { fetchForQuery } from '../fetch';
import { Type } from './Type';

const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
  }

  .specs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 50px;

    ul {
      list-style-type: none;
      padding: 0;
      flex: 1;

      li {
        margin-bottom: 10px;
        font-size: 18px;
      }
    }
  }

  .image {
    width: 400px;
    height: 400px;
  }

  .name {
    font-size: 30px;
  }

  .evolutions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
  }

  .evolutions-list {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .evolution {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30px;
    padding: 5px;
    text-decoration: none;
    cursor: pointer;
    color: #000;

    img {
      width: 200px;
      height: 200px;
    }

    span {
      font-size: 18px;
      margin-top: 10px;
    }
  }
`

const pokemonQuery = (id: String) => {
  return `
    { 
      pokemon(id: "${id}") {
        id
        number
        name
        maxCP
        maxHP
        image
        types
        evolutions {
          id
          number
          name
          maxCP
          maxHP
          image	
          types
        }
      }
    }
    `
}

type PokemonTypes = 'Grass' | 'Poison' | 'Fire' | 'Flying' | 'Water' | 'Bug';

interface Pokemon {
  id: string;
  number: string;
  name: string;
  maxCP: string;
  maxHP: string;
  image: string;
  types: Array<PokemonTypes>;
  evolutions: Array<{
    id: string;
    number: string;
    name: string;
    maxCP: string;
    maxHP: string;
    image: string;
    types: Array<PokemonTypes>;
  }>;
}

export function Pokemon({ match }: { match: any }) {
  const id = match.params.id;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchForQuery(pokemonQuery(id))
      .then(res => {
        setPokemon(res.pokemon);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const { number, name, maxCP, maxHP, image, types, evolutions } = pokemon;
  return (
    <PokemonInfo>
      <div className='info'>
        <div className='specs'>
          <h3 className='name'>{name}</h3>
          <ul>
            <li><b>ID: </b> {id}</li>
            <li><b>NUM: </b> {parseInt(number, 10)}</li>
            <li><b>maxCP: </b> {maxCP}</li>
            <li><b>maxHP: </b> {maxHP}</li>
            <li><b>TYPES: </b>
              {types.map(type =>
                <Type type={type} />
              )}
            </li>
          </ul>
        </div>
        <img className='image' src={pokemon.image} />
      </div>
      {evolutions ?
        <div className='evolutions'>
          <span><b>EVOLUTIONS</b></span>
          <div className='evolutions-list'>
            {evolutions.map(evolution =>
              <Link to={`/${evolution.id}`} className='evolution'>
                <img src={evolution.image} />
                <span>{evolution.name}</span>
              </Link>
            )}
          </div>
        </div>
        : null
      }
    </PokemonInfo >
  )
}