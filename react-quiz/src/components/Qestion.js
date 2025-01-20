import Options from "./Options";

function Qestion({ questions, dispatch, answer }) {
  return (
    <div>
            <Options questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Qestion;
