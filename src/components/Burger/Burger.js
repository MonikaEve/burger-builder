import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './Burgeringredient/Burgeringredient'

const burger = (props) => {
    //1: Object.keys: this method turns keys of object into an array. the values are not included
    //2.: .map: maps along the array of keys and returns a two dimensional array of props.ingredients[igKey] [[undefined0], [undefined0, undefined1]]
    //3.: .map: maps along the props.ingredients[igKey] entry to add a key and type for every array entry [[salad0], [cheese0, cheese1]]
    //4.: .reduce: flatens the array to a one dimensional array. So if all ingredients are 0, the array will have no entries

    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
           return <BurgerIngredient key={igKey + i} type = {igKey}/>;
        }); 
    })
    .reduce((arr, el) =>{
        return arr.concat(el)
    },[]);
    
    if(transformedIngredients.length ===0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;