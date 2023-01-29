import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Container, Text} from "./Header.styled";

export const Header = () => {
  const route = useRoute();
  return (
    <Container>
      <Text>{route.name}</Text>
    </Container>
  );
};

export default Header;
