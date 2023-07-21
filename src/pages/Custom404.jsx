import React from "react";

const Quirky404Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="quirky-content text-center flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-white">
          Oops! You've Hit a Wrong Note
        </h1>
        <p className="text-md text-white">
          The page you are looking for is like an elusive high note. It seems to
          have slipped away. Maybe try another melody?
        </p>
        <div>
          <button
            onClick={() => window.history.back()}
            className="bg-purple-600 text-white px-6 py-3 rounded-md mt-4 hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quirky404Page;
