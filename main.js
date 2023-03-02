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
    });
};