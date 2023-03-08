import React from "react";

function GuessResults({results}) {
  return (
      <>
        <div className="guess-results">
          {results.map((result) => (
              <p key={result.key} className="guess">
                  {result.letters.map((letter, i) => (
                      <span key={i} className={`cell ${letter.status}`}>{letter.letter}</span>
                  ))}
              </p>
          ))}
        </div>
      </>
  );
}

export default GuessResults;
