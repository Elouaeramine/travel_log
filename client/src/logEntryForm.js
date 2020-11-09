import React , { useState } from 'react'; 
import { useForm } from "react-hook-form";

import {createLogEntry} from './API';
const LogEntryForm = ({ location , onClose})=>{
    const [loading ,setLoading ] = useState(false);
    const [error , setError] = useState('');
    const { register , handleSubmit } = useForm();

    const onSubmit = async (data)=>{
        try {
            setLoading(true);
            data.latitude = location.latitude ;
            data.longitude = location.longitude; 
            const created = createLogEntry(data);
            console.log(created);
            onClose();
        } catch (error) {   
            console.log(error);
            setError(error.message);
        }
        setLoading(false);  
    }
    return(
    <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
        { error ? <h3 className='error'>{error}</h3>: null}
        <label htmlFor ='title' >Title</label>
        <input type="text" name="title" required ref={register}/>
        <br/>
        <label htmlFor ='comments' >Comments</label>
        <textarea  name="comments" rows={3} ref={register}></textarea>
        <label htmlFor="image">Image</label>
        <input name="image"ref={register} />
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type='date' required ref={register}/>
        <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
    );
}


export default LogEntryForm; 