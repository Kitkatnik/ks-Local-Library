function findAccountById(accounts, id) {
  return accounts.find( account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort( (accountOne,accountTwo) => {
    const nameA = accountOne.name.last;
    const nameB = accountTwo.name.last;
    if (nameA < nameB) return -1; 
    if (nameA > nameB) return 1; 
    return 0;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const acctId = account.id; // string 

  return books.reduce( ( total, currBook) => {
    const borrowed = currBook.borrows
    return total += borrowed.reduce( (count, item) => {
      return item.id === acctId ? count+=1 : count += 0;
    }, 0 ) 
  },0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const acctId = account.id;

  function findAuthor(authors, id){
    return authors.find( author => author.id === id );
  }

  return books
    .filter( book => {
      const borrowed = book.borrows[0];
      return borrowed.id === acctId && borrowed.returned === false
    })
    .map( book => {
      let { id, title, genre, authorId, borrows } = book;
      let author = findAuthor(authors, authorId);
      return { id, title, genre, authorId, author, borrows }
    })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
