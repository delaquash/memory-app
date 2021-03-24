import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';
import Backdrop from '../UIElements/BackDrop';

 const MainNavigation =(props)=> {
     const [ isDrawerOpened, setDrawerOpened ] = useState(false);

     const openDrawerHandler = () => {
         setDrawerOpened(true)
     }

     const closeDrawerHandler= ()=> {
         setDrawerOpened(false)
     }
    return (
        <React.Fragment>
            {isDrawerOpened && <Backdrop onClick={closeDrawerHandler} />}
                <SideDrawer show={isDrawerOpened} >
          <nav className="main-navigation__drawer-nav">
            <NavLinks/>
          </nav>
      </SideDrawer> 
        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
               <Link to='/'>
                    Your places
               </Link> 
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks />
            </nav>
        </MainHeader>
                </React.Fragment>
      
    )
}
export default MainNavigation;