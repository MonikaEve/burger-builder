import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state ={
        purchasable:false,
        purchasing:false,
        error:false,
        building:false
    }
    
    componentDidMount (){
        this.props.onInitIngredients();
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {return sum+el;
        },0);
        return sum>0;
    }

  /*this method fails because if the method is triggered through an event. The this keyword does not refer to the class; this is not the case for removeIngredientHandler, because it uses an arrow funciton which contains the state of this
    purchaseHandler () {
        this.setState({purchasing:true});
    }
    change to arrow function to fix the this problem*/

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});    
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }      
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
       // alert('You are continuing!');
       // on a real application the price should be calculated on the server, to prevent the user from manipulating the price before sending the data
       this.props.onInitPurchase(); 
       this.props.history.push('/checkout'); 
    }

    render(){
        const disabledInfo ={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients can't be loaded!</p>:<Spinner/>

        if(this.props.ings){
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable ={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price}
                    isAuth={this.props.isAuthenticated}
                    ordered={this.purchaseHandler}/>
            </Aux>
            );
                    
        orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        }
        
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
         
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));