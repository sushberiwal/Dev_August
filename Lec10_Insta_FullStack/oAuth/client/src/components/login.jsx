import React, { Component } from 'react'

class Login extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="login">
                <button>
                    <a href="/auth/google">Login via Google+</a>
                    </button>
            </div>
         );
    }
}
 
export default Login;