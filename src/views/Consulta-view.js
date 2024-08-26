import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';
import { CustomerService } from '../service/CustomerService';

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { Link } from 'react-router-dom';
import HeaderComponet from '../components/Header-component';

function ConsultaView() {
    const [customers, setCustomers] = useState([]);
    const toast = useRef(null);
    const title="Consulta";

    const columns = [
        { field: 'name', header: 'Nombre', editable: false },
        { field: 'country.name', header: 'Ciudad', editable: false },
        { field: 'company', header: 'Compañía', editable: false },
        { field: 'representative.name', header: 'Representante', editable: false },
        { field: 'options', header: 'Opciones', editable: false },
    ];



    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    }, []);



    const btnOptions = (id)=>{

        // console.log(id.toString());
        return(
            <>
                <Toast ref={toast} />
                <div className="d-flex">
                    {/* <a href={`/editar/${id}`} className="p-2 bg-primary text-white"><i className="pi pi-pencil"></i></a> */}
                    <Link to={`/editar/${id}`} className="p-2 bg-primary text-white"><i className="pi pi-pencil"></i></Link>&nbsp;
                    <button onClick={()=>confirmDelete(id)} className="p-2 bg-red-500 text-white border-none"><i className="pi pi-eraser"></i></button>
                    {/* <a href={`/editar/${id}`} className="p-2 bg-red-500 text-white"><i className="pi pi-eraser"></i></a> */}
                </div>
            </>
        );
    }
    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rechazada', detail: 'has rechazado', life: 3000 });
    }
    const accept = async (id) => {
        
        let deleted = await id;
        if(deleted){
          toast.current?.show({ severity: 'info', summary: 'Confirmada', detail: 'has aceptado', life: 3000 });
        }      
    }
    const confirmDelete = (id) => {

        confirmDialog({
            message: '¿Quieres eliminar este registro?',
            header: 'Eliminar confirmación',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => accept(id),
            reject
        });
    };
    return (
      <>
          <div>
              <HeaderComponet name={title}/>
              <div className="page-content">
                  <div className="content">
                  <ConfirmDialog />
                      <div className="card">
                        <DataTable 
                        value={customers} 
                        paginator rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        tableStyle={{ minWidth: '50rem' }}
                        
                        >
                            {/* <Column field="name" header="Nombre" style={{ width: '25%' }}></Column>
                            <Column field="country.name" header="Ciudad" style={{ width: '25%' }}></Column>
                            <Column field="company" header="Compañía" style={{ width: '25%' }}></Column>
                            <Column field="representative.name" header="Representante" style={{ width: '25%' }}></Column> */}
                            {columns.map(({ field, header, editable  }) => {
                                            return <Column key={field} field={field} header={header}  
                                            body={field === 'options' ? (e)=> btnOptions(e.id) : null}
    
                                            />
                                    })}
                        </DataTable>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
  }
  
  export default ConsultaView;