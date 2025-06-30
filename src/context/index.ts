import { createContext } from 'react';

interface MenuContextProps {
  selectedItemTitle: string;
  updateSelectedItemTitle: (title: string) => void;
  
  // NOVA PROPRIEDADE PARA SUBITENS
  selectedSubItemTitle: string;
  updateSelectedSubItemTitle: (title: string) => void;
  
  collapsedMenu: boolean;
  setCollapsedMenu: (newState: boolean) => void;
}

export const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);