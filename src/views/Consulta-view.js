import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';
import { getGovernments, removeGovernment } from '../service/GovernmentService';

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { Link } from 'react-router-dom';
import HeaderComponet from '../components/Header-component';

function ConsultaView() {
    const [customers, setCustomers] = useState([]);
    const toast = useRef(null);
    const title="Consulta";

    const columns = [
        { field: 'id', header: 'ID', editable: false },
        { field: 'name', header: 'Nombre', editable: false },
        { field: 'description', header: 'Descripción', editable: false },
        { field: 'options', header: 'Opciones', editable: false },
    ];


 

    useEffect(() => { 
        let isMounted = true; 
    
    const fetchGovernments = async () => {
        try {
            const data = await getGovernments();
            if (isMounted) {
                setCustomers(data);
            }
        } catch (error) {
            console.error("Error al obtener los Governments:", error);
        }
    };
    fetchGovernments();

    return () => {
        isMounted = false;
    };
    }, []);

    const fetchGovernmentsDelete = async () => {   
            setCustomers(await getGovernments());      
    };

    const btnOptions = (id)=>{
        return(
            <>
                <Toast ref={toast} />
                <div className="d-flex">
                   
                    <Link to={`/editar/${id}`} className="p-2 bg-primary text-white"><i className="pi pi-pencil"></i></Link>&nbsp;
                    <button onClick={()=>confirmDelete(id)} className="p-2 bg-red-500 text-white border-none"><i className="pi pi-eraser"></i></button>
                </div>
            </>
        );
    }

    const accept = async (id) => {
        
        let deleted = await removeGovernment(id);
       
        if(deleted){
            toast.current?.show({ severity: 'info', summary: 'Confirmada', detail: 'has aceptado', life: 3000 });
          
           await fetchGovernmentsDelete();
        }     
    }
    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rechazada', detail: 'has rechazado', life: 3000 });
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