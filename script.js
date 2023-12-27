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

Book.prototype.toggleRead = function(cardId) {
  const cardRead = document.querySelector(`#${cardId} .card-read`);
  const cardSwitch = document.querySelector(`#${cardId} .switch`);
  if (this.read === true) {
    this.read = false;
    cardRead.textContent = "Not read yet";
    cardRead.classList.remove(".green");
    cardRead.classList.add("red");
    cardSwitch.textContent = String.fromCharCode(10004);
  } else {
    this.read = true;
    cardRead.textContent = "Already read";
    cardRead.classList.remove(".red");
    cardRead.classList.add(".green");
    cardSwitch.textContent = String.fromCharCode(10006);
  }
}

const content = document.querySelector(".books");
const emptyLibrary = document.createElement("p");

function addCard(book) {
  if (document.contains(emptyLibrary)) {
    emptyLibrary.remove()
  }
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `card-${myLibrary.length - 1}`)
  content.appendChild(card);
  AddContentToCard(card, book);  
};

function AddContentToCard(card, book) {
  const cardTitle = document.createElement("h3");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardRead = document.createElement("p");
  const cardSwitch = document.createElement("button");
  const deleteButton = document.createElement("button");
  cardTitle.textContent = book.title;
  cardAuthor.textContent = "Author: " + book.author;
  cardPages.textContent = "pages: " + book.pages;
  cardRead.classList.add("card-read");
  if (book.read === "true") {
    cardRead.textContent = "Already read";
    cardRead.classList.add("green");
    cardSwitch.textContent = String.fromCharCode(10006);
  } else {
    cardRead.textContent = "Not read yet";
    cardRead.classList.add("red");
    cardSwitch.textContent = String.fromCharCode(10004);
  }
  deleteButton.classList.add("delete-button");
  cardSwitch.classList.add("switch");
  deleteButton.textContent = "Delete from library";
  card.append(cardTitle, cardAuthor, cardPages, cardRead, cardSwitch, deleteButton);
};

function displayMessageIfEmpty () {
  if (myLibrary.length === 0) {
    content.appendChild(emptyLibrary);
    emptyLibrary.textContent = "The library is empty now, you can add books by clicking on the Add Book button.";
  }
}

displayMessageIfEmpty();

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
  addCard(myLibrary[myLibrary.length - 1]);
  dialog.close();
});

function removeCard(cardId) {
  card = document.querySelector(`#${cardId}`);
  const cardIndex = parseInt(cardId.replace("card-", ""));
  myLibrary.splice(cardIndex);
  card.remove();
};

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const cardId = e.target.parentElement.id;
    removeCard(cardId);
    displayMessageIfEmpty();
  }
})

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const cardId = e.target.parentElement.id;
    const index = parseInt(cardId.replace("card-", ""));
    const book = myLibrary[index];
    book.toggleRead(cardId);
  }
})
