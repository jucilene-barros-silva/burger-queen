import React from 'react';
import Modal from '@material-ui/core/Modal';
import BtHamburger from './FormModal/FormModal.js';
import './FormModal/FormModal.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SimpleModal({openModal, closeModal}) {
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div style={modalStyle}>
      <Modal 
        open={openModal}
        onClose={closeModal}          
      >
        <BtHamburger />
      </Modal>
    </div>
  );
}
