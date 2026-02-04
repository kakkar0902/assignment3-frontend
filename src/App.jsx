import { useEffect } from "react";

function Books() {
  // retrieve the books data from API
  useEffect(() => {
    // fetch the books data from the API
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
      <p>Welcome to the admin Books.</p>
    </div>
  );
}

export default Books;
