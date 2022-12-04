import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";



function LoginTest() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginWithRedirect = useAuth0();


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     loginWithRedirect({
    //         email,
    //         password
    //     });
    // };
    
    return (
        // <form onSubmit={handleSubmit}>
        <div>
            <h1>Login Test</h1>
             <form>
                 <label>
                     Email:
                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                 </label>
                 <label>
                     Password:
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                 </label>
                 <input type="submit" value="Log In" />
             </form>
        </div>

    );
};

export default LoginTest;
