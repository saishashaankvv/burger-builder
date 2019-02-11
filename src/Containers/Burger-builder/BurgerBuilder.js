import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 0.7,
    cheese : 0.4,
    meat : 1.3
    };

class BurgerBuilder extends Component { 
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients)
                          .map((igKey) => {
                            return ingredients[igKey];
                          })
                          .reduce((sum, el) => {
                            return sum + el;                            
                          },0);
        this.setState({purchasable : sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    };

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            
                <Auxillary>
                    <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                        <OrderSummary ingredients = {this.state.ingredients}/>
                    </Modal>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls price = {this.state.totalPrice}
                                   ingredientAdded = {this.addIngredientHandler} 
                                   disabled = {disabledInfo} 
                                   purchasable = {this.state.purchasable}
                                   ingredientRemoved = {this.removeIngredientHandler}
                                   ordered = {this.purchaseHandler} />
                </Auxillary>
            
        );
    }
}

export default BurgerBuilder; 