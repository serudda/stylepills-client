import * as React from 'react';
import { Modal } from 'semantic-ui-react';

const BasicModal = (props: any) => {

  const {text} = props;

  const trigger = (<button type="button">Basic Modal</button>);
  
  return (
    <Modal trigger={trigger} basic={true} size="fullscreen" closeIcon={true}>
      <Modal.Content>
        <p>{text}</p>
      </Modal.Content>
      <Modal.Actions>
        <button>No</button>
        <button>Yes</button>
      </Modal.Actions>;
    </Modal>
  );
};

export default BasicModal;