import React from "react";

/**
 * Renders a 404 error page component.
 * @returns A React component representing a 404 error page.
 */
/**
 * Renders a 404 error page with a message indicating that the requested page could not be found.
 * @returns {JSX.Element} The 404 error page component.
 */
/**
 * Renders the 404 error page.
 * @returns The JSX element for the 404 error page.
 */
/**
 * Renders a 404 error page with a message indicating that the requested page could not be found.
 * @returns A JSX element representing the 404 error page.
 */
const Error404Page = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 animate-bounce text-4xl font-bold">404 Error</h1>
      <p className="text-lg">
        Sorry, the page you are looking for could not be found.
      </p>
    </div>
  );
};

export default Error404Page;
