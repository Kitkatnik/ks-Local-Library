// INPUT = an array of account objects, a string ID of a single account object 
function findAccountById(accounts, id) {
  // loop through accounts array and find the first account that has an ID that matches the ID parameter.
  return accounts.find( account => account.id === id);
} // OUTPUT = return the account object

// INPUT = an array of account objects
function sortAccountsByLastName(accounts) {
  // loop through accounts array and sort by last name
  return accounts.sort( (accountOne,accountTwo) => {
    const nameA = accountOne.name.last;
    const nameB = accountTwo.name.last;
    if (nameA < nameB) return -1; 
    if (nameA > nameB) return 1; 
    return 0;
  });
} // OUTPUT = sorted array of account objects

// INPUT = an account objects, an array of book objects
function getTotalNumberOfBorrows(account, books) {
  // get id from account object
  const {id} = account; 

  // loop through books array and return the totla number of times the account's ID appears in any book's borrows array
  return books.reduce( ( total, currBook) => {
    const borrowed = currBook.borrows
    return total += borrowed.reduce( (count, item) => {
      return item.id === id ? count+=1 : count += 0;
    }, 0 ) 
  },0);
} // OUTPUT = total number 

// helper functions for getting author object matching the ID parameter
function findAuthor(authors, id){
  return authors.find( author => author.id === id );
}

// INPUT = an account object, an array of book objects, an array of author objects
function getBooksPossessedByAccount(account, books, authors) {
  const acctId = account.id;

  return books
    .filter( book => { // filter out all books that has a book checked out
      const borrowed = book.borrows[0];
      return borrowed.id === acctId && borrowed.returned === false
    })
    .map( book => { // return an array of filtered book objects including author information
      let { id, title, genre, authorId, borrows } = book;
      let author = findAuthor(authors, authorId);
      return { id, title, genre, authorId, author, borrows }
    })
} // OUTPUT = an array of objects

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
