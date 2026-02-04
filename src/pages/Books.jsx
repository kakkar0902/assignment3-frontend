import { useEffect, useState } from "react";
import BookList from "../components/books/BookList";

function Books() {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        console.log(data);
        setBookData(data.books);
      } catch (err) {
        console.error("Unable to retrieve data...", err);
      }
    }

    getData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
      <p>Welcome to the admin Books.</p>

      <BookList bookData={bookData} />
    </div>
  );
}

export default Books;
