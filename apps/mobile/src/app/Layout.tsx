import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavPanel from "./NavPanel";
import Header from "./Header";
import {Content, Main} from "./Layout.styled";

export const Layout = ({children}: any) => {
  return (
    <SafeAreaView>
      <Main>
        <Header />
        <Content>{children}</Content>
        <NavPanel />
      </Main>
    </SafeAreaView>
  );
};

export default Layout;
