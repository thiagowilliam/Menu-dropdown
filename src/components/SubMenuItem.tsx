// SubMenuItem/index.tsx
import React, { useState, useContext } from 'react';
import { MenuContext } from 'src/components/dls/Menu/context';
import { useWindowDimensions } from 'src/utils/widthScreen/validateScreenWidth';
import { Item, ContainerSubMenu, SubItem } from './styles';
import IconX from 'src/components/dls/IconX';
import theme from 'src/styles/theme';

export interface SubMenuItemProps {
  title: string;
  iconname: string;
  id: string;
  Badge?: JSX.Element;
  disabledLink?: boolean;
  collapseMenu?: boolean;
  subItems: Array<{
    id: string;
    title: string;
    goTo?: string;
    redirectTo?: string;
    Badge?: JSX.Element;
    disabledLink?: boolean;
  }>;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  title,
  iconname,
  id,
  Badge,
  disabledLink = false,
  collapseMenu = false,
  subItems
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuContext = useContext(MenuContext);
  const { width } = useWindowDimensions();

  const handleMainItemClick = () => {
    if (!disabledLink) {
      setIsExpanded(!isExpanded);
      menuContext.updateSelectedItemTitle(title);
    }
  };

  const handleSubItemClick = (subItem: any) => {
    if (subItem.redirectTo && subItem.redirectTo !== '') {
      // Navegar programaticamente se necessário
      // browser.openLink(subItem.redirectTo);
    } else {
      menuContext.updateSelectedItemTitle(subItem.title);
    }
    
    // Fechar submenu em telas menores
    if (width < 1300) {
      menuContext.collapseMenu();
    }
  };

  return (
    <>
      {/* Item Principal */}
      <Item
        id={id}
        title={title}
        active={
          menuContext.selectedItemTitle === title || 
          subItems.some(item => menuContext.selectedItemTitle === item.title)
        }
        collapseMenu={collapseMenu}
        onClick={handleMainItemClick}
        // to='' // Removido o to pois está causando erro
        disabledLink={disabledLink}
      >
        <IconX 
          name={iconname} 
          color={theme.colors.ExperianGrey2_400} 
        />
        <span style={{ 
          color: '#303030', 
          flex: 1 
        }}>
          {title}
        </span>
        
        {/* Seta indicadora com animação */}
        <IconX 
          name='chevron-down'
          color={theme.colors.ExperianGrey2_400}
          style={{ 
            marginLeft: 'auto',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out'
          }}
        />
        
        {Badge && !collapseMenu && width > 1300 && (
          <div style={{ marginLeft: 'auto' }}>
            {Badge}
          </div>
        )}
      </Item>

      {/* Subitens com animação */}
      <ContainerSubMenu isExpanded={isExpanded}>
        {subItems.map((subItem, index) => (
          <SubItem
            key={subItem.id}
            id={subItem.id}
            title={subItem.title}
            active={menuContext.selectedItemTitle === subItem.title}
            collapseMenu={collapseMenu}
            onClick={() => handleSubItemClick(subItem)}
            goTo={subItem.goTo || '#'} // Usando goTo ao invés de to
            disabledLink={subItem.disabledLink}
            delay={index * 0.05} // Delay escalonado
          >
            <span style={{ color: '#303030' }}>
              {subItem.title}
            </span>
            
            {subItem.Badge && !collapseMenu && width > 1300 && (
              <div style={{ marginLeft: 'auto' }}>
                {subItem.Badge}
              </div>
            )}
          </SubItem>
        ))}
      </ContainerSubMenu>
    </>
  );
};

export default SubMenuItem;