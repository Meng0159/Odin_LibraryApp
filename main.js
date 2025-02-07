const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let index = 0;
function showImage() {
  const carouselImages = document.querySelector('.carousel-images');
  const totalSlides = document.querySelectorAll('.carousel-item').length;

  index = (index + 1) % totalSlides; // Loop back to the first slide after the last one
  carouselImages.style.transform = `translateX(-${index * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(showImage, 3000);

function moveImage(step) {
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

index += step;
if (index < 0) {
  index = totalSlides - 1;
} else if (index >= totalSlides) {
  index = 0;
}

const carouselImages = document.querySelector('.carousel-images');
carouselImages.style.transform = `translateX(-${index * 100}%)`;
}

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to handle form submission
document.getElementById("book-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    this.reset(); // Reset form fields after submission
  }
});

// Function to display books on the page
function displayBooks() {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
      <button onclick="removeBook(${index})">Remove</button>
    `;

    booksContainer.appendChild(bookCard);
  });
}



// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Function to scroll to add-book section when clicking "Add Book" button
document.querySelector(".add-book-btn").addEventListener("click", function () {
  document.querySelector(".add-book-section").scrollIntoView({ behavior: "smooth" });
});
