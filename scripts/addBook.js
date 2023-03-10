const bookButton = document.querySelector('#addBookBtn');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');

//const backend = 'http://localhost:3000/library/add';
const backend = 'https://orca-app-y9iee.ondigitalocean.app/library/add';

function createNewBook() {
    let book = { title: inputTitle.value, 
        author: inputAuthor.value, 
        pages: inputPages.value 
    };

    postNewBook(book);
};

function postNewBook(book) {
    fetch(backend, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then((book) => {
        console.log(book);  
    })
    .catch((error) => {
        console.log('Error - Book not added');
    });
};

bookButton.addEventListener('click', createNewBook);