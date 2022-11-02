import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './navbar.module.css';
import BurgerIcon from '../icons/burgerIcon';
import CartIcon from '../icons/cartIcon';
import HeartIcon from '../icons/heartIcon';
import ProfileIcon from '../icons/profileIcon';
import ProfileAccordian from './profileAccordian';
import SearchBox from './searchBox';
import ShoeMenu from '../shoeMenu/shoeMenu';
import ShoeMenuSmall from './shoeMenuSmall';
import ProfileAccordianSmall from './profileAccordianSmall';
import logo from '../image/logo.png';


function Navbar(props) {
  let navigate = useNavigate(); 
  const itemFreq = useSelector((state) => state.cart.bill);

  var len = 0;
  if(itemFreq.length !== 0)
    len = itemFreq[0].len;

  if(len === 0){
    const bill = [{ tmrp: 0, tdis: 0, tdelfee: 0, amount: 0, len: 0 }];
    localStorage.setItem("billStore", JSON.stringify(bill));
  }
  
  function toHome(){ 
    let path = `/home`; 
    navigate(path);
  }
  function toWishList(){ 
    if(!closeMenu)
      setMenuClose(true);
    
    let path = `/wishlist`; 
    navigate(path);
  }
  function toCart(){ 
    let path = `/cart`; 
    navigate(path);
  }

  const [closeMenu, setMenuClose] = useState(true);
  const [addProfOps, setAddProfOps] = useState(false);
  const [isDragged, setIsDragged] = useState(0);

  function menuOpenHandler(event){
    setMenuClose(false);
    return;
  }
  function menuCloseHandler(event){
    setMenuClose(true);
    return;
  }

  //only for mobile users
  function menuEndDragHandler(event){
    const x = event.clientX;
    if(isDragged - x >= 50){
      setIsDragged(0);
      menuCloseHandler();
    }
    return;
  }
  function menuDragStartHandler(event){
    setIsDragged(event.clientX);
  }//only for mobile users

  function profileHandler(event){
    if(addProfOps === true)
      setAddProfOps(false);
    else
      setAddProfOps(true);
    return;
  }
  
  return (
    <div className= {classes.navbar}>
      <p className={classes.burger} onClick={menuOpenHandler}><span className={classes.menuIcons}><BurgerIcon /></span></p>
      
      <div onClick={toHome} className={classes.logo}><img src ={logo} alt = "Friction"></img></div>

      <div className={classes.cart} onClick={toCart}>
        <span className={classes.navIcons}><CartIcon /></span>
        {len !== 0 && <span className={classes.notify}>{len}</span>}
      </div>

      <SearchBox />
      
      <div className = {`${!closeMenu && classes.backdrop}  ${closeMenu && ''}`} onClick={menuCloseHandler}/>
      
      <ul className = {`${classes.navlist} ${!closeMenu && classes.menubar}  ${closeMenu && ''}`} 
      onMouseDown={menuDragStartHandler} onMouseUp={menuEndDragHandler}>

          {closeMenu && <li onMouseOver = {profileHandler} onMouseOut = {profileHandler}>
            <span className={classes.navIcons}><ProfileIcon /></span>
            Profile
            <div className = {`${classes.profileOps} ${addProfOps && classes.activeTypes}  ${!addProfOps && ''}`}>
              <ProfileAccordian />
            </div>
          </li>}
          {!closeMenu && <ProfileAccordianSmall close = {menuCloseHandler} />}

          <li onClick={toWishList}>
            <span className={classes.navIcons}><HeartIcon /></span>
            Wishlist
          </li>

          <li className={classes.cartMenu} onClick={toCart}>
            <span className={classes.navIcons}><CartIcon /></span>
            {len !== 0 && <span className={classes.notify}>{len}</span>}
            Bag
          </li>
          
          <span className={classes.showMenu}><ShoeMenuSmall /></span>
          
      </ul>

      <span className={classes.hideMenu}><ShoeMenu /></span>
      
      
    </div>
  );
}
  
export default Navbar;





  