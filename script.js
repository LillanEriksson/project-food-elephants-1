
const API_KEY = "7d6e8cfb6aa88bd5bc4dc97bf6908874";
const API_URL = "https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&cuisines=55";

const mainContainer = document.getElementById("mainContainer");

fetch(API_URL, {headers: {"user-key": API_KEY}})
  // .then(res => res.json())
  .then((response) => {
    return response.json();
  })
  .then((italian) => {
    console.log(italian.restaurants);

    const restaurantArray = italian.restaurants;
    restaurantArray.forEach(restaurant => {
      const selectedRestaurant = restaurant.restaurant;
      console.log(selectedRestaurant.name);
      console.log(`Average cost: ${selectedRestaurant.average_cost_for_two}`);
      console.log(`Address: ${selectedRestaurant.location.address}`);
      
      mainContainer.innerHTML += `<img src="${selectedRestaurant.featured_image}" />`; 
      


    });
    // console.log(italian.restaurants.restaurant.name);
  })

  
