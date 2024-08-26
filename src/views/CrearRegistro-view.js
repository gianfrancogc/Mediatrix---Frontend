import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import { AutoComplete } from "primereact/autocomplete";
import { Editor } from "primereact/editor";
import { InputText } from 'primereact/inputtext';
import { Toast } from "primereact/toast";
import { useParams } from 'react-router-dom';

import { CustomerService } from '../service/CustomerService';

import HeaderComponet from '../components/Header-component';
function CrearRegistroView() {

    const { id } = useParams();
    const [nameAction, setNameAction] = useState("Crear");
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
       toast.current.show({ severity: 'success', summary: 'Se registro', detail: `${data.name}`});
   };

    const onSubmit = (
        data
        ) => {
        data.name && show(data);
        let datos = data;
        console.log(datos);
        reset();
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
        if(id){
            setNameAction("Editar");
            const customers = CustomerService.getData(); // Obtener los datos del servicio
            const selectedCustomer = customers.find(c => c.id === parseInt(id));

        if (selectedCustomer) {
            reset({
                name: selectedCustomer.name,
                country: selectedCustomer.country.name,
                company: selectedCustomer.company,
                representative: selectedCustomer.representative.name,
              });
           
        }
        }else {
            reset({
                name: '',
                country: '',
                company: '',
                representative: '',
              });
        }
        
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
                                                name="country"
                                                control={control}
                                                rules={{ required: 'Ciudad es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Ciudad 
                                                        </label>
                                                        <InputText  id={field.name} name={field.name} value={field.value}  onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                name="company"
                                                control={control}
                                                rules={{ required: 'Compañía es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                        Compañía 
                                                        </label>
                                                        <InputText  id={field.name} name={field.name} value={field.value}  onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error, })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                name="representative"
                                                control={control}
                                                rules={{ required: 'Representante es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Representante 
                                                        </label>
                                                        <InputText  id={field.name} name={field.name} value={field.value}  onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="field">
                                            <Controller
                                                name="details"
                                                control={control}
                                                rules={{ required: 'Detalle es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Detalle de solicitud
                                                        </label>
                                                        <Editor id={field.name} name={field.name} value={field.value} onTextChange={(e) => field.onChange(e.textValue)} style={{ height: '250px' }} className={classNames({ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-float-content">
                                    <Button label="Guardar" type="submit" icon="pi pi-check" className={"btn btn-dark"} />  
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