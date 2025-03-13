
"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function Add(notifyAdd: any) {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
 
const formSubmit = (e: any) => {
  e.preventDefault();
 
  axios.post('https://crud-json-server-ten.vercel.app/products', {
      title,
      price
    
  })
  .then((res: any) => {

    console.log(res);
    notifyAdd(e,res.data);
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

    <Button label="Add Product" severity="success" className="p-button-warning"/>
    
  </Form>
  
  )
}

export default Add