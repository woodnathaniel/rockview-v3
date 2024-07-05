import axios from "axios"




export default function LogIn() {

 
  const googleAuth = () => {
    window.open("http://localhost:5000/auth/google", "_self");
};

  return (
    <div>
      <button onClick={googleAuth}>LogIn</button>
    </div>
  )
}
