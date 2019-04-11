import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import Auxillary from "../../hoc/Auxillary";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    console.log("sum", sum);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ing
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.err ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ing) {
      burger = (
        <Auxillary>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            price={this.props.totPri}
          />
        </Auxillary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.totPri}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    // {salad: true, meat: false, ...}
    return (
      <Auxillary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => {
  return { ing: state.burgerBuilder.ingredients, totPri: state.burgerBuilder.totalPrice, err: state.burgerBuilder.error };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase : () => dispatch(actionCreators.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
