const axios = require('axios');

Meteor.methods({
 openServe(selectedTable) {

  console.log(selectedTable)
  return axios.post('http://localhost:8080/open-serve', selectedTable).then((response) => {

   console.log(response);
  });
 }
});
