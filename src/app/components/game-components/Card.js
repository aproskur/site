import styled, { css } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGameSettings } from '../../context/GameSettingsContext';




const RoundCardContainer = styled.div
  .withConfig({ shouldForwardProp: prop => !['isFlipped', 'isIdle', 'gridSize'].includes(prop) })`
  width: var(--numbers-4-x-4);
  height: var(--numbers-4-x-4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: ${(props) => (props.gridSize === 4 ? '0.75em' : '0.55em')};
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out; /* Added background-color transition */
    font-size: ${(props) => (props.gridSize === 4 ? 'var(--numbers-4-x-4)' : 'var(--numbers-6-x-6)')};
    color: var(--text);

  /* Fix blue otline on touchscreens */
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  
  
      outline: none !important;
  


    @media (max-width: 450px) {
      padding: ${(props) => (props.gridSize === 4 ? '0.7em' : '0.5em')};
    }

    @media (max-width: 325px) {
      padding: ${(props) => (props.gridSize === 4 ? '0.6em' : '.3em')};
      font-size: ${(props) => (props.gridSize === 4 ? '45px' : '25px')};
      width: ${(props) => (props.gridSize === 4 ? '55px' : '40px')};
      height: ${(props) => (props.gridSize === 4 ? '55px' : '40px')};

    }



    ${(props) =>
    props.isFlipped &&
    css`
        background-color: var(--accent-yellow);
        /* Removed transform: rotateY(180deg); */
      `}

    ${(props) =>
    !props.isFlipped &&
    css`
        background-color: var(--less-dark-background);
      `}

    ${(props) =>
    props.isIdle &&
    css`
        background-color: var(--idle);
      `}

    &:hover {
      transform: ${(props) => (props.isIdle ? "scale(1.1)" : "none")};
    }
  `;


const Card = ({ content, isFlipped, isIdle, onClick }) => {

  const { gridSize } = useGameSettings();


  const isIcon = typeof content === 'object' && content.hasOwnProperty('iconName');

  return (
    <RoundCardContainer isFlipped={isFlipped} isIdle={isIdle} onClick={onClick} gridSize={gridSize}>
      {(isFlipped || isIdle) && (
        isIcon ? <FontAwesomeIcon icon={content} /> : content
      )}
    </RoundCardContainer>
  );
};


export default Card;

