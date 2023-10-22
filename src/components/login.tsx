import '../styles/login.css'

export default function Login()  {
  return (
    <section className="login">
      <h1>EN CONSTRUCCION</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button className='Button' type="submit">Login</button>
      </form>
      <button className='Button'>auth github</button>
    </section>
  )
}