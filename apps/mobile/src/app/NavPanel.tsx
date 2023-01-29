import React, {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';

import {Bar, Option, OptionText} from './NavPanel.styled';

export const NavPanel = () => {
  const navigation = useContext(NavigationContext);
  const navigate = (dest: string) => navigation.navigate(dest);

  return (
    <Bar>
      <Option onPress={() => navigate('LoginScreen')}>
        <OptionText>Logowanie</OptionText>
      </Option>
      <Option onPress={() => navigate('SignUpScreen')}>
        <OptionText>Rejestracja</OptionText>
      </Option>

      <Option onPress={() => navigate('PasswordList')}>
        <OptionText>Lista haseł</OptionText>
      </Option>
    </Bar>
  );
};

export default NavPanel;
