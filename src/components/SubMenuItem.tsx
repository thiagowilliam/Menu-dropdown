import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuContext } from 'src/components/dls/Menu/context';

interface SubItemType {
  id: string;
  title: string;
  goTo: string;
  redirectTo?: string;
  disabledLink: boolean;
}

interface SubMenuItemProps {
  title: string;
  iconName: string;
  id: string;
  disabledLink: boolean;
  collapseMenu: boolean;
  subItems: SubItemType[];
  active: boolean; // SE O ITEM PRINCIPAL ESTÁ ATIVO
  selectedSubItem: string; // QUAL SUBITEM ESTÁ SELECIONADO
  onSubItemClick: (mainTitle: string, subTitle: string) => void;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  title,
  iconName,
  id,
  disabledLink,
  collapseMenu,
  subItems,
  active,
  selectedSubItem,
  onSubItemClick
}) => {
  const history = useHistory();
  const { updateSelectedItemTitle } = useContext(MenuContext);
  const [isExpanded, setIsExpanded] = useState(true); // Sempre expandido inicialmente

  const handleMainItemClick = () => {
    if (!disabledLink) {
      // Clique no item principal sem subitem ativo
      updateSelectedItemTitle(title);
      // Opcional: navegar para rota padrão do item principal
    }
  };

  const handleSubItemClick = (subItem: SubItemType) => {
    if (!subItem.disabledLink) {
      // ATUALIZA O CONTEXTO COM ITEM PRINCIPAL E SUBITEM
      onSubItemClick(title, subItem.title);
      
      // NAVEGA PARA A ROTA
      if (subItem.redirectTo) {
        window.open(subItem.redirectTo, '_blank');
      } else {
        history.push(subItem.goTo);
      }
    }
  };

  return (
    <div>
      {/* Item Principal */}
      <div
        onClick={handleMainItemClick}
        style={{
          backgroundColor: active ? 'var(--selected-bg-color)' : 'transparent',
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Icon name={iconName} />
        {!collapseMenu && <span>{title}</span>}
        {!collapseMenu && (
          <Icon 
            name="angle-down"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
              marginLeft: 'auto'
            }}
          />
        )}
      </div>

      {/* Subitens - Sempre visíveis quando expandido */}
      {isExpanded && !collapseMenu && (
        <div style={{ marginLeft: '24px' }}>
          {subItems.map((subItem) => (
            <div
              key={subItem.id}
              onClick={() => handleSubItemClick(subItem)}
              style={{
                // SUBITEM ATIVO BASEADO NO selectedSubItem
                backgroundColor: selectedSubItem === subItem.title 
                  ? 'var(--selected-bg-color)' 
                  : 'transparent',
                cursor: subItem.disabledLink ? 'not-allowed' : 'pointer',
                padding: '8px 12px',
                borderRadius: '6px',
                opacity: subItem.disabledLink ? 0.5 : 1,
                margin: '4px 0',
                transition: 'background-color 0.2s ease'
              }}
            >
              <span>{subItem.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenuItem;