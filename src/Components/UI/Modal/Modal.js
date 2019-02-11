import React from 'react';
import styles from './Modal.css';
import Auxillary from '../../../hoc/Auxillary';
import BackDrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Auxillary>
    <BackDrop show = {props.show} clicked = {props.modalClosed}/>
    <div style = {{transform : props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity : props.show ? '1' : '0'}}className = {styles.Modal}>
       {props.children} 
    </div>
    </Auxillary>
);

export default modal;