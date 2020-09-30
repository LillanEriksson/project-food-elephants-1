const API_KEY = '7d6e8cfb6aa88bd5bc4dc97bf6908874';
const API_URL =
  'https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&cuisines=55';

const mainContainer = document.getElementById('mainContainer');


//fetch restaurant reviews
const REVIEWS_URL = "https://developers.zomato.com/api/v2.1/reviews?res_id=6113850";

fetch(REVIEWS_URL, { headers: { 'user-key': API_KEY } })
  .then((response) => {
    return response.json();
  })
  .then((reviews) => {
    //start function 
    const reviewsArray = reviews.user_reviews;

    //1) sort based on timestamp try slice() first
    const slicedArray = reviewsArray.slice(0, 3);
    console.log(`Sliced array: ${slicedArray}`);

    //2) choose the first 3 -> use slice() based on index -> save in new variable (array) - forEach on that array

    //loop over array of reviews and print them out
    slicedArray.forEach((review) => {
      var userReview = review.review.rating_text;
      var userReviewTime = review.review.review_time_friendly;
      // console.log(`Review: ${userReview}`);
      // console.log(`Review time: ${userReviewTime}`);
      mainContainer.innerHTML += `<p>${userReview}, ${userReviewTime}</p>`;
    })

  })



//fetch restaurant info
fetch(API_URL, { headers: { 'user-key': API_KEY } })
  .then((response) => {
    return response.json();
  })
  .then((italian) => {
    console.log(italian.restaurants);

    const restaurantArray = italian.restaurants;
    restaurantArray.forEach((restaurant) => {
      const selectedRestaurant = restaurant.restaurant;

      mainContainer.innerHTML += `<div class="restaurant-container">
      <img src="${selectedRestaurant.featured_image}" />
      <h2>${selectedRestaurant.name} ${selectedRestaurant.location.locality}</h2>
      <p>Average cost: ${selectedRestaurant.average_cost_for_two}</p>
      <p>Rating: ${selectedRestaurant.user_rating.aggregate_rating}</p>
      </div>`;
      //incorporate function with <p> and review?
    });

    //loop through restaurants and print out res_ids
    // restaurantArray.forEach((resId) => {
    //   const restaurantId = resId.restaurant.R.res_id;
    //   console.log(`Restaurant ID ${restaurantId}`);

    restaurantArray.map((resId) => {
      const restaurantId = resId.restaurant.R.res_id;
      console.log(`Restaurant ID: ${restaurantId}`);
      return restaurantId;
    });


    //let forEachBook = []; data.items.forEach(book => { const author = book.volumeInfo.authors; const title = book.////volumeInfo.title; const description = book.volumeInfo.description; const singleObject = { author, title, ////
    //description }; forEachBook.push(singleObject); });
  });



