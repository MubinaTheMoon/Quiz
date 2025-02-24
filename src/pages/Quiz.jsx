import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Test from "../components/Test";

function Quiz() {
  const { title } = useParams();
  const {
    data: quizzes,
    isPending,
    error,
  } = useFetch(`https://json-api.uz/api/project/f-quiz/quizzes?title=${title}`);

  useEffect(() => {
    document.title = "Quiz" + " " + title;
  }, [title]);

  return (
    <section className="quiz-container container">
      {isPending && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {quizzes && <Test questions={quizzes.data[0]} />}
    </section>
  );
}

export default Quiz;
