class Book {
  constructor (title, author, pages, read) {
    this._title = title;
    this._author = author; 
    this._pages = pages;
    this._read = read;
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }

  get read() {
    return this._read;
  }

  set title(title) {
    this._title = title;
  }

  set author(author) {
    this._author = author;
  }

  set pages(pages) {
    this._pages = pages;
  }

  set read(read) {
    this._read = read;
  }
}

function getLibrary() {
  if (localStorage.getItem('library')) {
    return JSON.parse(localStorage.getItem('library'));
  } else {
    return [];
  }
}

function saveLibrary() {
  const updatedLibrary = JSON.stringify(myLibrary);
  localStorage.setItem('library', updatedLibrary);
}

let myLibrary = getLibrary();

function addBookToLibrary() {
  const newBook = new Book
  newBook.title = document.querySelector("#title").value;
  document.querySelector("#title").value = "";
  newBook.author = document.querySelector("#author").value;
  document.querySelector("#author").value = "";
  newBook.pages = document.querySelector("#pages").value;
  document.querySelector("#pages").value = ""
  newBook.read = document.querySelector('input[name="read"]:checked').value;
  myLibrary.push(newBook);
  saveLibrary();
}

const content = document.querySelector(".books");
const emptyLibrary = document.createElement("p");

function addCard(book) {
  if (document.contains(emptyLibrary)) {
    emptyLibrary.remove();
  }
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `card-${myLibrary.indexOf(book)}`);
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
  cardTitle.textContent = book._title;
  cardAuthor.textContent = "Author: " + book._author;
  cardPages.textContent = "pages: " + book._pages;
  cardRead.classList.add("card-read");
  if (book._read === true) {
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

function displayBooks () {
  if (myLibrary.length === 0) {
    content.appendChild(emptyLibrary);
    emptyLibrary.textContent = "The library is empty now, you can add books by clicking on the Add Book button.";
  } else {
    myLibrary.forEach(book => {
      addCard(book);
    });
  }
}

displayBooks();

const showDialog = document.querySelector("#show-dialog");
const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");
const form = document.querySelector('form');

// Display modal
showDialog.addEventListener("click", () => {
  dialog.showModal();
});

// Add card
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    addBookToLibrary();
    addCard(myLibrary[myLibrary.length - 1]);
    dialog.close();
  }
  
});

function removeCard(cardId) {
  card = document.querySelector(`#${cardId}`);
  const cardIndex = parseInt(cardId.replace("card-", ""));
  myLibrary.splice(cardIndex);
  card.remove();
};

// Remove card
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const cardId = e.target.parentElement.id;
    removeCard(cardId);
    displayMessageIfEmpty();
  }
})

// Toggle read status
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const cardId = e.target.parentElement.id;
    const index = parseInt(cardId.replace("card-", ""));
    const book = myLibrary[index];
    toggleRead(book, cardId);
  }
});

function toggleRead(book, cardId) {
  const cardRead = document.querySelector(`#${cardId} .card-read`);
  const cardSwitch = document.querySelector(`#${cardId} .switch`);
  if (book._read === true) {
    book._read = false;
    cardRead.textContent = "Not read yet";
    cardRead.classList.remove("green");
    cardRead.classList.add("red");
    cardSwitch.textContent = String.fromCharCode(10004);
  } else {
    book._read = true;
    cardRead.textContent = "Already read";
    cardRead.classList.remove("red");
    cardRead.classList.add("green");
    cardSwitch.textContent = String.fromCharCode(10006);
  }
  saveLibrary();
}

// cancel button
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.close();
})
