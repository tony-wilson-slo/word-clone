import React from "react";

function GuessPrompt({addGuess, isGuessingEnabled}) {
  const [guessText, setGuessText] = React.useState('');

  const handleGuessInput = (event) => {
      const upperCase = event.target.value?.toUpperCase() || '';
      setGuessText(upperCase);
  };

  const handleSubmit = (event => {
    event.preventDefault();
    addGuess(guessText);
    setGuessText('');
  });

  return (
      <>
        <form className={"guess-input-wrapper"} onSubmit={handleSubmit}>
          <label htmlFor={"guess-input"}>Enter guess:</label>
          <input id={"guess-input"}
                 disabled={!isGuessingEnabled}
                 type={"text"}
                 required
                 pattern={"[A-Z]{5}"}
                 maxLength={5}
                 value={guessText}
                 onChange={handleGuessInput}/>
        </form>
      </>
  );
}

export default GuessPrompt;
