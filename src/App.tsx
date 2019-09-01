import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Pokemon } from './components/Pokemon';
import { PokemonList } from './components/PokemonList';

const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  font-family: Helvetica;
`

const Header = styled.div`
  padding: 50px 0;
`

const Logo = styled.div`
  font-size: 46px;
  font-weight: 600;

  a {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`

class App extends React.Component {
  render() {
    return (
      <Router>
        <Container>
          <Header>
            <Logo>
              <Link to='/'>
                Pokémon App
              </Link>
            </Logo>
          </Header>
          <Route path='/' exact component={PokemonList} />
          <Route path='/:id' exact component={Pokemon} />
        </Container>
      </Router>
    );
  }
}

export default App;
