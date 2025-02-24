import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  if (error.status == 404) {
    return (
      <div className="error-container container">
        <div>
          <h3>
            "Congratulations! You found a 404 page!" This wasn’t the treasure
            you were hoping for, was it? We were really rooting for you. But
            hey, since you’re here, take a moment to reflect on life’s mysteries
            — like why lost pages always end up here and where missing socks go.
          </h3>
          <Link to="/" className="btn">
            Go To Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="error-container container">
      <div>
        <h3>
          "Uh-oh! Something went wrong..." It looks like our website tripped
          over its own shoelaces. We’re not sure what happened — maybe the page
          you’re looking for went on a coffee break, or maybe the internet just
          got a little too dramatic. Either way, we’re on it!
        </h3>
        <Link to="/" className="btn">
          Go To Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
