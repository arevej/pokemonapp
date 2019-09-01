import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledType = styled.span`
  background: ${props => props.color}
  padding: 3px 6px;
  margin-right: 8px;
  color: #fff;
`
type PokemonTypes = 'Grass' | 'Poison' | 'Fire' | 'Flying' | 'Water' | 'Bug';
export function Type({ type }: { type: PokemonTypes }) {
  const getTypeColor = (type: PokemonTypes): string => {
    switch (type) {
      case 'Grass':
        return 'DarkGreen';
      case 'Poison':
        return 'Lime';
      case 'Fire':
        return 'Red';
      case 'Flying':
        return 'LightSkyBlue';
      case 'Water':
        return 'Blue';
      case 'Bug':
        return 'DarkGoldenrod';
      default:
        return 'black';
    }
  };
  return (
    <StyledType color={getTypeColor(type)}>{type}</StyledType>
  )
}