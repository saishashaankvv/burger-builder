import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Meat', type : 'meat'},
    {label : 'Cheese', type : 'cheese'}
];
const buildControls = (props) =>(
    <div className = {styles.BuildControls}>
      <p> Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => {
           return <BuildControl key = {ctrl.label} 
           disabled = {props.disabled[ctrl.type]} 
           label = {ctrl.label} 
           added = {() => props.ingredientAdded(ctrl.type)} 
           removed = {() => props.ingredientRemoved(ctrl.type)}/>;
        })}
    <button className = {styles.OrderButton} disabled = {!props.purchasable} onClick = {props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;