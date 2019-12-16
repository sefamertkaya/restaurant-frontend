import React, {Component} from 'react';
import {Button, Card, Grid, Icon, List, Modal} from "semantic-ui-react";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";

class Bill extends Component {
 state = {
  foodList: [],
  foodNameList: [],
  open: false,
  price: '',
 };


 componentDidMount() {
  const {selectedTable} = this.props;
  const {foodList} = this.state;

  Meteor.call('getFoods', selectedTable, (err, res) => {
   res.forEach((food) => {
    foodList.push(<List.Item>
      <List.Content>
       <List.Header>{food}</List.Header>
      </List.Content>
     </List.Item>
    );
   });
   this.setState({foodNameList: res, foodList});
  });
 }


 addFoodToBill = (food) => {
  const {foodList, foodNameList} = this.state;
  const {selectedTable} = this.props;

  Meteor.call('saveFood', selectedTable, food);

  foodNameList.push(food);
  foodList.push(<List.Item>
    <List.Content>
     <List.Header>{food}</List.Header>
    </List.Content>
   </List.Item>
  );

  this.setState(foodList);
  this.setState(foodNameList);
 };

 saveFoodBill = () => {
  const {foodNameList} = this.state;
  const {selectedTable} = this.props;

  Meteor.call('payment', foodNameList, (err, res) => {
   this.setState({open: true});
   this.setState({price: res});
  })
 };


 render() {

  const {foodList, price, open} = this.state;
  const {changeActivePage, selectedTable} = this.props;

  return (
   <div>


    <Modal size="mini" open={open} onClose={() => {
     this.setState({open: false});
    }}>
     <Modal.Header>Payment</Modal.Header>
     <Modal.Content>
      <p>Amount due: {price}</p>
     </Modal.Content>

    </Modal>


    <Grid>
     <Grid.Row style={{marginTop: '2%'}}>
      <Header as='h1' icon textAlign='center'>
       <Header.Content>{selectedTable} NUMARALI MASA</Header.Content>
      </Header>
     </Grid.Row>

     <Grid.Row style={{marginTop: '3%'}}>

      <Grid.Column width={3}>
       <Button color="teal" style={{marginLeft: '10%'}} onClick={() => {
        changeActivePage('Tables')
       }}>
        <i className="fas fa-arrow-circle-left"></i>
        {' '}
        Back
       </Button>

      </Grid.Column>


      <Grid.Column width={4}>
       <Message
        icon='inbox'
        header='Bilgilendirme'
        content='Faturaya eklemek istediğiniz yemek türünün üzerine tıklayınız.'
       />

       <br/>

       <Card
        color="orange"
        link
        header="LAHMACUN"
        meta="Fiyat 30 ₺"
        description="Acılı,Kaşarlı vb. çeşitleri mevcuttur."
        onClick={() => {
         this.addFoodToBill("Lahmacun")
        }}
       />
       <Card
        color="orange"
        link
        header="HAMBURGER"
        meta="Fiyat 40 ₺"
        description="Hamburger çeşitleri sınırlıdır."
        onClick={() => {
         this.addFoodToBill("Hamburger")
        }}
       />
       <Card
        color="orange"
        link
        header="DONER"
        meta="Fiyat 20 ₺"
        description="Döner mevcuttur."
        onClick={() => {
         this.addFoodToBill("Doner")
        }}
       />
       <Card
        color="orange"
        link
        header="KOFTE"
        meta="Fiyat 15 ₺"
        description="Köfte yanında patates ikramı yapılır."
        onClick={() => {
         this.addFoodToBill("Kofte")
        }}
       />
       <Card
        color="orange"
        link
        header="KEBAP"
        meta="Fiyat 20 ₺"
        description="Kebaplar urfa,adana vs."
        onClick={() => {
         this.addFoodToBill("Kebap")
        }}
       />


      </Grid.Column>

      <Grid.Column width={1}/>


      <Grid.Column width={4}>
       <Segment secondary>
        <Header textAlign="center">Fatura</Header>
        <List divided selection verticalAlign='middle'>
         {foodList}
        </List>

        <Button color="linkedin"
                onClick={() => {
                 this.saveFoodBill();
                }}
        >
         <Icon name="payment"/>
         {' '}
         Hesabı Öde</Button>

       </Segment>
      </Grid.Column>

     </Grid.Row>
    </Grid>
   </div>
  );
 }
}


export default Bill;
