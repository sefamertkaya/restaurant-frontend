const axios = require('axios');

Meteor.methods({
 getAllServe() {
  return axios.get('http://localhost:8080/get-all-serve').then((response) => {
   console.log(response.data);
   return response.data;
  });
 }
});
