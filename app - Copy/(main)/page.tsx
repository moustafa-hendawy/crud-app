  "use client"; 
  import { Button, Table } from "react-bootstrap";
  import Link from 'next/link'
  import { useEffect, useState } from "react";
  import AddIcon from '@mui/icons-material/Add';
  import DeleteIcon from '@mui/icons-material/Delete';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import EditIcon from '@mui/icons-material/Edit';
  import swal from 'sweetalert2';
  import Pagination from '@mui/material/Pagination';

  const Dashboard = () => {
    const [products, setProducts] = useState([]); 

    useEffect(() => {
      getAllProducts()
    }, []);
// [Pagination]
    const pageSize = 5;
const [pagination, setPagination] = useState({
  from: 0,
  to: pageSize
})
const [page, setPage] = useState(1);

const handlePagination = (event, page) => {
  const from = (page - 1) * pageSize; 
  const to = (page - 1) * pageSize + pageSize;
  setPagination({...pagination, from, to}); 
  setPage(page);
}

      // Function to fetch all products
  const getAllProducts = () => {
    fetch('http://localhost:9000/products')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    });
  };


    // Function to delete a product
    const deleteProducts = (productId) => {
      swal.fire({
        title: 'Are You Sure To Delete ?',
        showCancelButton: true,
        confirmButtonColor: "#d33", // Red color for delete action
        cancelButtonColor: "#3085d6", // Default blue for cancel
      }).then((data) => {
      if (data.isConfirmed) {
          
           fetch(`http://localhost:9000/products/${productId}`, {
        method: 'DELETE'
      }).then((res) => res.json())
        .then(() =>{
         getAllProducts();
        })
      }
      })

    }

      return (
        <div className="main" style={{position: 'relative'}}>
       <Link className="btn btn-primary mb-3" style={{width: '180px',marginLeft: '300px',position: 'absolute',top: '0', right: '10px'}} href={'/uikit/add'}>Add Products <AddIcon style={{height: "25px",
    width: "58px"}} /></Link>
          <div className="grid">

        <Table striped bordered hover style={{marginTop: '50px'}} >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
{/* .sort((a, b) => a.id > b.id ? 1 : -1) */}
          {products.slice(pagination.from, pagination.to).map((i,index) => (
  <tr key={i.id}>
      <td>{(page - 1) * pageSize + 1 + index}</td>
      <td>{i.title.slice(0,10)} ...</td>
      <td>{i.price}</td>
      <td>
        <Button className="btn btn-danger mr-2" onClick={() => deleteProducts(i.id)}><DeleteIcon /></Button>
        <Link className="btn btn-info mr-2" href={`/uikit/view/${i.id}`}><VisibilityIcon /></Link>
        <Link className="btn btn-primary mr-2" href={`/uikit/edit/${i.id}`}><EditIcon /></Link>
      </td>
  </tr>
          ))}
        
        
        </tbody>
          </Table>     
          </div>
          <Pagination onChange={handlePagination} count={Math.ceil(products.length/pageSize)} color="primary" />
          </div>
      );
  };

  export default Dashboard;
