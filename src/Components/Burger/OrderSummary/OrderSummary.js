import React from 'react';
import Auxillary from '../../../hoc/Auxillary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return (<li key={igKey}>
                <span style = {{textTransform : 'capitalize'}}>{igKey} : </span> {props.ingredients[igKey]}
               </li>);
    });
   return (<Auxillary>
        <h3>Your Order</h3>
        <p> A delicious Burger with the following Ingredients : </p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
    </Auxillary>);
};

export default orderSummary;