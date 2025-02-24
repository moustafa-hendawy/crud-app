"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Toast } from 'primereact/toast';

function Edit(id) {
    const [products, setProducts] = useState();
    console.log(products)
const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  // const {id} = useParams()

      const formSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:5000/products/${id}`, {
            title,
            price
          
        })
        .then((data) => {
          console.log(data);
          setProducts(data);
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
  
  //Toast
  const toast = useRef(null);
  const toastTopRight = useRef(null);
  // const showSuccess = () => {
  //     toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
  // } 
  const showMessage = (event, ref, severity) => {
    const label = event.target.innerText;

    ref.current.show({ severity: severity, summary: label, detail: label, life: 3000 });
};

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
    <Toast ref={toastTopRight} position="top-right" />
    <Button label="Edit Product" severity="success" className="p-button-warning" 
        onClick={
          // showSuccess;
          (e) => {
            showMessage(e, toastTopRight, 'warn')
            toast.current.show({severity:'success',
               summary: 'Success',
                detail:'Message Content', life: 3000});
          }
         
        }
          
          />
    {/* <Button variant="primary" type="submit">
      Edit Product
    </Button> */}
  </Form>
  )
}

export default Edit
