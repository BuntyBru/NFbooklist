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
});
