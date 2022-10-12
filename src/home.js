// INPUT = an array of book objects
function getTotalBooksCount(books = []) {
  return books.length;
} // OUTPUT = a number of total books

// INPUT = an array of account objects
function getTotalAccountsCount(accounts=[]) {
  return accounts.length; 
} // OUTPUT = a number of total accounts

// INPUT = an array of book objects
function getBooksBorrowedCount(books) {

  // loop through books array and count the total number of books that are not returned
  return books.reduce( ( total, book ) =>{
    // if not returned, add 1 to the total count
    return book.borrows[0].returned ? total += 0 : total += 1;
  }, 0 );
} // OUTPUT = a number of books that are currently checked out

// INPUT = array of book objects
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
}// OUTPUT = an array of 5 objects or less with the most common genres

// INPUT = an array of book objects
function getMostPopularBooks(books) {

  // return array with 5 or less books, sorted by most popular (number of borrows)

  let result = [];

  // loop through books object. For each object, add the book.borrows count to result
  books.forEach( book => {
    if( result.length === 0 ){
      result = [ { name: book.title, count: book.borrows.length } ];
    } else {
      result.push( { name: book.title, count: book.borrows.length } );
    }
  });
  
  // sort from most popular (number of borrows) to least popular
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
} // OUTPUT = an array of 5 or less objects of the most popular books

// INPUT = an array of book objects, an array of author objects
function getMostPopularAuthors(books, authors) {
  let result = [];
  books.forEach( book => {

    // loop through book to find the authorId
    const authorId = book.authorId;
    const author = authors.find( author => author.id == authorId );
    const authorFullName = `${author.name.first} ${author.name.last}`;
    const findAuth = result.find( findAuth => findAuth.name === authorFullName );

    const borrows = book.borrows.length;

    // add the borrows count to result array
    if( result.length === 0 ){
      result = [ { name: authorFullName, count: borrows } ]
    } else if ( findAuth === undefined ) {
      result.push( { name: authorFullName, count: borrows } )
    } else {
      let ind = result.indexOf( findAuth );
      result[ind].count += borrows;
    }
  });

  // sort from most borrows to least
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
} // OUTPUT = an array of 5 objects or less with the most popular authors (based on number of books checked out)

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
