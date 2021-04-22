

import Button from '../FormElements/Button';
import Modal from './Modal';


const ErrorModal = props=> {
    return(
        <Modal 
            onCancel={props.clear}
            header="An error occurred"
            show={!!props.error}
            footer={<Button 
                onClick={props.onClear}>
                </Button>}
        >
            <p>{props.error}</p>
        </Modal>
    )
}

export default ErrorModal;