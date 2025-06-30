import React, { useState } from 'react';
import { MenuContext } from 'src/components/dls/Menu/context';
import { Container } from './styles';

type MenuProps = {
  children: React.ReactNode[];
};

const Menu: React.FC<MenuProps> = ({ children }) => {
  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  const [selectedSubItemTitle, setSelectedSubItemTitle] = useState(''); // NOVO STATE
  
  const updateSelectedItemTitle = (title: string): void => {
    setSelectedItemTitle(title);
  };
  
  // NOVA FUNÇÃO PARA SUBITENS
  const updateSelectedSubItemTitle = (title: string): void => {
    setSelectedSubItemTitle(title);
  };
  
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  
  return (
    <MenuContext.Provider
      value={{
        setCollapsedMenu,
        collapsedMenu,
        selectedItemTitle,
        updateSelectedItemTitle,
        selectedSubItemTitle,        // NOVO
        updateSelectedSubItemTitle,  // NOVO
      }}
    >
      <Container>{children}</Container>
    </MenuContext.Provider>
  );
};

export default Menu;