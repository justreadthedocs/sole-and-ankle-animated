import React from 'react';
import styled from 'styled-components/macro';

import { QUERIES, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import Icon from '../Icon';
import UnstyledButton from '../UnstyledButton';
import SuperHeader from '../SuperHeader';
import MobileMenu from '../MobileMenu';
import VisuallyHidden from '../VisuallyHidden';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <DesktopNav>
          <NavLinkWithFlipUpEffect href='/sale'>Sale</NavLinkWithFlipUpEffect>
          <NavLinkWithFlipUpEffect href='/new'>
            New&nbsp;Releases
          </NavLinkWithFlipUpEffect>
          <NavLinkWithFlipUpEffect href='/men'>Men</NavLinkWithFlipUpEffect>
          <NavLinkWithFlipUpEffect href='/women'>Women</NavLinkWithFlipUpEffect>
          <NavLinkWithFlipUpEffect href='/kids'>Kids</NavLinkWithFlipUpEffect>
          <NavLinkWithFlipUpEffect href='/collections'>
            Collections
          </NavLinkWithFlipUpEffect>
        </DesktopNav>
        <MobileActions>
          <ShoppingBagButton>
            <Icon id='shopping-bag' />
            <VisuallyHidden>Open cart</VisuallyHidden>
          </ShoppingBagButton>
          <UnstyledButton>
            <Icon id='search' />
            <VisuallyHidden>Search</VisuallyHidden>
          </UnstyledButton>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon id='menu' />
            <VisuallyHidden>Open menu</VisuallyHidden>
          </UnstyledButton>
        </MobileActions>
        <Filler />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  border-bottom: 1px solid var(--color-gray-300);
  overflow: auto;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
    border-top: 4px solid var(--color-gray-900);
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px 48px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const MobileActions = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
  }

  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const LogoWrapper = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  transform: translateX(-2px);
`;

const Filler = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const FlippableNavLink = styled(NavLink)`
  overflow: hidden;
  position: relative;
`;

const FlippableNavLinkFixedText = styled.span`
  @media (prefers-reduced-motion: no-preference) {
    transition: opacity 0s ease-out 175ms;

    ${NavLink}:hover &, ${NavLink}:focus-visible & {
      opacity: 0;
      transition-delay: 0ms;
    }
  }
`;

const FlippableNavLinkFlippedTexts = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 175ms ease-out;

    ${NavLink}:hover &, ${NavLink}:focus-visible & {
      transform: translateY(-50%);
    }
  }

  > :last-child {
    font-weight: 700;
  }
`;

const NavLinkWithFlipUpEffect = ({ href, children }) => {
  return (
    <FlippableNavLink href={href}>
      <FlippableNavLinkFixedText>{children}</FlippableNavLinkFixedText>
      <FlippableNavLinkFlippedTexts aria-hidden='true'>
        <span>{children}</span>
        <span>{children}</span>
      </FlippableNavLinkFlippedTexts>
    </FlippableNavLink>
  );
};

export default Header;
