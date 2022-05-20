import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import HelperBox from '.';


function HelperBoxModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div
    onClick={() => setShowModal(true)}
    className='tv-screen-icon-box'>
                            <img className='tv-screen-icon' src={require(`../../assets/img/help.png`).default} />
                            <p className='tv-screen-icon-text'>Help</p>
                        </div>
      {/* <button className="helper-modal-button" onClick={() => setShowModal(true)}>HELP!</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HelperBox />
        </Modal>
      )}
    </>
  );
}

export default HelperBoxModal;