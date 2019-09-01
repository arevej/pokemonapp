import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { fetchForQuery } from '../fetch';
import { Type } from './Type';

const StyledPokemonList = styled.table`
  table-layout: auto  ;
  width: 100%;
  margin-bottom: 50px;  
`

const PokemonListItem = styled.tr`
  &:hover {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
  }

  .image {
    width: 100px;
    height: 100px;
    padding: 20px 20px;
  }

  .name {
    padding: 0;
    font-size: 28px;
    font-weight: 600;
  }

  .link {
    margin-right: 20px;
    cursor: pointer;
    padding-bottom: 1px;
    text-decoration: none;
    color: #000;

    &:hover {
      border-bottom: 1px solid #000;
    }
  }

  .column-info {
    margin: 10px 0;
  }
`

const pokemonsQuery = `
  {
    pokemons(first: 10) {
      id
      number
      name
      maxCP
      maxHP
      image
      types
    }
  }
  `;

type PokemonTypes = 'Grass' | 'Poison' | 'Fire' | 'Flying' | 'Water' | 'Bug';

type Pokemons = Array<{
  id: string;
  number: string;
  name: string;
  maxCP: string;
  maxHP: string;
  image: string;
  types: Array<PokemonTypes>;
}>;

interface ListPokemon {
  id: string;
  number: string;
  name: string;
  maxCP: string;
  maxHP: string;
  image: string;
  types: Array<PokemonTypes>;
}

export function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemons | null>(null);

  useEffect(() => {
    fetchForQuery(pokemonsQuery)
      .then(res => {
        setPokemons(res.pokemons);
      })
      .catch(error => console.error(error));
  }, [])

  if (!pokemons) {
    return <p>Loading ...</p>
  }

  return (
    <div>
      <StyledPokemonList>
        {
          pokemons.map((pokemon: ListPokemon) =>
            <PokemonListItem key={pokemon.id}>
              <td>
                <img className="image" src={pokemon.image} />
              </td>
              <td className="name">{pokemon.name}</td>
              <td><b>ID: </b>{pokemon.id}</td>
              <td><b>NUM: </b>{parseInt(pokemon.number, 10)}</td>
              <td>
                <span className="column-info">
                  <b>maxCP: </b> {pokemon.maxCP}
                </span>
                <br />
                <span className="column-info">
                  <b>maxHP: </b>{pokemon.maxHP}
                </span>
              </td>
              <td><b>TYPES: </b>
                {pokemon.types.map(type =>
                  <Type type={type} />
                )}
              </td>
              <td>
                <Link to={`/${pokemon.id}`} className="link">
                  More Info
                </Link>
              </td>
            </PokemonListItem>
          )}
      </StyledPokemonList>
    </div>
  )
}
