import "./pageNotFoundStyle.css";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <h1>Page Not Found</h1>
      <div className="page-not-found-link">
        Click here to go back at
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default PageNotFound;