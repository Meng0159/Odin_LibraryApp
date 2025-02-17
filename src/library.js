// library.js - Book Library logic

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLibraryDisplay();
}

function updateLibraryDisplay() {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = "";
  
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>${book.read ? "Read ✅" : "Not Read ❌"}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    booksContainer.appendChild(bookCard);
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      myLibrary.splice(e.target.dataset.index, 1);
      updateLibraryDisplay();
    });
  });
}

document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
});

export { addBookToLibrary, updateLibraryDisplay };
