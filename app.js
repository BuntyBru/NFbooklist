//classes

class Book {
  constructor(name, author, isbn, price, rating) {
    this.name = name;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.rating = rating;
  }
}

class UserInterface {
  static initialize() {
    let books = Storage.fillList();
    books.forEach((x) => {
      UserInterface.AddBook(x);
    });
  }
  static addAlert() {
    const alertBox = document.createElement("div");
    alertBox.className = "alertBox";
    alertBox.appendChild(document.createTextNode("New Book has been added"));

    const container = document.querySelector("body");
    container.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  }

  static AddBook(book) {
    console.log("hello");
    const entryBox = document.createElement("div");
    entryBox.className = "entry";

    const pBox = document.createElement("p");
    pBox.className = "p-box";

    const entryDetailsOne = document.createElement("div");
    entryDetailsOne.className = "entry-details-mid";

    entryDetailsOne.innerHTML = `<p class="book-name"> ${book.name} </p>
    <p class="writer-name"> ${book.author} </p>
    <p class="isbn">${book.isbn}</p>`;

    const entryDetailsTwo = document.createElement("div");
    entryDetailsTwo.className = "entry-details-mid";
    entryDetailsTwo.innerHTML = `<p class="book-rating">${book.rating}</p>
    <div class="book-price-parent">
    <p class="symbol"> $ </p>
    <p class="book-price"> ${book.price} </p>
    </div>`;

    entryBox.appendChild(pBox);
    entryBox.appendChild(entryDetailsOne);
    entryBox.appendChild(entryDetailsTwo);

    document.querySelector(".book-list").appendChild(entryBox);
  }

  static sortIt(val) {
    let listBooks = document.querySelector(".book-list").childNodes;
    let itemArray = [];

    listBooks.forEach((x) => {
      if (x.nodeType == 1) {
        itemArray.push(x);
      }
    });
    itemArray.sort(function (a, b) {
      return (
        parseInt(a.querySelector("." + val).innerHTML) -
        parseInt(b.querySelector("." + val).innerHTML)
      );
    });
    for (let i = 0; i < itemArray.length; ++i) {
      document.querySelector(".book-list").append(itemArray[i]);
    }
  }

  static revSort(val) {
    let listBooks = document.querySelector(".book-list").childNodes;
    let itemArray = [];

    listBooks.forEach((x) => {
      if (x.nodeType == 1) {
        itemArray.push(x);
      }
    });
    itemArray.sort(function (a, b) {
      return (
        parseInt(b.querySelector("." + val).innerHTML) -
        parseInt(a.querySelector("." + val).innerHTML)
      );
    });
    for (let i = 0; i < itemArray.length; ++i) {
      document.querySelector(".book-list").append(itemArray[i]);
    }
  }
}

//local storage

class Storage {
  static fillList() {
    let books;
    if (localStorage.getItem("books") == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBooks(book) {
    const books = Storage.fillList();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//event handling
document.addEventListener("DOMContentLoaded", UserInterface.initialize());
document.querySelector("#book-form-parent").addEventListener("submit", (e) => {
  e.preventDefault();

  let goForward = false;
  //deriving values
  const nameBook = document.querySelector("#title").value;
  const authorName = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const price = document.querySelector("#price").value;
  const rating = document.querySelector("#rating").value;

  //validations and alerts
  let newBook = new Book(nameBook, authorName, isbn, price, rating);

  document.querySelector("#book-form-parent").reset();
  UserInterface.addAlert();

  UserInterface.AddBook(newBook);
  Storage.addBooks(newBook);
});

//sorting
document.querySelector(".sortp").addEventListener("click", () => {
  UserInterface.sortIt("book-price");
});

document.querySelector(".sortr").addEventListener("click", () => {
  UserInterface.revSort("book-rating");
});
