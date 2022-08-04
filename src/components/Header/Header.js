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
          <NavLinkWithAuraEffect href='/sale'>Sale</NavLinkWithAuraEffect>
          <NavLinkWithAuraEffect href='/new'>
            New&nbsp;Releases
          </NavLinkWithAuraEffect>
          <NavLinkWithAuraEffect href='/men'>Men</NavLinkWithAuraEffect>
          <NavLinkWithAuraEffect href='/women'>Women</NavLinkWithAuraEffect>
          <NavLinkWithAuraEffect href='/kids'>Kids</NavLinkWithAuraEffect>
          <NavLinkWithAuraEffect href='/collections'>
            Collections
          </NavLinkWithAuraEffect>
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

const NavLinkWithAuraEffect = styled(NavLink)`
  // TODO: make it so that the radius is proportional to the element's width,
  // rather than being fixed.
  // TODO: make it work on keyboard focus — there are some weird ghost outlines...
  @media (prefers-reduced-motion: no-preference) {
    position: relative;
    isolation: isolate;

    --circle1-radius: 16px;
    --circle1-scale: 1;
    --circle1-opacity: 0;
    --circle1-color: var(--color-gray-100);
    --circle1-transition: transform 200ms ease-in, opacity 400ms ease-out;

    --circle2-radius: 12px;
    --circle2-scale: 1;
    --circle2-opacity: 0;
    --circle2-color: var(--color-gray-100);
    --circle2-transition: transform 300ms ease-out, opacity 100ms ease-out;

    &:hover {
      --circle1-scale: 1.2;
      --circle1-opacity: 1;
      --circle2-scale: 2;
      --circle2-opacity: 1;
    }

    &:before {
      content: '';
      position: absolute;
      top: calc(50% - var(--circle1-radius));
      left: calc(50% - var(--circle1-radius));
      width: calc(2 * var(--circle1-radius));
      height: calc(2 * var(--circle1-radius));
      border-radius: 50%;
      background: transparent;
      border: 3px solid var(--circle1-color);
      transform: scale(var(--circle1-scale));
      opacity: var(--circle1-opacity);
      transition: var(--circle1-transition);
      z-index: -1;
    }

    &:after {
      content: '';
      outline: none;
      position: absolute;
      top: calc(50% - var(--circle2-radius));
      left: calc(50% - var(--circle2-radius));
      width: calc(2 * var(--circle2-radius));
      height: calc(2 * var(--circle2-radius));
      border-radius: 50%;
      background: transparent;
      border: 1px solid var(--circle2-color);
      transform: scale(var(--circle2-scale));
      opacity: var(--circle2-opacity);
      transition: var(--circle2-transition);
      z-index: -1;
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
