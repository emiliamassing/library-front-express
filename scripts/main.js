let availableBookList = document.querySelector('.availableBookList');

fetch("http://localhost:3000/library")
.then(res => res.json())
.then(data => {
    printBooks(data);
});

function printBooks(books) {
    console.log(books);

    availableBookList.innerHTML = '';

    books.map(book => {
        let liElement = document.createElement('li');
        liElement.id = book.id;
        liElement.innerHTML = book.title;

        availableBookList.appendChild(liElement);
        checkIfBorrowed(book);
    });
};

function checkIfBorrowed(book) {
    const pElement = document.createElement('p');
    if(book.borrowed === false){
        pElement.innerHTML = 'Available';
        pElement.className = 'available';
    } else {
        pElement.innerHTML = 'Borrowed';
        pElement.className = 'borrowed';
    };

    availableBookList.appendChild(pElement);
};

function borrowBook(book) {
    const borrowButton = createElement('button');
    borrowButton.innerHTML = 'Borrow Book';
    borrowButton.id = book.id;
};