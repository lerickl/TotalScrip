import './styles/homecss.css'
import chatgpt from './apis/openai';
import './App.css'
import { Client } from "@sendgrid/client";
import sgMail from '@sendgrid/mail'
import guionesImage from './sources/guion1.png'
import hazluzImage from './sources/hazEnergia.png'
import exitoImage from './sources/exito.png'
import banerfinal from './sources/banelFinal.jpg'
import logo from './sources/totalscript.png'
import imageSelectTicket from './sources/imagenSelecticked.png'
import imageCompleteForm from './sources/imagenCompleteForm.png'
import imageDescargaGuion from './sources/imagenGuionDes.png'
import { useState, ChangeEvent, FormEvent } from 'react'
function App() {
  //const [query, setQuery] = useState('')
  const [recomendacion, setRecomendacion] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [formData, setFormData] = useState({
    quest1: '',
    quest2: '',
    quest3: '',
    quest4: '',
    quest5: '',
    quest6: '',

  })
  const [formTicket, setFormTicket] = useState<string>('');
  
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value as string })
  };
  type FormData = {
    quest1: string,
    quest2: string,
    quest3: string,
    quest4: string,
    quest5: string,
    quest6: string,
  }
  
  const handleChangeTicket = (text:string) => { 
    handleChangeInicio()
    setFormTicket(text)
    if(text === 'Low'){
      setRecomendacion('vender por Whatsapp')
    }
    if(text === 'Middle'){
      setRecomendacion('Vender por Telefono')
    }
    if(text === 'High'){
      setRecomendacion('Vender en Persona')
    }
    cerrarDialog()
  }
  const crearPromt = (formData: FormData) => {
    const txtinitial = "Con los datos de las siguientes preguntas, se creara un guion de ventas. enumera los dialogos \n\n"
    const text1 = "¿Qué producto o servicio estas ofreciendo?\n\n" + formData.quest1 + "\n\n"
    const text2 = "¿Describe brevemente tu producto o servicio?\n\n" + formData.quest2 + "\n\n"
    const text3 = "¿Cual es el precio de tu producto o servicio?\n\n" + formData.quest3 + "\n\n"
    const text4 = "¿Quién es tu publico objetivo?\n\n" + formData.quest4 + "\n\n"
    const text5 = "¿Qué oferta especial puedes proporcionar?\n\n" + formData.quest5 + "\n\n"
    const text6 = "Escribe el nombre de tu empresa\n\n" + formData.quest6 + "\n\n"
    const promtFinal = txtinitial + text1 + text2 + text3 + text4 + text5 + text6
    return promtFinal
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    const query = crearPromt(formData)
   
    const response = new chatgpt()

    const respuesta = await response.hangleMessage(query)
    console.log(respuesta)
    console.log(typeof(respuesta))
    setIsLoading(false)
    setRespuesta(respuesta as string)
  }
  const [inicio, setInicio] = useState(true)
  const handleChangeInicio= () => {
    setInicio(!inicio)
  }
  
  const abrirDialog = () => {
    const dialogElement = document.getElementById("miDialog")  as HTMLDialogElement
    if (dialogElement) {
      dialogElement.showModal();
    }// Abrir el dialog
  }
  const cerrarDialog = () => {
    const dialogElement = document.getElementById("miDialog") as HTMLDialogElement
    if (dialogElement) {
      dialogElement.close();
    }
  }
  const editPrice = () => {
    abrirDialog()
    handleChangeInicio()
   
  }
  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(respuesta).then(function() {
      alert('Contenido copiado al portapapeles.') 
    }).catch(function(err) {
      console.error('No se pudo copiar al portapapeles: ', err)
    }) 
  } 
  const sendMail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Test setClient() method
    sgMail.setClient(new Client());
    sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY)
    sgMail.setSubstitutionWrappers("{{", "}}")
    const msg = {
      to: 'nearerick@gmail.com', // Change to your recipient
      from: 'nearerick@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: email,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {}, error => {
      console.log(error) 
  
      if (error.response) {
        console.log(error.response.body)
      }
    })
     
  }
  const handlechangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
  }
  return (
   
    <>
      <header className='headerTotalScript'>
        <img alt='image' src={logo} />
      </header>
      
      <main>
      <dialog className='modalCard' id='miDialog' >
     
        <section className="cardpriceProdServ">
            
            <h2>¿Cuál es el precio de tu producto o servicio?</h2>
            <div onClick={()=>handleChangeTicket('Low')}>
              <h4>Low Ticket</h4>
              <p>0 - 100USD</p>
            </div>
            <div onClick={()=>handleChangeTicket('Middle')}>
              <h4>Middle Ticket</h4>
              <p>100 - 500USD</p>
            </div>
            <div  onClick={()=>handleChangeTicket('High')}>
              <h4>High Ticket</h4>
              <p>+5000USD</p>
            </div>
            <section>
              <a  onClick={cerrarDialog}> {"< Volver"}</a>
            </section>
             
          </section>
      </dialog>
     
        {inicio?
        <section className='cardBienvenido'>
          <form className='contentCardBienvenido' >
            <p><strong>Bienvenido a TotalScript</strong></p>
            <h1>Genera scripts para <span>vender</span> más</h1>
            <h2 >Crea scripts ganadores con un solo clic</h2>
            <button type="button" onClick={abrirDialog}> Comenzar </button>
          </form>
         
        </section>
        
        :
        (<section className='preguntas'  >
          <section className='quests'>
            <a type="button"  onClick={editPrice}>{'< atras'}</a>
            <p> Para productos {formTicket} Ticket, te recomendamos {recomendacion} 
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="quest1"><span>1</span> ¿Qué producto o servicio estas ofreciendo?</label>
                <textarea required name='quest1' value={formData.quest1} onChange={handleChange} placeholder='Ejemplo: Asesoría de Marketing' id="quest1" />
              
              </div>
              <div>
                <label htmlFor="quest2"><span>2</span>¿Describe brevemente tu producto o servicio?</label>
                <textarea required name='quest2' value={formData.quest2} onChange={handleChange} id='quest2' placeholder='Ejemplo: es un paquete de publicidad en redes sociales para empresas. ' />
                
              </div>
              <div>
                <label htmlFor='quest3'><span>3</span>¿Cual es el precio de tu producto o servicio?</label>
                <textarea required name='quest3' value={formData.quest3} onChange={handleChange} id='quest3' placeholder='Ejemplo: 300USD'></textarea>
              
              </div>
              <div>
                <label htmlFor='quest4'><span>4</span>¿Quién es tu publico objetivo?</label>
                <textarea required name='quest4' value={formData.quest4} onChange={handleChange} id='quest4' placeholder='Ejemplo: Aumento en sus ventas por la buena gestion de marketing'></textarea>
              
              </div>
            
              <div>
                <label htmlFor='quest5'><span>5</span>¿Qué oferta especial puedes proporcionar?</label>
                <textarea required name='quest5' value={formData.quest5} onChange={handleChange} id='quest5' placeholder='Ejemplo: 10% de descuento por el mes de Octubre'></textarea>
                
              </div>
              <div>
                <label htmlFor='quest6'><span>6</span>Escribe el nombre de tu empresa</label>
                <textarea required name='quest6' value={formData.quest6} onChange={handleChange} id='quest6' placeholder='Ejemplo: Belcan Enterprice'></textarea>
                
              </div> 
              
              <button>Crear Guion</button>
            </form>
          </section>
          {isLoading?
          <section className='loading' >
          <div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>              
          </div>
          <p>cargando...</p>
          </section>:
          <section className='responseChatGpt'   >
            <div  >
              <div className='svgs' >
                <section>
                  <svg width="30" height="30" viewBox="0 0 30 30">
                  <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                  </svg>
                  <p>refresh</p>
                </section>
                <section onClick={copiarAlPortapapeles}>
                <svg  width="30px" height="30px" viewBox="0 0 222.000000 255.000000"
                  > 
                  <g transform="translate(0.000000,255.000000) scale(0.100000,-0.100000)"
                  fill="#000000" stroke="none">
                  <path d="M700 2362 c-55 -27 -70 -68 -70 -194 l0 -108 -147 0 c-170 0 -206
                  -11 -235 -70 -17 -32 -18 -92 -18 -810 0 -718 1 -778 18 -810 35 -72 19 -70
                  662 -70 527 0 578 1 610 18 55 27 70 68 70 195 l0 107 148 0 c169 0 205 11
                  234 70 17 32 18 85 18 653 0 503 -3 624 -14 650 -19 44 -334 353 -379 372 -30
                  13 -103 15 -449 15 -373 0 -416 -2 -448 -18z m850 -189 c0 -210 23 -233 233
                  -233 l127 0 0 -608 c0 -460 -3 -611 -12 -620 -9 -9 -152 -12 -584 -12 -315 0
                  -579 3 -588 6 -14 5 -16 57 -16 480 l0 474 -40 0 -40 0 0 -467 c0 -426 2 -471
                  18 -503 34 -69 40 -70 475 -70 l387 0 0 -108 c0 -71 -4 -112 -12 -120 -9 -9
                  -152 -12 -584 -12 -315 0 -579 3 -588 6 -14 6 -16 85 -16 794 0 709 2 788 16
                  794 9 3 99 6 200 6 l184 0 0 154 c0 114 3 156 13 159 6 3 195 6 420 6 l407 1
                  0 -127z m250 -93 l64 -60 -105 0 c-68 0 -109 4 -117 12 -8 8 -12 48 -12 112
                  l0 100 53 -52 c28 -28 81 -78 117 -112z"/>
                  </g>
                  </svg>
                  <p>copy</p>
                </section>
              </div>
              {respuesta && respuesta.split(/Diálogo \d+: /).filter(Boolean).map((dialogo, index) => (
                <div key={index}>
                  <p>Diálogo {index + 1}:</p>
                  {dialogo.split('\n').map((linea, lineaIndex) => (
                    <p key={lineaIndex}>{linea}</p>
                  ))}
                </div>
              ))}
           
            </div>
          </section>
          }
           
        </section>
        
        )}
        
        <section className='viewcardhelp'>
          <hr></hr>
          <img alt='image' src={imageSelectTicket} />
          <div className='group'>
            <div className='option'>
              <p>1</p>
              <div className='subtitle' >
                <h3>Selecciona el ticket de tu producto o servicio</h3>
                <h4>Elige cual es el valor promedio de lo que vendes </h4>
              </div>
            </div>

          </div>
          <img alt='image' src={imageCompleteForm} />
          <div className='group'>
            <div className='option'>
              <p>2</p>
              <div className='subtitle' >
                <h3>Completa el formulario</h3>
                <h4>Responde algunas preguntas clave diseñadas para personalizar tu guión de ventas ganador. </h4>
              </div>
            </div>

          </div>
          <img alt='image' src={imageDescargaGuion} />
          <div className='group'>
            <div className='option'>
              <p>3</p>
              <div className='subtitle' >
                <h3>Descarga tu Guión</h3>
                <h4>Descarga gratuitamente el guión creado especialmente para ti. </h4>
              </div>
            </div>

          </div>
        </section>
 
       
        <section className='banerBeneficios' >
          <h4  >BENEFICIOS DE USAR TOTALSCRIPT</h4>
          <div>
            <section className='imgBeneficios'>
              <img alt='image' src={guionesImage} />
              <a>Guiones Personalizados y Adaptativos</a>
            </section>
            <section className='imgBeneficios'>
              <img alt='image' src={hazluzImage} />
              <a>Ahorro de Tiempo y Energía</a>
            </section >
            <section className='imgBeneficios'>
              <img alt='image' src={exitoImage} />
              <a>Estrategias Comprobadas</a>
            </section>
          </div>
        </section>
        <section className='banersuscripcion'>
          <div>
            <form onSubmit={sendMail}>
              <h1>
                
                ¡RECIBE LAS NUEVAS ACTUALIZACIONES DE TotalScript!
              </h1>
              <label htmlFor='in'></label>
              <input placeholder='Ingresa tu Email' id='in' type='text' value={email} onChange={handlechangeEmail} ></input>
              <button type='submit' >
                Suscribirme 
              </button>
            </form>
          </div>
        </section>
        <section className='banerPreguntasFrecuentes'>
          <div>
            <h4>
              PREGUNTAS MÁS FRECUENTES
            </h4>
            <div>
              <h5>¿Se puede usar TotalScript para crear guiones de venta para diferentes industrias y productos?</h5>
              <hr />
              <h5>¿TotalScript es gratuito?</h5>
              <hr />
              <h5>¿Por qué debo usar un guion de ventas?</h5>
              <hr />
            </div>
          </div>
        </section>
        <section className='banerContact'>
          <h4>
            ¿QUIERES UN ENTRENAMIENTO EN VENTAS?
          </h4>
          <h3>
            Ponte en contacto con nuestro equipo de ventas
          </h3>
          <img alt='image' src={banerfinal} />
          <button>Contactar</button>
        </section>
      </main>
      <footer>
        copiright 2023 TotalScript - Todos los derechos reservados  
      </footer>
    </>
  )
}

export default App
