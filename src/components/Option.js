function Option({
  options,
  answerType,
  setUserAnswers,
  curQuestion,
  userAnswers
}) {
  const handleAnswerChange = (event) => {
    const value = event.target.value;

    if (answerType === "singleAnswer" || answerType === "allCorrect") {
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[curQuestion] = value;

        return updatedAnswers;
      });
    } else if (answerType === "multipleAnswer") {
      const isChecked = event.target.checked;

      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const currentAnswers = updatedAnswers[curQuestion] || [];

        if (isChecked) {
          updatedAnswers[curQuestion] = [...currentAnswers, value];
        } else {
          updatedAnswers[curQuestion] = currentAnswers.filter(
            (answer) => answer !== value
          );
        }

        return updatedAnswers;
      });
    } else if (answerType === "inputAnswer") {
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[curQuestion] = value;

        return updatedAnswers;
      });
    }
  };

  const currentAnswer =
    userAnswers[curQuestion] || (answerType === "multipleAnswer" ? [] : "");

  if (answerType === "singleAnswer" || answerType === "allCorrect") {
    return (
      <div>
        {options.map((option, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              value={option}
              className="mr-2"
              checked={currentAnswer === option}
              onChange={handleAnswerChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  if (answerType === "multipleAnswer") {
    return (
      <div>
        {options.map((option, index) => (
          <label key={index} className="block">
            <input
              type="checkbox"
              value={option}
              className="mr-2"
              checked={currentAnswer.includes(option)}
              onChange={handleAnswerChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  if (answerType === "inputAnswer") {
    return (
      <div>
        <label className="block">
          <input
            type="text"
            placeholder="Type your answer here"
            className="border p-2 w-full"
            value={currentAnswer}
            onChange={handleAnswerChange}
          />
        </label>
      </div>
    );
  }

  return null;
}

export default Option;
