# library

This is part of the Odin Project curriculum
https://www.theodinproject.com/lessons/javascript-library

# Description
This is a small library app where we can add, or remove books from the collection.

# What I've learnt

We can't add directly an event listener to a dynamically displayed element!
To do it we should add an event listener to the container of the element and then, target the element that we want to alter like in this example:
```
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const cardId = e.target.parentElement.id;
    removeCard(cardId);
    displayMessageIfEmpty();
  }
})

```
to remove the card by clicking on the "delete-button", I've added an event listener to "content" which is the container of my cards" and then trigger the removeCardId if the target is the "delete-button".

# What to improve
- I don't like the cards, I should create a table with a book in each row instead of cards.

- May be I can improve the script by creating a constructor function for the cards...