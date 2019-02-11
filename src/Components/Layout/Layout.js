import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import styles from './Layout.css';

const layout = (props) => (
    <Auxillary>
    <div>Toolbar, SideNav, BackDrop</div>
    <main className = {styles.Content}>
        {props.children}
    </main>
    </Auxillary>
);

export default layout;