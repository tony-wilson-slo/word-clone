import React from 'react';

import {range, sample} from '../../utils';
import { WORDS } from '../../data';
import GuessPrompt from "../GuessPrompt";
import GuessResults from "../GuessResults";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";


const chooseWord = () => {
   const answer = sample(WORDS);
   // To make debugging easier, we'll log the solution in the console.
   console.info({ answer });
   return answer;
}

// Pick a random word on every pageload.
let answer = chooseWord()

const makeEmptyResult = i => {
    const key = `empty-result-${i}`;
    const letters = range(0, 5).map(r => ({ letter: ' ', status: "empty"}));
    return { key, letters };
}

function Game() {
    const emptyResults = Array(NUM_OF_GUESSES_ALLOWED);
    range(0, NUM_OF_GUESSES_ALLOWED).forEach(i => emptyResults[i] = makeEmptyResult(i));

    const [results, setResults] = React.useState(emptyResults);
    const [guesses, setGuesses] = React.useState([]);
    const [isGuessingEnabled, setGuessingEnabled] = React.useState(true);
    const [displayHappyBanner, setDisplayHappyBanner] = React.useState(false);
    const [displaySadBanner, setDisplaySadBanner] = React.useState(false);

    const resetGame = () => {
        answer = chooseWord();
        setResults(emptyResults);
        setGuesses([]);
        setGuessingEnabled(true);
        setDisplayHappyBanner(false);
        setDisplaySadBanner(false);
    };

    const addGuess = (text) => {
        const letters = checkGuess(text, answer);
        const key = `answered-result-${guesses.length}`;
        const result = { key, letters };
        const newResults = [...results];
        newResults[guesses.length] = result;
        setResults(newResults);

        setGuesses([...guesses, text]);

        // if correct
        if (letters.filter(l => l.status === "correct").length === 5) {
            setGuessingEnabled(false);
            setDisplayHappyBanner(true);
        }

        if (guesses.length + 1 === NUM_OF_GUESSES_ALLOWED) {
            // end of the road
            setGuessingEnabled(false);
            setDisplaySadBanner(true);
        }
    }

  return (
      <>
          {displayHappyBanner ? (
          <div className="banner happy">
              <p>
                  <strong>Congratulations!</strong> Got it in
                  <strong>{guesses.length}</strong>.
              </p>
              <input type={"button"} id={"reset-button"} onClick={resetGame} value={"Play Again (new word)"}/>
          </div>
          ) : null}

          {displaySadBanner ? (
          <div className="banner sad">
              <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
              <input type={"button"} id={"reset-button"} onClick={resetGame} value={"Try Again (new word)"}/>
          </div>
          ) : null};

        <GuessResults results={results}/>
        <GuessPrompt addGuess={addGuess} isGuessingEnabled={isGuessingEnabled}/>
      </>
  );
}

export default Game;
