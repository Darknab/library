let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author; 
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const newBook = new Book
  newBook.title = document.querySelector("#title").value;
  newBook.author = document.querySelector("#author").value;
  newBook.pages = document.querySelector("#pages").value;
  newBook.read = document.querySelector('input[name="read"]:checked').value;
  myLibrary.push(newBook);
}

/*const redDragon = new Book("Red Dragon", "Thomas Harris", 448, true);
const silenceOfTheLambs = new Book("Silence of the lambs", "Thomas Harris", 368, true);
const hannibal = new Book("Hannibal", "Thomas Harris", 486, false);

myLibrary.push(redDragon, silenceOfTheLambs, hannibal);*/

const content = document.querySelector(".books");
const emptyLibrary = document.createElement("p");

function addCard(book) {
  emptyLibrary.textContent = ""
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `${myLibrary.length - 1}`)
  content.appendChild(card);
  AddContentToCard(card, book); 
};

function AddContentToCard(card, book) {
  const cardTitle = document.createElement("h3");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardRead = document.createElement("p");
  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = book.pages;
  if (book.read === "true") {
    cardRead.textContent = "Already read";
    cardRead.classList.add("green");
  } else {
    cardRead.textContent = "Not read yet";
    cardRead.classList.add("red");
  }
  card.append(cardTitle, cardAuthor, cardPages, cardRead);
};

if (myLibrary.length === 0) {
  content.appendChild(emptyLibrary);
  emptyLibrary.textContent = "The library is empty now, you can add books by clicking on the Add Book button.";
} 

const showDialog = document.querySelector("#show-dialog");
const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  addCard(myLibrary[myLibrary.length - 1])
  dialog.close();
})