"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import { json } from 'stream/consumers';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

function Add(notifyAdd) {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]); 
const [loading, setLoading] = useState(true);
 
const formSubmit = (e) => {
  e.preventDefault();
 
  axios.post('http://localhost:5000/products', {
      title,
      price
    
  })
  .then((res) => {

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
