import { useState } from 'react';
import AlertCustom from './AlertCustom';
import './App.css';

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [userInfo, setUserInfo] = useState()
  const [alert, setAlert] = useState({color:'', text:''})


  const submit = (e) => {

    e.preventDefault()

    setUserInfo({
      name: name,
      email: email,
      message: message,
    })

    const requestedOptions = {
      method: 'POST',
      url: "/submit"
    };

    try{
      fetch(requestedOptions.url, requestedOptions).then(response => response.json())
    }catch(e){
      console.log(e)
    }

    console.log(userInfo)
    if(name==="" || email==="" || message===""){
      setAlert({color: 'red', text: "Please fill in all fields"})
    }else{
      setAlert({color:'green', text: `Thank you, ${name}. We will check your message and get back to you within 48 hours.`})
    }
  }



  return (
    <div className="App">
      <form className="form-container" onSubmit={submit}>
        <h1>Form-Message App</h1>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <input type="text" id="message" placeholder="Enter your message" onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="form-group">
          <button type="submit" id="submit-btn">Submit</button>
          <p id="status"></p>
        </div>
      </form>
      <AlertCustom {...alert} />
    </div>
  );
}

export default App;
