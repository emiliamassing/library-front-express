//import fetchBooks, { updateBooks } from "./main";

const bookButton = document.querySelector('#addBookBtn');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');

function createNewBook() {
    let book = { name: inputTitle.value, 
        author: inputAuthor.value, 
        pages: inputPages.value 
    };

    postNewBook(book);
};

function postNewBook(book) {
    
    fetch('http://localhost:3000/library', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then((book) => {
        console.log(book);  
        //fetchBooks();
    });
};

bookButton.addEventListener('click', createNewBook);