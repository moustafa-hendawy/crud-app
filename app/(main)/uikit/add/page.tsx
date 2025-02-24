"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import { json } from 'stream/consumers';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import Dashboard  from '../../../(main)/page';

//   E:\html projects\sakai-react-master\app\(main)\page.tsx
  // app\(main)\page.tsx

function Add(notify) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]); 
const [loading, setLoading] = useState(true);
//  const [addVisible, setAddVisible] = useState(false);

//Toast


    // const showSuccess = () => {
    //     toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    // }
 
const formSubmit = (e) => {
  e.preventDefault();
 
  axios.post('http://localhost:5000/products', {
      title,
      price
    
  })
  .then((res) => {

    console.log(res);
    notify(e,res.data)
  })

}


  return (
   
    <Form onSubmit={formSubmit }>
      
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Price</Form.Label>
      <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
    </Form.Group>

    <Button label="Add Product" severity="success" className="p-button-warning"
    //  onClick={
    //   (e) => {
    //     showMessage(e, toastTopRight, 'success')
    //   toast.current.show({severity:'success', 
    //     summary: 'Success', detail:'Message Content', life: 3000})
    //   }
    // }
      />

{/* <Dialog header={Dashboard} 
 visible={addVisible} onHide={() => {if (!addVisible) return; setAddVisible(false);}}
>  
           
           </Dialog> */}

          
  </Form>
  
  )
}

export default Add
