const books = {
  "Rich Dad Poor Dad": {
    description: `Genre: Personal Finance, Self-help, Business<br>
    Language: English<br>
    Format: Hardcover, Paperback, eBook, Audiobook<br>
    Publication Year: 1997<br>
    Author: Robert Kiyosaki<br>
    Reader reviews and ratings: 4.7/5`,
    image: "./image/rich dad poor dad.jfif"
  },
  "Persuasion": {
    description: `Genre: Classic, Romance, Fiction<br>
    Language: English<br>
    Format: Hardcover, Paperback, eBook, Audiobook<br>
    Publication Year: Published posthumously<br>
    Author: Jane Austen<br>
    Reader reviews and ratings: 4.2/5`,
    image: "./image/persuasion.jfif"
  },
  "Psychology of Money": {
    description: `Genre: Personal Finance, Psychology, Self-help<br>
    Language: English<br>
    Format: Hardcover, Paperback, eBook, Audiobook<br>
    Publication Year: 2020<br>
    Author: Morgan Housel<br>
    Reader reviews and ratings: 4.5/5`,
    image: "./image/psycology of money.jfif"
  }
};

let selectedRating = 0;

function showBookDetails() {
  const selectedBook = document.getElementById("bookSelect").value;
  const bookDetails = document.getElementById("bookDetails");
  const selectedBookName = document.getElementById("selectedBookName");

  if (books[selectedBook]) {
    const { description, image } = books[selectedBook];
    bookDetails.innerHTML = `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image}" class="img-fluid rounded-start" alt="${selectedBook}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${selectedBook}</h5>
              <p class="card-text">${description}</p>
            </div>
          </div>
        </div>
      </div>`;
    selectedBookName.textContent = `Reviewing: ${selectedBook}`;
    displayReviews(selectedBook);
  } else {
    bookDetails.innerHTML = "";
    selectedBookName.textContent = "";
    document.getElementById("reviewList").innerHTML = "";
  }
}

function renderStars() {
  const starContainer = document.getElementById("starRating");
  starContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.innerHTML = "★";
    star.dataset.value = i;

    star.addEventListener("mouseover", () => {
      highlightStars(i);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = i;
      highlightStars(i);
    });

    starContainer.appendChild(star);
  }
}

function highlightStars(count) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("hovered", index < count);
    star.classList.toggle("selected", index < selectedRating);
  });
}

function submitReview() {
  const selectedBook = document.getElementById("bookSelect").value;
  const name = document.getElementById("reviewerName").value;
  const review = document.getElementById("reviewText").value;
  const date = new Date().toLocaleDateString();

  if (!selectedBook || !name || !review || selectedRating === 0) {
    alert("Please fill in all fields and select a rating.");
    return;
  }

  const newReview = {
    name,
    review,
    rating: selectedRating,
    date,
    book: selectedBook
  };

  let reviews = JSON.parse(localStorage.getItem(selectedBook)) || [];
  reviews.push(newReview);
  localStorage.setItem(selectedBook, JSON.stringify(reviews));

  document.getElementById("reviewerName").value = "";
  document.getElementById("reviewText").value = "";
  selectedRating = 0;
  highlightStars(0);

  displayReviews(selectedBook);
}

function displayReviews(book) {
  const reviewList = document.getElementById("reviewList");
  const reviews = JSON.parse(localStorage.getItem(book)) || [];

  reviewList.innerHTML = reviews.map(r => `
    <li class="list-group-item">
      <h5 class="mb-1">${r.book}</h5>
      <p class="mb-1"><strong>${r.name}</strong> - <small>${r.date}</small></p>
      <p class="mb-1">Rating: ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
      <p>${r.review}</p>
    </li>
  `).join("");
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bookSelect").addEventListener("change", showBookDetails);
  renderStars();
});
