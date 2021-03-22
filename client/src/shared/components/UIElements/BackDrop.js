import ReactDOM from 'react-dom';

import './BackDrop.css';

const Backdrop = props => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}>
            {props.children}
        </div>,
        document.getElementById('backdrop-hook')
    )
}

export default Backdrop;