import ReactDom from 'react-dom';
import './SideDrawer.css';

const SideDrawer= (props) => {
   const content =
        <aside className="side-drawer">
            {props.children}
        </aside>;
    return ReactDom.createPortal(content, document.getElementById('drawer-hooks'))
   
};

export default SideDrawer;