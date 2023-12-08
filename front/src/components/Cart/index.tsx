import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ListCart } from '../ListCart';
import { useAtom } from 'jotai';
import { listCart } from '../../Jotai/cart';

export const Cart: React.FC<any> = () => {
  const [cart] = useAtom(listCart)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const totalProduct = cart.reduce((currentQtd: any, product: any) => currentQtd + Number(product.qtd), 0)

  return (
    <>
      <Button style={{position: 'relative'}} variant="primary" onClick={handleShow}>
        <AiOutlineShoppingCart size={30} />
        <span style={{minWidth: '2.5rem',background: 'green', padding: '0.5rem', position: 'absolute', bottom: '1.8rem', left: '2.5rem', borderRadius: '12rem'}}>{totalProduct}</span>
      </Button>
      <Offcanvas style={{width: '90vw'}} show={show} onHide={handleClose}>
        <Offcanvas.Header style={{width: '65rem', margin: '0 auto'}} closeButton>
          <Offcanvas.Title>Meu carrinho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListCart list={cart} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
