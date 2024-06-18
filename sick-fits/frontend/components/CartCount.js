/*
const Dot = styled ={
background=var(--red)
color:white;
border-radius:50%;
padding 0.5rem;
line-height:2rem;
min-width:3rem;
margin-left:1rem;
font-feature-settings: 'tnum';
font-variant-numeric: tabulara-nums;
}
CartCount = ({count}) =>{}
*/

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabulara-nums;
`;

const CartCount = ({ count }) => {
  return (
    <AnimationStyles>
      <TransitionGroup className={'count'}>
        <CSSTransition
          unmountOnExit
          classNames={'count'}
          timeout={{ enter: 400, exit: 400 }}
          key={count}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};
export default CartCount;
