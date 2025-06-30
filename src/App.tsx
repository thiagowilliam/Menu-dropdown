import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuContext } from 'src/components/dls/Menu/context';

const ContextualMenu: React.FC = () => {
  const location = useLocation();
  const { 
    selectedItemTitle, 
    updateSelectedItemTitle,
    selectedSubItemTitle,
    updateSelectedSubItemTitle,
    collapsedMenu,
    setCollapsedMenu 
  } = useContext(MenuContext);

  // Função para lidar com clique em item principal SEM subitens
  const handleMainItemClick = (title: string) => {
    updateSelectedItemTitle(title);
    updateSelectedSubItemTitle(''); // Limpa subitem quando clica em item principal
  };

  // Função para lidar com clique em subitem
  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    updateSelectedItemTitle(mainTitle);
    updateSelectedSubItemTitle(subTitle);
  };

  const renderMenuByRoute = () => {
    switch (location.pathname) {
      case ROUTES.DASHBOARD:
        return (
          <MenuItemContainer
            collapseMenu={collapsedMenu}
            selectedIndex={0}
          >
            <MenuItem
              title="Dashboard"
              iconName="grid-modules"
              goTo={ROUTES.DASHBOARD}
              collapseMenu={collapsedMenu}
              onClick={() => handleMainItemClick('Dashboard')}
              // ITEM ATIVO APENAS SE FOR O SELECIONADO E NÃO HOUVER SUBITEM
              active={selectedItemTitle === 'Dashboard' && !selectedSubItemTitle}
            />
          </MenuItemContainer>
        );

      case ROUTES.TRANSACTIONS_LIST:
        return (
          <MenuItemContainer
            collapseMenu={collapsedMenu}
            selectedIndex={1}
          >
            <MenuItem
              title="Transações"
              iconName="bolt"
              goTo={ROUTES.TRANSACTIONS_LIST}
              collapseMenu={collapsedMenu}
              onClick={() => handleMainItemClick('Transações')}
              active={selectedItemTitle === 'Transações' && !selectedSubItemTitle}
            />
          </MenuItemContainer>
        );

      // ROUTES QUE TÊM SUBITENS (RULES)
      case ROUTES.BLOCKLIST:
      case ROUTES.DEVICE_SUSPICIOUS:
      case ROUTES.EXPORTS:
        return (
          <MenuItemContainer
            collapseMenu={collapsedMenu}
            selectedIndex={2}
          >
            <SubMenuItem
              title="Regras"
              iconName="clipboard"
              id="rules"
              disabledLink={false}
              collapseMenu={collapsedMenu}
              // PASSA OS SUBITENS
              subItems={[
                {
                  id: 'profile',
                  title: 'Perfil',
                  goTo: ROUTES.DASHBOARD,
                  redirectTo: LEGACY_CONTEXTUAL_ALLOWLIST_URL,
                  disabledLink: true
                },
                {
                  id: 'security',
                  title: 'Segurança',
                  goTo: ROUTES.BLOCKLIST,
                  disabledLink: false
                },
                {
                  id: 'notifications',
                  title: 'Notificações',
                  goTo: '/notifications',
                  disabledLink: false
                }
              ]}
              // ITEM PRINCIPAL ATIVO APENAS SE FOR SELECIONADO E NÃO HOUVER SUBITEM
              active={selectedItemTitle === 'Regras' && !selectedSubItemTitle}
              // PASSA A FUNÇÃO DE CALLBACK
              onSubItemClick={handleSubItemClick}
              // ESTADO ATUAL DO SUBITEM SELECIONADO
              selectedSubItem={selectedSubItemTitle}
            />
          </MenuItemContainer>
        );

      default:
        return (
          <MenuItemContainer
            collapseMenu={collapsedMenu}
            selectedIndex={0}
          >
            <MenuItem
              title="Dashboard"
              iconName="grid-modules"
              goTo={ROUTES.DASHBOARD}
              collapseMenu={collapsedMenu}
              onClick={() => handleMainItemClick('Dashboard')}
              active={selectedItemTitle === 'Dashboard' && !selectedSubItemTitle}
            />
          </MenuItemContainer>
        );
    }
  };

  return (
    <div>
      {renderMenuByRoute()}
    </div>
  );
};

export default ContextualMenu;