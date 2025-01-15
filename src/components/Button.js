function Button({
  children,
  setQuizCompleted,
  direction,
  curQuestion,
  setCurQuestion,
  maxQuestions,
  onSubmit
}) {
  const handleClick = () => {
    switch (direction) {
      case "next":
        if (curQuestion < maxQuestions - 1) {
          setCurQuestion((prev) => prev + 1);
        }
        break;
      case "back":
        if (curQuestion > 0) {
          setCurQuestion((prev) => prev - 1);
        }
        break;
      case "submit":
        if (onSubmit) {
          onSubmit();
        }
        break;
      case "reset":
        setQuizCompleted(false);
        break;
      default:
        break;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-3 rounded-full shadow-md bg-stone-300 hover:bg-stone-400 focus:outline-none"
    >
      {children}
    </button>
  );
}

export default Button;
