import { printBooks } from "./main";

const bookButton = document.querySelector('#addBookBtn');
const addBook = document.querySelector('#newBook');

bookButton.addEventListener('click', createNewBook);

function createNewBook() {
    let book = { name: addBook.value };

    fetch('http://localhost:3000/library', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then(data => {
        printBooks(data);
    });
};