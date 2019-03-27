import React from "react";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
  return (
    <div className = {classes.CheckoutSummary}>
      <h1>We Hope it tastes Well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continued}>SUCCESS</Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
