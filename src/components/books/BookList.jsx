function BookList({ bookData = [] }) {
  return (
    <>
      <h2 className="font-bold">Current Book List</h2>
      <ul>
        {bookData.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
}

export default BookList;
