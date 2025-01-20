function Options({ questions, dispatch, answer }) {
    const hasAnswered = answer !== null;
  return (
    <div>
      <h2>{questions.question}</h2>
      <div>
        {questions.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${ hasAnswered ? index === questions.correctOption ? "correct" : "wrong" : ""}`}
            key={option}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
