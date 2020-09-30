
const API_KEY = "7d6e8cfb6aa88bd5bc4dc97bf6908874";
const API_URL = "https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&count=18&cuisines=55";
const API_URL_20 = "https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&cuisines=55";

const mainContainer = document.getElementById("mainContainer");

fetch(API_URL, {headers: {"user-key": API_KEY}})
  .then((response) => {
    return response.json();
  })
  .then((italian) => {
    //console.log(italian.restaurants);

    const restaurantArray = italian.restaurants;
    restaurantArray.forEach(restaurant => {
      const selectedRestaurant = restaurant.restaurant; 
      mainContainer.innerHTML += `<div class="restaurant-container">
      <img src="${selectedRestaurant.featured_image}" />
      <h2>${selectedRestaurant.name} ${selectedRestaurant.location.locality}</h2>
      <p>Average cost: ${selectedRestaurant.average_cost_for_two}</p>
      <p>Rating: ${selectedRestaurant.user_rating.aggregate_rating}</p>
      </div>`; 
      


    });
  })

  
