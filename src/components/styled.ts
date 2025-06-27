// styles.ts
import styled, { css } from 'styled-components';

interface MenuItemProps {
  active: boolean;
  collapseMenu?: boolean;
  disabledLink?: boolean;
}

// Item principal (já existente no seu código)
export const Item = styled.div<MenuItemProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  width: 90%;
  height: 44px;

  padding-left: ${({ theme }) => theme.spacings.xs};
  padding-right: ${({ theme }) => theme.spacings.xs};
  border-radius: ${({ theme }) => theme.border.lg};

  text-decoration: none;
  span {
    display: block;
    color: ${({ theme }) => theme.colors.ExperianGrey700};
    font-weight: 400;
  }

  margin-left: ${({ theme }) => theme.spacings.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.UIBlue100};
    transition: background 0.2s;

    span {
      color: ${({ theme }) => theme.colors.ExperianGrey800};
      font-weight: 600;
    }

    > div > svg path {
      fill: ${({ theme }) => theme.colors.UIBlue500};
    }
  }

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.colors.UIBlue100};
      transition: background 0.2s;

      span {
        color: ${({ theme }) => theme.colors.ExperianGrey800};
        font-weight: 600;
      }

      > div > svg path {
        fill: ${({ theme }) => theme.colors.UIBlue500};
      }
    `}

  ${({ disabledLink }) =>
    disabledLink &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
      text-decoration: none;
      pointer-events: none;
    `}

  ${({ collapseMenu, theme }) =>
    collapseMenu &&
    css`
      max-width: ${theme.breakpoints.atlas.hideMenu};
      justify-content: center;
      width: 60%;
      padding-left: 0px;

      span {
        display: none;
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.atlas.hideMenu}) {
    justify-content: center;
    width: 60%;
    padding-left: 0px;

    span {
      display: none;
    }
  }
`;

// Container do submenu com animação
export const ContainerSubMenu = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 2px solid ${({ theme }) => theme.colors.ExperianGrey2_300};
  
  /* Animação suave de altura */
  max-height: ${props => props.isExpanded ? '500px' : '0'};
  opacity: ${props => props.isExpanded ? '1' : '0'};
  overflow: hidden;
  
  transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out;
  transition-delay: ${props => props.isExpanded ? '0s' : '0.1s'};

  /* Animação de slide down */
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Aplicar animação quando expandido */
  animation: ${props => props.isExpanded ? 'slideDown 0.2s ease-out' : 'none'};
`;

// Subitem com animação individual
export const SubItem = styled(Item)<MenuItemProps & { delay?: number }>`
  padding-left: ${({ theme }) => theme.spacings.md};
  margin-left: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  border-left: 3px solid transparent;
  position: relative;
  left: -2px;
  cursor: pointer;
  
  /* Animação de entrada */
  transform: translateX(${props => props.delay !== undefined ? '0' : '-20px'});
  opacity: ${props => props.delay !== undefined ? '1' : '0'};
  transition: all 0.2s ease-out;
  transition-delay: ${props => props.delay || 0}s;

  /* Efeitos de hover específicos para subitens */
  &:hover {
    border-left-color: ${({ theme }) => theme.colors.UIBlue500};
    background: ${({ theme }) => theme.colors.ExperianGrey2_100};
    
    span {
      color: ${({ theme }) => theme.colors.ExperianGrey800};
      font-weight: 600;
    }
  }

  /* Estado ativo para subitens */
  ${({ active }) =>
    active &&
    css`
      border-left-color: ${({ theme }) => theme.colors.UIBlue500};
      background: ${({ theme }) => theme.colors.UIBlue100};
      
      span {
        color: ${({ theme }) => theme.colors.ExperianGrey800};
        font-weight: 600;
      }
    `}

  /* Responsividade */
  @media (max-width: ${({ theme }) => theme.breakpoints.atlas.hideMenu}) {
    justify-content: center;
    width: 60%;
    padding-left: 0px;
    margin-left: 20px;

    span {
      display: ${({ collapseMenu }) => collapseMenu ? 'none' : 'block'};
    }
  }

  /* Respeitar preferências de movimento reduzido */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
    transform: none;
  }
`;