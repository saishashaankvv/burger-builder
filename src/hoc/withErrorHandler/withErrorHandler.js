import React, { Component } from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Auxillary from '../Auxillary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
           this.requestInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
           this.responseInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount(){
            console.log('[ErrorHandler.js] will unmonunt');
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxillary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            );
        }
    }
}

export default withErrorHandler;