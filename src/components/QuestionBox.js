import Question from "./Question";
import Option from "./Option";
import quizData from "../data/quiz.json";
import Button from "./Button";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function QuestionBox({ setQuizCompleted, setUserScore }) {
  const [curQuestion, setCurQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.quiz.length).fill(null)
  );
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const updatedQuiz = quizData.quiz.map((question) => {
      if (question.correctOption === "CURRENT_YEAR") {
        return {
          ...question,
          correctOption: new Date().getFullYear().toString()
        };
      }
      return question;
    });
    setQuiz(updatedQuiz);
  }, []);

  const handleSubmit = () => {
    setQuizCompleted(true);

    const score = CalculateScore();
    setUserScore(score);
  };

  function CalculateScore() {
    let totalScore = 0;

    quiz.forEach((question, i) => {
      const userAnswer = userAnswers[i];

      switch (question.answerType) {
        case "singleAnswer":
          if (
            userAnswer !== null &&
            userAnswer === question.options[question.correctOption]
          ) {
            totalScore += 100;
          }
          break;

        case "allCorrect":
          if (userAnswer !== null) {
            totalScore += 100;
          }
          break;

        case "inputAnswer":
          switch (typeof question.correctOption) {
            case "string":
              if (
                userAnswer !== null &&
                userAnswer.trim().toLowerCase() ===
                  question.correctOption.trim().toLowerCase()
              ) {
                totalScore += 100;
              }
              break;

            case "object":
              if (
                userAnswer !== null &&
                question.correctOption.includes(userAnswer.trim().toLowerCase())
              ) {
                totalScore += 100;
              }
              break;

            default:
              break;
          }
          break;

        case "multipleAnswer":
          const getCorrectOptions = (options, correctOption) =>
            correctOption.map((index) => options[index]);

          const correctOptions = getCorrectOptions(
            question.options,
            question.correctOption
          );

          if (Array.isArray(userAnswer)) {
            const matchedAnswers = userAnswer.filter((answer) =>
              correctOptions.includes(answer)
            ).length;

            const score = Math.ceil(
              (matchedAnswers / correctOptions.length) *
                parseInt(question.points, 10)
            );

            totalScore += score;
          }
          break;

        default:
          break;
      }
    });

    return totalScore;
  }

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="bg-stone-200 border border-stone-400 p-8 rounded-lg shadow-lg w-[400px]">
        <div>
          {quiz.length > 0 && (
            <>
              <Question question={quiz[curQuestion].question} />
              <Option
                options={quiz[curQuestion].options}
                answerType={quiz[curQuestion].answerType}
                setUserAnswers={setUserAnswers}
                userAnswers={userAnswers}
                curQuestion={curQuestion}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        {curQuestion !== 0 && (
          <Button
            direction="back"
            curQuestion={curQuestion}
            setCurQuestion={setCurQuestion}
            maxQuestions={quiz.length}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
        )}
        <Button direction="submit" onSubmit={handleSubmit}>
          Submit
        </Button>
        {curQuestion < quiz.length - 1 && (
          <Button
            direction="next"
            curQuestion={curQuestion}
            setCurQuestion={setCurQuestion}
            maxQuestions={quiz.length}
          >
            <ArrowRightIcon className="h-6 w-6" />
          </Button>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-stone-300 hover:bg-stone-400 text-stone-800 px-4 py-2 rounded-full shadow-lg  transition"
          onClick={() => window.open("https://github.com/Locknarock/10SillyQs")}
        >
          GitHub
        </button>
      </div>
    </div>
  );
}

export default QuestionBox;
