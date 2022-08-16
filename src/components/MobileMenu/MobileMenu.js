/* eslint-disable no-unused-vars */
import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { QUERIES, WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Backdrop />
      <Content aria-label='Menu'>
        <CloseButton onClick={onDismiss}>
          <Icon id='close' />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href='/sale'>Sale</NavLink>
          <NavLink href='/new'>New&nbsp;Releases</NavLink>
          <NavLink href='/men'>Men</NavLink>
          <NavLink href='/women'>Women</NavLink>
          <NavLink href='/kids'>Kids</NavLink>
          <NavLink href='/collections'>Collections</NavLink>
        </Nav>
        <Footer>
          <SubLink href='/terms'>Terms and Conditions</SubLink>
          <SubLink href='/privacy'>Privacy Policy</SubLink>
          <SubLink href='/contact'>Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const drawerOpenKeyframes = keyframes`
  0% {
    transform: perspective(300px) rotate3d(0, 1, 0.05, 90deg) translateX(20%);
  }

  100% {
    transform: perspective(300px) rotate3d(0, 0, 0, 0deg) translateX(0%);
  }
`;

const navLinkSlideInKeyframes = keyframes`
  from {
    transform: translateX(75px);
  }

  to {
    transform: translateX(0);
  }
`;

const footerSlideInKeyframes = keyframes`
  from {
    transform: translateY(10%);
  }

  to {
    transform: translateY(0);
  }
`;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  isolation: isolate;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: var(--color-backdrop);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fadeInKeyframes} 500ms;
  }
`;

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    transform-origin: center right;
    animation: ${drawerOpenKeyframes} 300ms var(--ease-out-cubic);
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const createNavLinkAnimationStyles = () => {
  let styles = [];
  const linkCount = 6;

  for (let i = 1; i <= linkCount; i++) {
    const delayInMs = 100 + 50 * i;

    styles.push(css`
      &:nth-child(${i}) {
        animation: ${navLinkSlideInKeyframes} 200ms var(--ease-out-cubic)
            ${delayInMs}ms,
          ${fadeInKeyframes} 200ms ${delayInMs}ms;
        animation-fill-mode: backwards;
      }
    `);
  }

  return [].concat(...styles);
};

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }

  @media (prefers-reduced-motion: no-preference) {
    ${createNavLinkAnimationStyles()}
  }
`;

const Filler = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${footerSlideInKeyframes} 200ms var(--ease-out-cubic) 400ms,
      ${fadeInKeyframes} 200ms 400ms;
    animation-fill-mode: backwards;
  }
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;
