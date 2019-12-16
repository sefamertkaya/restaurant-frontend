import React, {Component} from 'react';
import Tables from "./Tables";
import Bill from "./Bill";

class Home extends Component {
 state = {
  activePage: null,
  selectedTable: '',
 };

 changeActivePage = (page) => {
  this.setState({activePage: page});
 };

 changeSelectedTable = (tableID) => {

  this.setState({selectedTable: tableID});
 };


 render() {
  const {activePage, selectedTable} = this.state;
  let page = null;

  switch (activePage) {
   case null:
   case "Tables":
    page = <Tables changeActivePage={this.changeActivePage} changeSelectedTable={this.changeSelectedTable}/>;
    break;

   case "Bill":
    page = <Bill changeActivePage={this.changeActivePage}
                 changeSelectedTable={this.changeSelectedTable}
                 selectedTable={selectedTable}
    />;
    break;

   default:
    page = <Tables changeActivePage={this.changeActivePage} changeSelectedTable={this.changeSelectedTable}/>;
    break;
  }

  return (page);
 }
}

export default Home;
