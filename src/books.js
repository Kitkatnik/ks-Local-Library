function findAuthorById(authors, id) {
  return authors.find( author => author.id === id)
}

function findBookById(books, id) {
  return books.find( book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = books.filter( book => {
    const borrows = book.borrows;
    return borrows.some( item => item.returned === false );
  });

  let returned = books.filter( book => {
    const borrows = book.borrows;
    return borrows.every( item => item.returned === true);
  });

  let result = [checkedOut, returned];
  return result;
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book; 

  return borrows.map( item => { 
    let found = accounts.find( account => {
      return account.id === item.id; 
    })
    return {...found, returned: item.returned}

  }).slice(0,10) 
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

