import './SigninPage.css'
function SignInPage(){
    return(
        <div className="form-container">
            <h1>Sign In</h1>
            <form className="form">
             <input type="text" placeholder="Enter your username" className="form-input"/>
             <input type="password" placeholder="Enter your password" className="form-input"/>
             <button type="submit" className="form-button">Login</button>
             
            </form>
        </div>

    );
}
export default SignInPage;