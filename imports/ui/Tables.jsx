import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Modal} from "semantic-ui-react";

class Tables extends Component {

 state = {
  serves: [],
  serveList: [],
 };
 const;

 componentDidMount() {
  const {serveList, serves} = this.state;
  const {changeActivePage, changeSelectedTable} = this.props;

  Meteor.call('getAllServe', (err, serves) => {
   this.setState({serves: serves}, () => {
    for (let i = 1; i < 21; i++) {
     if (i < 11) {
      if (serves.some(serve => serve.tableID === i)) {
       serveList.push(
        <Card
         color="green"
         link
         header={i}
         meta="outside"
         description="open"
         onClick={() => {
          changeActivePage("Bill");
          changeSelectedTable(i);
         }}
        />);
      } else {
       serveList.push(
        <Card
         color="green"
         link
         header={i}
         meta="outside"
         description="empty"
         onClick={() => {
          this.setState({
           selectedTable: {
            tableID: i,
            tableType: 'outside'
           }, open: true
          });
          changeSelectedTable(i);
         }
         }
        />);
      }
     } else {

      if (serves.some(serve => serve.tableID === i)) {
       serveList.push(
        <Card
         color="brown"
         link
         header={i}
         meta="inside"
         description="open"
         onClick={() => {
          changeActivePage("Bill");
          changeSelectedTable(i);
         }}
        />);
      } else {
       serveList.push(
        <Card
         color="brown"
         link
         header={i}
         meta="inside"
         description="empty"
         onClick={() => {
          this.setState({
           selectedTable: {
            tableID: i,
            tableType: 'inside'
           }, open: true,
          });
          changeSelectedTable(i);

         }
         }
        />);
      }


     }
    }
    this.setState(serveList);
   });
  });
 }

 openNewServe = () => {
  const {selectedTable} = this.state;
  const {changeSelectedTable, changeActivePage} = this.props;
  this.setState({open: false});
  changeSelectedTable(selectedTable.tableID);
  Meteor.call('openServe', selectedTable, (err, res) => {

   changeActivePage('Bill');
  });
 };


 render() {
  const {serveList, open} = this.state;
  return (
   <div>

    <Modal size="mini" open={open} onClose={() => {
     this.setState({open: false});
    }}>
     <Modal.Header>Serve </Modal.Header>
     <Modal.Content>
      <p>Are you sure open the serve ?</p>
     </Modal.Content>
     <Modal.Actions>
      <Button color="orange" onClick={() => {
       this.setState({open: false});
      }}>No</Button>
      <Button
       onClick={() => {
        this.openNewServe()
       }}
       color="teal"
       icon='checkmark'
       labelPosition='right'
       content='Yes'
      />
     </Modal.Actions>
    </Modal>


    <Grid>
     <Grid.Row>
      <Header as='h1' icon textAlign='center' style={{marginTop: '4%'}}>
       <Icon name='users'/>
       <Header.Content>ARTICULUS LOKANTA</Header.Content>
      </Header>

     </Grid.Row>
     <Grid.Row style={{marginTop: '10%'}}>
      <Grid.Column width={2}/>
      <Grid.Column width={12}>
       <Card.Group itemsPerRow={10}>

        {serveList}

       </Card.Group>
      </Grid.Column>
      <Grid.Column width={2}/>

     </Grid.Row>
    </Grid>
   </div>
  );
 }
}

export default Tables;
