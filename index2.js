//Book class
class Book {
    constructor(title, author, pubBy, isbn, check) {
        this.title = title;
        this.author = author;
        this.pubBy = pubBy;
        this.isbn = isbn;
        this.check = check;
    }
}

// UI class
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#bookList');

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pubBy}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

        `;
        list.appendChild(row)

    }

    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();

            //Remove book from store
            const isbn = element.sibling
            Store.removeBook()

            //Show delete message 
            UI.showAlert('Book deleted', 'success')
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Disappear after 3 secs
        setTimeout(() => document.querySelector(".alert").remove(), 3000)
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pubBy").value = "";
        document.querySelector("#isbn").value = "";
    }
}

//Store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn)
    {
        console.log(isbn);
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks)

//Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {

    //Prevent Default
    e.preventDefault();

    //Get input
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pubBy = document.querySelector("#pubBy").value;
    const isbn = document.querySelector("#isbn").value;

    //Validate 
    if (title == '' || author == '' || pubBy == '' || isbn == '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //Instantiate Book class
        const book = new Book(title, author, pubBy, isbn);

        //Add book to UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);

        //Show success message 
        UI.showAlert('Book added succesfully', 'success')

        //Clear Fields
        UI.clearFields();
    }

});

//Event: Remove Book
document.querySelector("#bookList").addEventListener("click", (e) => {

    //Remove a book from UI 
    UI.deleteBook(e.target);

    //Remove a book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});