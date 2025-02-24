 "use client"; 
import React, {useRef} from 'react';
import { Table } from "react-bootstrap";
import Link from 'next/link'
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Add from './uikit/add/page';
import Edit from './uikit/edit/[id]/page';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';

  const Dashboard = () => {
    const [products, setProducts] = useState([]); 
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

  
    useEffect(() => {
      getAllProducts();
    }, []);
// [Pagination]
//     const pageSize = 5;
// const [pagination, setPagination] = useState({
//   from: 0,
//   to: pageSize
// })
// const [page, setPage] = useState(1);

// const handlePagination = (event, page) => {
//   const from = (page - 1) * pageSize; 
//   const to = (page - 1) * pageSize + pageSize;
//   setPagination({...pagination, from, to}); 
//   setPage(page);
// }

// Search
const [customers, setCustomers] = useState(null);
const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const [loading, setLoading] = useState(true);
const [globalFilterValue, setGlobalFilterValue] = useState('');

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const dt = useRef(null);

const exportCSV = (selectionOnly) => {
  dt.current.exportCSV({ selectionOnly });
};

const exportPdf = () => {
  import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);

          doc.autoTable(exportColumns, products);
          doc.save('products.pdf');
          const exportColumns = columns.map(col => ({ title: col.header, dataKey: col.field }));

          doc.autoTable({
            columns: exportColumns,
            body: products,
          });

          doc.save('products.pdf');
                });
            });
          };



const exportExcel = () => {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(products);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
          bookType: 'xlsx',
          type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'products');
  });
};

const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then((module) => {
      if (module && module.default) {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data = new Blob([buffer], {
              type: EXCEL_TYPE
          });

          module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
  });
};

const headerButton = (
  <div className="flex align-items-center justify-content-end gap-2">
      <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
      <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
      <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
  </div>
);


const renderHeader = () => {
  return (
      <div className="flex justify-content-end">
          <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </IconField>
      </div>
  );
};
const header = renderHeader();

  // Function to fetch all products
   const getAllProducts = () => {
    fetch('http://localhost:5000/products')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
      setLoading(false);
      data.forEach((product, index) => {
        product.order = index + 1;
      })
    });
  };
  // Toast
  const toast = useRef(null);
  const toastTopRight = useRef(null);
    
  const showMessage = (event, ref, severity) => {
    const label = event.target.innerText;

    ref.current.show({ severity: severity, summary: label, detail: label, life: 3000 });
};




  const notify = (e,product) => {
    showMessage(e, toastTopRight, 'success')
    toast.current.show({severity:'success', 
      summary: 'Success', detail:'Message Content', life: 3000})
      setAddVisible(false);
      product.order = products.length + 1;
      setProducts([...products, product])
  }


    // Function to delete a product
    const deleteProducts = (productId) => {
      swal.fire({
        title: 'Are You Sure To Delete ?',
        showCancelButton: true,
        confirmButtonColor: "#d33", // Red color for delete action
        cancelButtonColor: "#3085d6", // Default blue for cancel
      }).then((data) => {
      if (data.isConfirmed) {
          
           fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE'
      }).then((res) => res.json())
        .then(() =>{
         getAllProducts();
        })
      }
      })

    }
    const links = (i) => {
      return (
        <>
        
         <Button className="btn btn-danger mr-2" onClick={() => deleteProducts(i.id)}><DeleteIcon /></Button>
        <Link className="btn btn-info mr-2" href={`/uikit/view/${i.id}`}><VisibilityIcon /></Link>
        
        <Button label={ <EditIcon />} style={{width: '45px',
               height: '37px'}} onClick={() => setEditVisible(true)} />
            
            <Dialog header={Edit(i.id)}  visible={editVisible} onHide={() => {if (!editVisible) return; setEditVisible(false);}}>  
           
            </Dialog>
        </>
      );
  };
// "pi pi-external-link"
      return (
        <div className="main card flex justify-content-center"  style={{position: 'relative'}}>
          <Toast ref={toast} />
          <Toast ref={toastTopRight} position="top-right" />
             <Button style={{width: '150px', height: '50px', position: 'relative',
                left: '100vh',backgroundColor: 'blue'}}
              label="Add Product" icon={<AddIcon />}
             onClick={
               () => setAddVisible(true)
            } 
            />
            <Dialog header={Add(notify)} style={{ width: '50vw' }}
            visible={addVisible} 
                onHide={() => {if (!addVisible) return; setAddVisible(false);}} >
              </Dialog>  
              <Tooltip target=".export-buttons>button" position="bottom" />

            
          <div className="grid">
          <div className="flex justify-content-end">
            <IconField iconPosition="left" style={{position: 'relative',paddingLeft: '28px'}}>
                <InputIcon className="pi pi-search" 
                    style={{position: 'absolute',left: '6px',top: '18px'}}/>
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange}
                    placeholder="Search"/>
            </IconField>
        </div>
     {/* <Table striped bordered hover style={{marginTop: '50px'}} >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
 //.sort((a, b) => a.id > b.id ? 1 : -1) 
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
          </Table>    */}
          <DataTable 
                    ref={dt} value={products}
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                     currentPageReportTemplate="{first} to {last} of {totalRecords}" 
                     tableStyle={{ minWidth: '70rem' }}
                     header={headerButton}
                     style={{marginTop: '50px'}}
                     filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['order', 'title', 'price']}
                     >
                
                <Column field="order" sortable header="ID"></Column>
                <Column field="title" sortable header="Title" body={(e) => `${e.title.slice(0, 10)}...`}></Column>
                <Column field="price" sortable header="Price"></Column>
                <Column header="Operation" body={links}></Column>
          </DataTable>  
          </div>
          {/* <Pagination onChange={handlePagination} count={Math.ceil(products.length/pageSize)} color="primary" /> */}
         
          </div>
      );
  };

  export default Dashboard;
