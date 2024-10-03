import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error: unknown = useRouteError();

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        {(error as { statusText?: string })?.statusText} || (error as
        Error).message
      </p>
    </div>
  );
};
export default NotFound;
