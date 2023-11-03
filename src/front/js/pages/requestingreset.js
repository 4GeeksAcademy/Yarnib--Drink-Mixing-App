import React,{ useState }  from "react"
export const Sendtoken = ()=>{
    const[email,setEmail]=useState("")
    function send_email(){
        fetch("https://congenial-capybara-p594pqx669x27vvw-3001.app.github.dev/api/forgot-password" ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email: email
            })})
            .then((response) => response.json())

            .then((data) => {console.log(data)})
        
    }
 return(<div> <button onClick={send_email}></button>
   <input
                    id="confirmemail"
                    className="form-control m-3"
                    type="email"
                    value={email}
                    placeholder="Confirm email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
    </div>
)}