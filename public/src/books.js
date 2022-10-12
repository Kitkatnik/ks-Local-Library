// INPUT = an array of author objects and an integer ID of a single author object
function findAuthorById(authors, id) {
  return authors.find( author => author.id === id)
} // OUTPUT = the author object that has the matching ID

// INPUT = an array of book objects and a string ID of a single book object
function findBookById(books, id) {
  return books.find( book => book.id === id)
} // OUTPUT = the book object that has the matching ID

// INPUT = an array of book objects
function partitionBooksByBorrowedStatus(books) {
  // filter out all books that has some books checked out (item.returned === false)
  let checkedOut = books.filter( book => {
    const borrows = book.borrows;
    return borrows.some( item => item.returned === false );
  });

  // filter out all books that has all books returned (item.returned === true)
  let returned = books.filter( book => {
    const borrows = book.borrows;
    return borrows.every( item => item.returned === true);
  });

  // return an array with two arrays inside of it, with checked out books in the first array and returned books in the second array
  let result = [checkedOut, returned];
  return result;
} // OUTPUT = an array of arrays

// INPUT = a book object, an array of all account objects
function getBorrowersForBook(book, accounts) {
  let { borrows } = book; 

  // loop through book.borrows array and return all books matching the given Book ID, including the returned entry 
  return borrows.map( item => {
    // find the matching books by ID 
    let found = accounts.find( account => {
      return account.id === item.id; 
    })
    return {...found, returned: item.returned}

  }).slice(0,10) 
} // OUTPUT = an array of ten or less account objects

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

