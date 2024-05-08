import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: var(--font-wordGameFont), sans-serif;
  top: -110px;  //how much of the title is outside
  left: 35%;
  transform: translateX(-50%);
`;

const Hangman = styled.span`
  font-size: 90px; // Larger size for the main part of the title
  color: white;
  text-shadow: 2px 2px 0px #000; // Optional: adds depth
`;

const SmallText = styled.span`
  font-size: 30px; // Smaller size for 'the' and 'game'
  color: white;
  position: absolute; // Position absolutely within the TitleContainer
`;

const TheText = styled(SmallText)`
  top: 0;
  transform: translate(-230%, -10%); // Adjust positioning to appear above Hangman
  text-transform: uppercase;
`;

const GameText = styled(SmallText)`
  bottom: 0;
  transform: translate(70%, 50%); // Adjust positioning to appear below Hangman
  text-transform: uppercase;
`;



// Usage within your component
function GameTitle() {
  return (
    <TitleContainer>
      <TheText>the</TheText>
      <Hangman>Hangman</Hangman>
      <GameText>game</GameText>
    </TitleContainer>
  );
}

export default GameTitle
