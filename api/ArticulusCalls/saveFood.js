const axios = require('axios');

Meteor.methods({
 saveFood(tableID, food) {
  console.log("burda")
  return axios.post(`http://localhost:8080/save-food/${tableID}/${food}`).then((response) => {
   console.log(response);
   return response.data;
  });
 }
});
