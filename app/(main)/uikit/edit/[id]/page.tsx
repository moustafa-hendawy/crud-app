"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Toast } from 'primereact/toast';

function Edit(id: any, notifyEdit: any) {
const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

      const formSubmit = (e: any) => {
        e.preventDefault();
        
        axios.put(`http://localhost:5000/products/${id}`, {
            title,
            price
          
        })
        .then((res) => {
          console.log(res);
          notifyEdit(e, res.data)
        })
      }   
// Fetch existing product details
useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);


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

    <Button type='submit' label="Edit Product" severity="success" className="p-button-warning"  />
  </Form>
  )
}

export default Edit
