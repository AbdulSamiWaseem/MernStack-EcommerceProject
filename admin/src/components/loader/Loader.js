import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {TailSpin} from 'react-loader-spinner'
const Loader = (props) => {
  // console.log("flag",props.flag)
  return (
    <Modal show={props.flag} onHide={() => { }} contentClassName='d-flex justify-content-center align-items-center bg-transparent border-0' centered>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        
      />
    </Modal>
  )
}

export default Loader
