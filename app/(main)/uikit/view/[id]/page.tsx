
"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";

function ViewProducts() {
    const [products, setProducts] = useState<any>();
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) =>{
            setProducts(data);
        })
    },[])
const {id} = useParams()

  return (
    <div>
     {products && 
<tr>
<h1> Title:  {products.title} </h1>
<h1> Price: {products.price} </h1>
<img src={products.image} />

</tr>     
     
     }
     
    
      
      

    </div>
  )
}

export default ViewProducts