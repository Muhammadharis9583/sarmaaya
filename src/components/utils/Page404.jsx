import "./404.css";

const Page404 = () => {
  return (
    <div className="container bg-white">
      <div className="title">404</div>
      <div className="message">Sorry, the page you requested could not be found.</div>
      <a className="link" href="/">
        Go back to homepage
      </a>
    </div>
  );
};

export default Page404;
