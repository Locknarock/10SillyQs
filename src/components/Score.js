import { useEffect, useState } from "react";
import Header from "./Header";

import Button from "./Button";

function Score({ setQuizCompleted, userScore }) {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }

    if (userScore > storedHighScore) {
      setHighScore(userScore);
      localStorage.setItem("highScore", userScore);
    }
  }, [userScore, highScore]);

  return (
    <div>
      <Header>SCORE</Header>
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-red-500 rounded-full w-36 h-36 flex items-center text-center justify-center text-white text-lg font-bold animate-pulse">
          {userScore === 1000
            ? "HURRAY MAXIMUM POINTS!"
            : "Can you get 1000 points?"}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        <div className="bg-stone-200 border border-stone-400 p-8 rounded-lg shadow-lg w-[400px] mb-5">
          <h2>Your Score: {userScore}</h2>

          <h3>High Score: {highScore}</h3>
        </div>
        <Button
          className=" flex space-x-4 my-8"
          direction="reset"
          setQuizCompleted={setQuizCompleted}
        >
          Again?
        </Button>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-stone-300 hover:bg-stone-400 text-stone-800 px-4 py-2 rounded-full shadow-lg transition"
        onClick={() =>
          window.open("https://github.com/Locknarock/10SillyQs", "_blank")
        }
      >
        GitHub
      </button>
    </div>
  );
}

export default Score;
