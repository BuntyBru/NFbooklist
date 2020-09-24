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
}

//book submission

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
});

//sorting
document.querySelector(".sortp").addEventListener("click", () => {
  let listBooks = document.querySelector(".book-list").childNodes;

  let itemArray = [];
  listBooks.forEach((x) => {
    if (x.nodeType == 1) {
      itemArray.push(x);
      console.log("======>", typeof x.querySelector(".book-price").innerHTML);
    }
  });

  //sorting
  itemArray.sort(function (a, b) {
    return (
      parseInt(a.querySelector(".book-price").innerHTML) -
      parseInt(b.querySelector(".book-price").innerHTML)
    );
  });

  console.log("this.itemArray", itemArray);
  for (i = 0; i < itemArray.length; ++i) {
    document.querySelector(".book-list").append(itemArray[i]);
  }
});
