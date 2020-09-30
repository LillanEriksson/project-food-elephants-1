
const API_KEY = '7d6e8cfb6aa88bd5bc4dc97bf6908874';
const API_URL = 'https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&count=18&cuisines=55';
const mainContainer = document.getElementById('mainContainer');

//fetch restaurant info
fetch(API_URL, { headers: { 'user-key': API_KEY } })
  .then((response) => {
    return response.json();
  })
  .then((italian) => {
    const restaurantArray = italian.restaurants;
    restaurantArray.forEach((restaurant) => {
      const selectedRestaurant = restaurant.restaurant;

      //REVIEW FETCH HERE, url dictated by the restaurant id
      fetch(`https://developers.zomato.com/api/v2.1/reviews?res_id=${selectedRestaurant.R.res_id}`, { headers: { 'user-key': API_KEY } })
        .then((response) => {
          return response.json();
        })
        .then((reviews) => {
          const reviewsArray = reviews.user_reviews;

          //1) slice first three reviews
          const slicedArray = reviewsArray.slice(0, 3);

          //2) print out restaurant info
          mainContainer.innerHTML += `<div class="restaurant-container">
          <img src="${selectedRestaurant.featured_image}" />
          <h2>${selectedRestaurant.name} ${selectedRestaurant.location.locality}</h2>
          <div class="info-box"><p> Average cost for two: ${selectedRestaurant.average_cost_for_two} £ </p>
          <span class="material-icons">grade</span> <p>${selectedRestaurant.user_rating.aggregate_rating}</p></div>
          <div class="review" onclick="showReview(event)">Reviews</div>
          <div class="review-text" id="review-${selectedRestaurant.id}"></div>
          </div>`;

          //loop over array of reviews and print them out
          slicedArray.forEach((review) => {
            var userReview = review.review.review_text;
            var userRatingText = review.review.rating_text;
            var userReviewTime = review.review.review_time_friendly;
            document.getElementById(`review-${selectedRestaurant.id}`).innerHTML += `<p>${userRatingText} ${userReview}, ${userReviewTime}</p>`;
          })
        })
    });

    restaurantArray.map((resId) => {
      const restaurantId = resId.restaurant.R.res_id;
      return restaurantId;
    });
  });



  const showReview = (event) => {
    event.target.classList.toggle('open');
  }
