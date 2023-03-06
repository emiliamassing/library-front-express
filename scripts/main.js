let availableBookList = document.querySelector('.availableBookList');

export default function fetchBooks(){
    fetch("http://localhost:3000/library")
    .then(res => res.json())
    .then(data => {
        printBooks(data);
        console.log(data);
    })
    .catch((error) => {
        console.log('Error while getting data');
        showErrorMessage();
    });
};

fetchBooks();

function showErrorMessage() {
    const bookContainer = document.querySelector('.bookContainer');

    const headerTag = document.createElement('h3');
    headerTag.innerHTML = 'Error - Could not fetch data';

    bookContainer.appendChild(headerTag);
};

export function printBooks(books) {

    availableBookList.innerHTML = '';

    books.map(book => {
        let liElement = document.createElement('li');
        liElement.id = book.id;

        let aElement = document.createElement('a');
        aElement.id = book.id;
        aElement.innerHTML = book.title;

        availableBookList.appendChild(liElement);
        liElement.appendChild(aElement);
        checkIfBorrowed(book);
    });
};

function checkIfBorrowed(book) {
    const pElement = document.createElement('p');
    
    availableBookList.appendChild(pElement);

    createButton(book);
    const button = document.querySelectorAll('button');

    if(book.borrowed === false){
        pElement.innerHTML = 'Available';
        pElement.className = 'available';
        
    } else {
        pElement.innerHTML = 'Borrowed';
        pElement.className = 'borrowed';
    };
};

function createButton(book) {
    const borrowButton = document.createElement('button');
    borrowButton.innerHTML = 'Borrow Book';
    borrowButton.id = book.id;

    availableBookList.appendChild(borrowButton);
    borrowButton.addEventListener('click', borrowBook);
}

function borrowBook(e) {
    let id = e.currentTarget.id;

    fetch("http://localhost:3000/library/borrow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({bookId: id})
    })
    .then(data => {
        fetchBooks();
    });

};