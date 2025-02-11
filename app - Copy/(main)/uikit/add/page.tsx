"use client"
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { json } from 'stream/consumers';
import axios from 'axios';

function Add() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');



const formSubmit = (e) => {
  e.preventDefault();
  
  axios.post('http://localhost:9000/products', {
      title,
      price
    
  })
  .then((data) => {
    console.log(data)
  })
}


  return (
    <Form onSubmit={formSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Price</Form.Label>
      <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Add Product
    </Button>
  </Form>
  )
}

export default Add
