import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max Schwarzmüller",
        address: {
          street: "Teststreet 1",
          zipCode: "41351",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/order.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
    console.log(this.props.ingredients);
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your Name"
        />
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your Email"
        />
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your Street"
        />
        <input
          type="text"
          name="name"
          className={classes.Input}
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
