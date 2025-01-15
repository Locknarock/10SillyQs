import Header from "./Header";
import Score from "./Score";

import QuestionBox from "./QuestionBox";
import { useState } from "react";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userScore, setUserScore] = useState(0);

  return (
    <div>
      {quizCompleted ? (
        <Score setQuizCompleted={setQuizCompleted} userScore={userScore} />
      ) : (
        <div>
          <Header>
            10 Silly Questions
            <br /> Quiz
          </Header>
          <QuestionBox
            setQuizCompleted={setQuizCompleted}
            setUserScore={setUserScore}
          />
        </div>
      )}
    </div>
  );
}

export default App;
