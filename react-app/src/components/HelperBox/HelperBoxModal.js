import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import HelperBox from '.';


function HelperBoxModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="" onClick={() => setShowModal(true)}>CLICK HERE</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HelperBox />
        </Modal>
      )}
    </>
  );
}

export default HelperBoxModal;