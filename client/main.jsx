import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import Home from "../imports/ui/Home";


Meteor.startup(() => {
 render(<Home/>, document.getElementById('react-target'));
});
