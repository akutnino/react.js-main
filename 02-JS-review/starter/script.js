const data = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// Destructuring
const book = getBook(3);
const bookTitle = book.title;
const bookAuthor = book.author;

const {
  id,
  title,
  publicationDate,
  author,
  genres,
  hasMovieAdaptation,
  pages,
  translations,
  reviews,
} = book;

// Rest Operator
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;

// Spread Operator
const newGenres = [...genres, 'epic fantasy'];
const updateBook = { ...book, publicationDate: '1954-07-29' };
updateBook.pages = 1210;

// Template Literals
const summary = `${title} is a book about ${genres.join(', ')} 
written by ${author}, and it has ${hasMovieAdaptation ? '' : 'not'} 
been adopted as a movie.`;

// Ternary Operator
const pagesOverview = pages > 1000 ? 'pages over 1000' : 'pages less than 1000';

// Functions
function getYear(string) {
  return Number(string.split('-')[0]);
}

const getMonth = (string) => Number(string.split('-')[1]);

// console.log(getMonth(publicationDate));

// Short-Circuiting and Logical Operators ==================
// console.log(true && 'some string');
// console.log(false && 'some string');
// console.log(hasMovieAdaptation && 'This book has a movie adaptaion');

// console.log(true || 'some string');
// console.log(false || 'some string');
// const englishTranslation = book.translations.english || 'NOT TRASLATED';
// console.log(englishTranslation);

// Optional Chaining and Nullish Coalescing Operator ==================
function totalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}
// console.log(totalReviewCount(book));

// Array Methods
/**
 * 1.) map() method.
 * const output = array.map((element, index, arr) => {return});
 *
 * 2.) filter() method.
 * const output = array.filter((element, index, arr) => {return});
 *
 * 3.) reduce() method.
 * const output = array.filter((acc, element, index, arr) => {return acc});
 *
 * 4.) sort() method.
 *
 * const output = array.filter((a, b) => {return a - b});
 **/

// Promises
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url)
  .then((data) => data.json())
  .then((data) => console.log(data));

// Async / Await
async function getTodos() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}

getTodos();
