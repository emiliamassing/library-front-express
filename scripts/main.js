let availableBookList = document.querySelector('.availableBookList');

export default function fetchBooks(){
    fetch("http://localhost:3000/library")
    .then(res => res.json())
    .then(data => {
        printBooks(data);
    })
    .catch((error) => {
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
        printButton(book);
    });
};

function checkIfBorrowed(book) {
    const pElement = document.createElement('p');
    
    availableBookList.appendChild(pElement);

    createBorrowButton(book);
    const button = document.querySelectorAll('button');

    if(book.borrowed === false){
        pElement.innerHTML = 'Available';
        pElement.className = 'available';
        
    } else {
        pElement.innerHTML = 'Borrowed';
        pElement.className = 'borrowed';
    };
};

function createBorrowButton(book) {
    const borrowButton = document.createElement('button');
    borrowButton.id = book.id;

    availableBookList.appendChild(borrowButton);

    if(book.borrowed == false){
        borrowButton.innerHTML = 'Borrow Book';

    } else{
        borrowButton.innerHTML = 'Return Book';
    }

    borrowButton.addEventListener('click', toggleBookAvailability);
};

function toggleBookAvailability(e) {
    let id = e.currentTarget.id;

    fetch("http://localhost:3000/library/toggleAvailability", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({bookId: id})
    })
    .then(data => {
        fetchBooks(data);
    });

};

function createInfoButton(book) {
    const infoButton = document.createElement('button');
    infoButton.innerHTML = 'Click to show information';
    infoButton.id = book.id;

    availableBookList.appendChild(infoButton);

    infoButton.addEventListener('click', fetchInfo);
};

function printButton(book) {
    createInfoButton(book);
};

function fetchInfo(e) {
    let id = e.currentTarget.id;

    fetch("http://localhost:3000/library/" + id)
    .then((res) => res.json())
    .then((bookId) => {
        console.log('Get info');
        bookId.id = id;
        printInformation(bookId);
    });
};

function printInformation(bookId) {
    const container = document.querySelector('.moreInformation');
    container.innerHTML = `
        <h2>more information about chosen book</h2>
        <p class="info">Title: ${bookId.title}</p>
        <p class="info">Author: ${bookId.author}</p>
        <p class="info">Pages: ${bookId.pages}</p>
        <p class="info">Available: ${getBookStatus(bookId)}</p>
    `;

    fetchBooks();
};

function getBookStatus(book) {
    return book.borrowed ? "No" : "Yes";
};