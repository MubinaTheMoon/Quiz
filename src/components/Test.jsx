import { useReducer } from "react";
import Result from "./Result";
import { toast } from "react-hot-toast";

const initialState = {
  answeredQuestions: 1,
  correctAnswerCount: 0,
  questionIndex: 0,
  selectedAnswer: null,
  answerStatus: null,
  statusDisabled: false,
  showNextButton: false,
};

const testReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER":
      return { ...state, selectedAnswer: action.payload };
    case "SUBMIT_ANSWER":
      const isCorrect = action.payload === action.correctAnswer;
      return {
        ...state,
        answerStatus: isCorrect ? "correct" : "incorrect",
        correctAnswerCount: isCorrect
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount,
        showNextButton: true,
        statusDisabled: true,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answeredQuestions: state.answeredQuestions + 1,
        selectedAnswer: null,
        answerStatus: null,
        statusDisabled: false,
        showNextButton: false,
      };
    default:
      return state;
  }
};

function Test({ questions: { color, icon, questions, title } }) {
  const [state, dispatch] = useReducer(testReducer, initialState);
  const {
    answeredQuestions,
    correctAnswerCount,
    questionIndex,
    selectedAnswer,
    answerStatus,
    statusDisabled,
    showNextButton,
  } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = questions[questionIndex].answer;

    if (selectedAnswer == null) {
      toast.error("Please select the answer.");
    } else {
      dispatch({
        type: "SUBMIT_ANSWER",
        payload: selectedAnswer,
        correctAnswer,
      });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  if (questionIndex === questions.length) {
    toast.success("Congratulations", { icon: "🎉" });
    return (
      <Result
        title={title}
        color={color}
        icon={icon}
        correctAnswerCount={correctAnswerCount}
        questionsLenght={questions}
      />
    );
  }

  return (
    <div className="test-container">
      <div className="test-content">
        <p className="test-description">
          Question {answeredQuestions} of {questions.length}
        </p>
        <h2 className="test-title">{questions[questionIndex].question}</h2>

        <div className="test-proccess-container">
          <div
            className="test-proccess"
            style={{
              width: (answeredQuestions / questions.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>
      <div className="test-questions">
        <form onSubmit={handleSubmit}>
          <ul className="test-list">
            {questions[questionIndex].options.map((option, index) => {
              const alphabet = String.fromCharCode(65 + index);

              let className = "";

              if (answerStatus === "correct" && option === selectedAnswer) {
                className = "correct";
              } else if (answerStatus === "incorrect") {
                if (option === selectedAnswer) {
                  className = "incorrect";
                }
                if (option === questions[questionIndex].answer) {
                  className = "correct";
                }
              }

              return (
                <li key={option}>
                  <label className={`test-label ${className}`}>
                    <span className="test-letter">{alphabet}</span>
                    <input
                      type="radio"
                      name="option"
                      onChange={() =>
                        dispatch({ type: "SELECT_ANSWER", payload: option })
                      }
                      disabled={statusDisabled}
                    />
                    <span className="test-text">{option}</span>
                    <img
                      className="test-icon-correct"
                      src="../assets/icon-correct.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <img
                      className="test-icon-incorrect"
                      src="../assets/icon-incorrect.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
          {!showNextButton && (
            <button className="btn test-btn">Submit Question</button>
          )}
          {showNextButton && (
            <button className="btn test-btn" onClick={handleNextQuestion}>
              {questions.length === answeredQuestions
                ? "Finish"
                : "Next Question"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;

// import { useState } from "react";
// import Result from "./Result";
// import { toast } from "react-hot-toast";

// function Test({ questions: { color, icon, questions, title } }) {
//   const [answeredQuestions, setAnsweredQuestions] = useState(1);
//   const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [answerStatus, setAnswerStatus] = useState(null);
//   const [statusDisabeled, setStatusDisabled] = useState(false);
//   const [showNextButton, setShowNextButton] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const correctAnswer = questions[questionIndex].answer;

//     if (selectedAnswer == null) {
//       toast.error("Please select the answer.");
//     } else {
//       if (selectedAnswer == correctAnswer) {
//         setAnswerStatus("correct");
//         setCorrectAnswerCount(correctAnswerCount + 1);
//       } else {
//         setAnswerStatus("incorrect");
//       }
//     }
//     setShowNextButton(true);
//     setStatusDisabled(true);
//   };

//   const handleNextQuestion = () => {
//     setQuestionIndex(questionIndex + 1);
//     setAnsweredQuestions(answeredQuestions + 1);
//     setSelectedAnswer(null);
//     setShowNextButton(false);
//     setAnswerStatus(null);
//     setStatusDisabled(false);
//   };

//   if (questionIndex === questions.length) {
//     toast.success("Congratulations", {
//       icon: "🎉",
//     });
//     return (
//       <Result
//         title={title}
//         color={color}
//         icon={icon}
//         correctAnswerCount={correctAnswerCount}
//         questionsLenght={questions}
//       />
//     );
//   }

//   return (
//     <div className="test-container">
//       <div className="test-content">
//         <p className="test-description">
//           Question {answeredQuestions} of {questions.length}
//         </p>
//         <h2 className="test-title">{questions[questionIndex].question}</h2>

//         <div className="test-proccess-container">
//           <div
//             className="test-proccess"
//             style={{
//               width: (answeredQuestions / questions.length) * 100 + "%",
//             }}
//           ></div>
//         </div>
//       </div>
//       <div className="test-questions">
//         <form onSubmit={handleSubmit}>
//           <ul className="test-list">
//             {questions[questionIndex].options.map((option, index) => {
//               const alphabet = String.fromCharCode(65 + index);

//               let className = "";

//               if (answerStatus == "correct" && option == selectedAnswer) {
//                 className = "correct";
//               } else if (answerStatus == "incorrect") {
//                 if (option == selectedAnswer) {
//                   className = "incorrect";
//                 }

//                 if (option == questions[questionIndex].answer) {
//                   className = "correct";
//                 }
//               }
//               return (
//                 <li key={option}>
//                   <label className={`test-label ${className}`}>
//                     <span className="test-letter">{alphabet}</span>
//                     <input
//                       type="radio"
//                       name="option"
//                       onChange={() => setSelectedAnswer(option)}
//                       disabled={statusDisabeled}
//                     />
//                     <span className="test-text">{option}</span>
//                     <img
//                       className="test-icon-correct"
//                       src="../assets/icon-correct.svg"
//                       alt="icon"
//                       width={40}
//                       height={40}
//                     />
//                     <img
//                       className="test-icon-incorrect"
//                       src="../assets/icon-incorrect.svg"
//                       alt="icon"
//                       width={40}
//                       height={40}
//                     />
//                   </label>
//                 </li>
//               );
//             })}
//           </ul>
//           {!showNextButton && (
//             <button className="btn test-btn">Submit Question</button>
//           )}
//           {showNextButton && (
//             <button className="btn test-btn" onClick={handleNextQuestion}>
//               {questions.length == answeredQuestions
//                 ? "Finish"
//                 : "Next Question"}
//             </button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Test;
