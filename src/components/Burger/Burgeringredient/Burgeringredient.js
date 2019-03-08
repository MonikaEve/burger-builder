import React, {Component} from 'react'
import classes from './Burgeringredient.css'
import PropTypes from 'prop-types';

//to use prop types the component needs to be a class. It stays a component (not container), because the state will not be managed here
class BurgerIngredient extends Component{
    render(){
        
    let ingredient = null;

    switch(this.props.type){
        case('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
        case('bread-top'):
        ingredient=(
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
        );
        break;
        case ('meat'):
        ingredient = <div className={classes.Meat}></div>;
        break;
        case ('cheese'):
        ingredient = <div className={classes.Cheese}></div>;
        break;
        case ('salad'):
        ingredient = <div className = {classes.Salad}></div>
        break;
        case ('bacon'):
        ingredient = <div className = {classes.Bacon}></div>
        break;
        default:
        ingredient = null;
        
    }
    return ingredient;
}
}

 BurgerIngredient.propTypes = {
    type:PropTypes.string.isRequired
};

export default BurgerIngredient;