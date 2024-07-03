import axios from "axios"




export default function LogIn() {

 
  const googleapis = async()=>{
    alert('hit')
    try {
      console.log('adag');
      const user = await axios.get('/auth/google') 
      console.log(user.data);
      console.log(user);
      console.log('sadfs');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <button onClick={()=> googleapis()}>LogIn</button>
    </div>
  )
}
