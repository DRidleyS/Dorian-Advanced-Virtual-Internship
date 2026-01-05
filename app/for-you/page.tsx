import Sidebar from "@/components/Sidebar";
import { Book } from "@/types/book";
import BookComponent from "@/components/Book";

async function getSelectedBook(): Promise<Book> {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch selected book");
  const data = await res.json();
  return data[0]; // Extract the first book from the array
}

async function getRecommendedBooks(): Promise<Book[]> {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch recommended books");
  return res.json();
}

async function getSuggestedBooks(): Promise<Book[]> {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch suggested books");
  return res.json();
}

const ForYouPage = async () => {
  const selectedBook = await getSelectedBook();
  const recommendedBooks = await getRecommendedBooks();
  const suggestedBooks = await getSuggestedBooks();
  return (
    <>
      <Sidebar />
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>

            <a className="selected__book" href={`/book/${selectedBook.id}`}>
              <div className="selected__book--sub-title">
                {selectedBook.subTitle}
              </div>
              <div className="selected__book--line"></div>
              <div className="selected__book--content">
                <figure
                  className="book__image--wrapper"
                  style={{ height: "140px", width: "140px", minWidth: "140px" }}
                >
                  <img
                    className="book__image"
                    src={selectedBook.imageLink}
                    alt="book"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </figure>
                <div className="selected__book--text">
                  <div className="selected__book--title">
                    {selectedBook.title}
                  </div>
                  <div className="selected__book--author">
                    {selectedBook.author}
                  </div>
                  <div className="selected__book--duration-wrapper">
                    <div className="selected__book--icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                      </svg>
                    </div>
                    <div className="selected__book--duration">
                      {selectedBook.audioLink ? "3 mins 23 secs" : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you'll like these
              </div>
              <div className="for-you__recommended--books">
                {recommendedBooks.map((book) => (
                  <BookComponent key={book.id} book={book} />
                ))}
              </div>
            </div>

            <div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse those books</div>
              <div className="for-you__recommended--books">
                {suggestedBooks.map((book) => (
                  <BookComponent key={book.id} book={book} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForYouPage;
