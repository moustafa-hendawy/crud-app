"use client";
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'next/navigation';

function Edit() {
    const [products, setProducts] = useState();
    console.log(products)
const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const {id} = useParams()

      const formSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:9000/products/${id}`, {
            title,
            price
          
        })
        .then((data) => {
          console.log(data)
          setProducts(data);
        })
      }   
// Fetch existing product details
useEffect(() => {
    axios
      .get(`http://localhost:9000/products/${id}`)
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
    <Button variant="primary" type="submit">
      Edit Product
    </Button>
  </Form>
  )
}

export default Edit
