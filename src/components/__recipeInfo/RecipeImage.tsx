import React from 'react';
import styled from 'styled-components/native';
import { vh } from '../../assets/styles/theme';

export default function RecipeImage({ uri }: RecipeImageProps) {
  return <RecipeImageContainer source={{ uri: uri }} resizeMode="cover" />;
}

const RecipeImageContainer = styled.Image`
  width: 100%;
  height: ${40 * vh}px;
`;

interface RecipeImageProps {
  uri: string;
  recipeid: number;
  place: number;
}
