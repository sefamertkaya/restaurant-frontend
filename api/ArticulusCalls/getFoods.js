const axios = require('axios');

Meteor.methods({
 getFoods(tableID) {
  console.log("AAA");
  console.log(tableID);
  return axios.get(`http://localhost:8080/get-foods/${tableID}`).then((response) => {
   return response.data;
  });
 }
});
