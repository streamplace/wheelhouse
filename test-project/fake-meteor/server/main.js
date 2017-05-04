import { Meteor } from "meteor/meteor";
import Chance from "chance";

const chance = new Chance();

Meteor.startup(() => {
  setInterval(() => {
    /*eslint-disable no-console*/
    console.log(chance.sentence());
  }, 3000);
  // code to run on server at startup
});
