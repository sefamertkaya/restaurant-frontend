const axios = require('axios');

Meteor.methods({
 payment(object) {
  return axios.post('http://localhost:8080/payment', object).then((response) => {
   console.log(response);
   return response.data;
  });
 }
});
