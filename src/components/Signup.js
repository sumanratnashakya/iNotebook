import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
 
  const [credentials,setCredentials]= useState({name:'', email:'', password:'', cpassword:''})
  let history = useHistory();

  const handleSubmit = async (e) => {
      e.preventDefault(); //to prevent from reloading the page 
      const {name, email, password} = credentials;

          //TODO: API call
          const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'},
                  body: JSON.stringify({name, email, password})
                  
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
              //save the auth token and redirect
              localStorage.setItem('token', json.authtoken)
              history.push('/');
              props.showAlert('Account created successfully', 'success')
          } else{
            props.showAlert('Invalid credentials', 'danger ')
          }
      
  }
  const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:  e.target.value})
 } 
  return (
    <div className='container' style={{width: '30%'}}>
    <form onSubmit={handleSubmit }>
    <div className="mb-3">
    <label htmlFor="text" className="form-label">Username</label>
    <input type="text" className="form-control" id="text" name='name' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='c password' onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
    </div>
  )
}

export default Signup
