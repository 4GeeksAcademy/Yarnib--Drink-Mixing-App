
import { Link } from "react-router-dom";
import React, {  useState, useEffect,useContext } from 'react'
import { useParams } from 'react-router'
import { Context } from '../store/appContext'


const Demo = () => {
    const { store, actions } = useContext(Context);
    let params = useParams();
    console.log(params);
    let item = store[`${params.type}`][`${params.id}`];
    console.log(item);
    let fields; {
        fields = (
            <div className='fixed-about'>
                <div className='top'>
                    
                    <div><h2 className="drink-title">{item?.strDrink}</h2>
                    <p>
                    </p>
                    </div>
                </div>
                    <hr></hr>
                <div className='bottom'>
                    <h2>{item?.strAlcoholic}</h2>
                    <h2>{item?.strGlass}</h2>
                    <h2>{item?.strInstructions}</h2>
                    
                </div>
            </div>
        );
  
   
    return (
        <div><div>{fields}</div>
		<div><Link to={"/demo/"}>
		<span>Link to: {item.strDrink}</span>
	</Link></div></div>
    );
};
}
export default Demo;
