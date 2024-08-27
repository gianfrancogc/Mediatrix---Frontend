import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import { AutoComplete } from "primereact/autocomplete";
import { Editor } from "primereact/editor";
import { InputText } from 'primereact/inputtext';
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from 'react-router-dom';
import { createGovernment, getGovernment, updateGovernment } from '../service/GovernmentService';

import HeaderComponet from '../components/Header-component';
function CrearRegistroView() {

    const { id } = useParams();
    const [nameAction, setNameAction] = useState("Crear");
    const [colorBtn, setColorbtn] = useState("primary");
    const title=`${nameAction} Registro`;
    const toast = useRef(null);
     

    const defaultValues = { 
        name: '', 
        country: '', 
        company: '', 
        representative: '', 
        details: ''
    };

    const show = (data) => {
       toast.current.show({ severity: 'success', summary: `Se ${ nameAction==="Crear" ? "registro" : "actualizo"}`, detail: `${data.name}`});
   };
   
   const navigate = useNavigate();
    const onSubmit = (
        data
        ) => {
        
        let datos = data;
        if(datos){
            data.name && show(data);
            if(nameAction==="Crear"){
                createGovernment(data);
                reset();
            }else{
                updateGovernment(data);
                reset({
                    name: '',
                    description: '',
                  });
            }
            setTimeout(() => {
                return navigate("/consulta");
            }, 2000);
            
        }
        
        
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const getFormErrorMessage = (name) => {
        // @ts-ignore
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    

    useEffect(() => {
    
    const fetchGovernment = async () => {
        try {
            if(id){
                setNameAction("Editar");
                setColorbtn("warning");
                // const customers = getGovernment(id); 
                const data = await getGovernment(id); 
                console.log(data);
            if (data) {
                reset({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                  });
               
            }
            }else {
                reset({
                    name: '',
                    description: '',
                  });
            }
        } catch (error) {
            console.error("Error al obtener el Government", error);
        }
    };

    fetchGovernment();
        
    }, [id]);
  return (
    <>
        
        <div>
        <HeaderComponet name={title}/>
            <div className="page-content">
                <div className="content">
                <div className='row'>
                    <div className='col-12'>
                        <div className="card p-3">
                            <form onSubmit={handleSubmit(onSubmit)} className="text-start">

                                <Toast ref={toast} />
                                <div className="grid">
                                    <div className="col-6">
                                        <div className="field">
                                            <Controller
                                                name="name"
                                                control={control}
                                                rules={{ required: 'Nombre es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Nombre 
                                                        </label>
                                                        <InputText  id={field.name} name={field.name} value={field.value}  onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                name="description"
                                                control={control}
                                                rules={{ required: 'Descripción es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Descripción
                                                        </label>
                                                        <Editor id={field.name} name={field.name} value={field.value} onTextChange={(e) => field.onChange(e.textValue)} style={{ height: '250px' }} className={classNames({ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            /> 
                                        </div>
                                    </div>
                                    <div className="col-6">
                                       
                                    </div>
                                </div>
                                <div className="btn-float-content">
                                    <Button label="Guardar" type="submit" icon="pi pi-check" severity={colorBtn} />  
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default CrearRegistroView;