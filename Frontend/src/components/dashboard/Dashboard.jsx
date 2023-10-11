import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getAllAuthors } from "../../services/authorServices";
import EditAuthorModal from "./Author/EditAuthorModal";
import { AuthorTable, BooksTable } from "../home";
import { getAllBooks } from "../../services/booksServices";
import EditeBook from "./books/EditeBook";

const Dashboard = () => {
  const [Authors, setAuthors] = useState([]);
  const [Books, setBooks] = useState([]);
  const [ChangedStatus, setChangedStatus] = useState(false);

  const [ShowModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [ShowEditeModal, setShowEditeModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAuthorEdit = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };
  const handleBookEdit = (book) => {
    setSelectedBook(book);
    setShowEditeModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAuthor(null);
  };
  const handleEditeModalClose = () => {
    setShowEditeModal(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    const GetAuthors = async () => {
      const { data } = await getAllAuthors();
      const { data: books } = await getAllBooks();
      setBooks(books);
      setAuthors(data);
    };
    GetAuthors();
  }, [ChangedStatus]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-10">
        <AuthorTable
          Authors={Authors}
          setShowModal={setShowModal}
          onAuthorEdit={handleAuthorEdit}
        />
        <EditAuthorModal
          onClose={handleModalClose}
          visible={ShowModal}
          author={selectedAuthor}
        />
        <BooksTable
          Books={Books}
          Authors={Authors}
          setShowBookModal={setShowEditeModal}
          onBookEdit={handleBookEdit}
          setChangedStatus={setChangedStatus}
        />
        <EditeBook
          onClose={handleEditeModalClose}
          visible={ShowEditeModal}
          book={selectedBook}
          Authors={Authors}
          setChangedStatus={setChangedStatus}
        />
      </div>
    </div>
  );
};

export default Dashboard;
