import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import HelperBox from '.';


function HelperBoxModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="helper-modal-button" onClick={() => setShowModal(true)}>HELP!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HelperBox />
        </Modal>
      )}
    </>
  );
}

export default HelperBoxModal;