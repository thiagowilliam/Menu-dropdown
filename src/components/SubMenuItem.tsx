import React, { useState, useContext } from 'react';
import { MenuContext } from 'src/components/dls/Menu/context';
import { useWindowDimensions } from 'src/utils/widthScreen/validateScreenWidth';
import { Item } from './styles';
import IconX from 'src/components/dls/IconX';

export interface SubMenuItemProps {
  title: string;
  iconname: string;
  id: string;
  Badge?: JSX.Element;
  disabledLink?: boolean;
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
    if (subItem.redirectTo === '') {
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
        active={menuContext.selectedItemTitle === title || 
                subItems.some(item => menuContext.selectedItemTitle === item.title)}
        collapseMenu={menuContext.collapseMenu}
        onClick={handleMainItemClick}
        to={''} // Não navega diretamente
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
        
        {/* Seta indicadora */}
        <IconX 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          color={theme.colors.ExperianGrey2_400}
          style={{ 
            marginLeft: 'auto',
            transition: 'transform 0.2s ease'
          }}
        />
        
        {Badge && !menuContext.collapseMenu && width > 1300 && (
          <div style={{ marginLeft: 'auto' }}>
            {Badge}
          </div>
        )}
      </Item>

      {/* Subitens */}
      {isExpanded && subItems.map((subItem) => (
        <Item
          key={subItem.id}
          id={subItem.id}
          title={subItem.title}
          active={menuContext.selectedItemTitle === subItem.title}
          collapseMenu={menuContext.collapseMenu}
          onClick={() => handleSubItemClick(subItem)}
          to={subItem.goTo || ''}
          disabledLink={subItem.disabledLink}
          style={{
            paddingLeft: '60px', // Indentação para mostrar hierarquia
            backgroundColor: '#f8f9fa' // Cor diferente para subitens
          }}
        >
          <span style={{ color: '#303030' }}>
            {subItem.title}
          </span>
          
          {subItem.Badge && !menuContext.collapseMenu && width > 1300 && (
            <div style={{ marginLeft: 'auto' }}>
              {subItem.Badge}
            </div>
          )}
        </Item>
      ))}
    </>
  );
};

export default SubMenuItem;