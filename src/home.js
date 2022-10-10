function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce( ( total, book ) =>{
    return book.borrows[0].returned ? total += 0 : total += 1;
  }, 0 );
}

// REVIEW: For/in
// INPUT Array(Objects)
// OUTPUT Array(Objects) 
function getMostCommonGenres(books) {
  // return [ { name, count } ] of 5 or less objects with common genres sorted by highest to lowest.

  let result = [];

  for(let book of books){
    // if result is empty, add new object
    if ( result.length === 0 ){
      result = [ { name: book.genre, count: 1 }]
    } else if ( result.find( genre => genre.name === book.genre) == undefined ){
      // if genre is not found, create new object with value++
      result.push( { name: book.genre, count: 1 } )
    } else {
      // if genre exists in obj, value++ 
      let genre = result.find( genre => genre.name === book.genre )
      genre.count++
    }
  }
  // sort from highest to lowest
  result.sort( ( bookA, bookB ) => {
    if( bookA.count < bookB.count ) {
      return 1;
    } 
    if( bookA.count > bookB.count ) {
      return -1;
    }
    if( bookA.count == bookB.count ) {
      return 0;
    }
  } );

  // return the first 5 or fewer
  return result.slice(0,5);
}
// getMostCommonGenres(books)

function getMostPopularBooks(books) {

  // return array with 5 or less books, sorted by most popular (number of borrows)

  let result = [];

  books.forEach( book => {
    if( result.length === 0 ){
      result = [ { name: book.title, count: book.borrows.length } ];
    } else {
      result.push( { name: book.title, count: book.borrows.length } );
    }
  });
  
  result.sort( (bookA,bookB) => {
    if( bookA.count < bookB.count ){
      return 1;
    } 
    if( bookA.count > bookB.count ){
      return -1;
    }
    if ( bookA.count == bookB.count ){
      return 0;
    }
  })
  return result.slice(0,5);
}
// getMostPopularBooks(books)

// REVIEW:
function getMostPopularAuthors(books, authors) {
  let result = [];
  books.forEach( book => {

    // loop through book to find the authorId
    const authorId = book.authorId;
    const author = authors.find( author => author.id == authorId );
    const authorFullName = `${author.name.first} ${author.name.last}`;
    const findAuth = result.find( findAuth => findAuth.name === authorFullName );

    const borrows = book.borrows.length;

    if( result.length === 0 ){
      result = [ { name: authorFullName, count: borrows } ]
    } else if ( findAuth === undefined ) {
      result.push( { name: authorFullName, count: borrows } )
    } else {
      let ind = result.indexOf( findAuth );
      result[ind].count += borrows;
    }
  });
  result.sort( ( bookA, bookB ) => {
    if( bookA.count < bookB.count ){
      return 1;
    }
    if( bookA.count > bookB.count ){
      return -1;
    }
    if( bookA.count == bookB.count ){
      return 0;
    }
  })
  return result.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
