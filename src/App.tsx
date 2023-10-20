import './styles/homecss.css'
import chatgpt from './apis/openai'
import './styles/App.css'
import ViewResponseGpt from './components/viewResponse'
import guionesImage from './sources/guion1.png'
import hazluzImage from './sources/hazEnergia.png'
import exitoImage from './sources/exito.png'
import banerfinal from './sources/banelFinal.jpg'
import logo from './sources/totalscript.png'
import imageSelectTicket from './sources/imagenSelecticked.png'
import imageCompleteForm from './sources/imagenCompleteForm.png'
import imageDescargaGuion from './sources/imagenGuionDes.png'
import { useState, ChangeEvent, FormEvent} from 'react'
 
function App() {
  //const [query, setQuery] = useState('')
  const [recomendacion, setRecomendacion] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isContentVisible, setIsContentVisible] = useState(true)
  const [formData, setFormData] = useState({
    quest1: '',
    quest2: '',
    quest3: '',
    quest4: '',
    quest5: '',   
  })
  const [formTicket, setFormTicket] = useState<string>('');
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  }
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value as string })
  }
  const handleChangePrice = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    // Validar que el valor ingresado sean solo números
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  }
  type FormData = {
    quest1: string,
    quest2: string,
    quest3: string,
    quest4: string,
    quest5: string,
 
  }
  
  const handleChangeTicket = (text:string) => { 
    handleChangeInicio()
    setFormTicket(text)
    if(text === 'Low'){
      setRecomendacion(' por Whatsapp')
    }
    if(text === 'Middle'){
      setRecomendacion(' por Telefono')
    }
    if(text === 'High'){
      setRecomendacion(' en Persona')
    }
    cerrarDialog()
    if(isContentVisible==true){
      toggleContentVisibility()
    }
  }
  const crearPromt = (formData: FormData) => {
    const txtinitial = "con los datos siguientes, crea un guion de ventas para vender "+ recomendacion+ ". enumera los dialogos \n\n"
    const text1 = "se ofrese el siguiente, producto o servicio \n\n" + formData.quest1 + "\n\n" 
    const text3 = "con un precio de \n\n" + formData.quest3 + "\n\n"     
    const text4 = "tenemos la siguiente oferta \n" + formData.quest4 + "\n\n"
    const text5= "nuestra empresa es\n\n" + formData.quest5 + "\n\n"
    const promtFinal = txtinitial + text1  + text3 + text4 + text5 
  
    return promtFinal
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    const query = crearPromt(formData)
    
    const response = new chatgpt()

    const respuesta = await response.hangleMessage(query)
    
   
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
              <p>+500USD</p>
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
                <textarea required name='quest3' value={formData.quest3} onChange={handleChangePrice} id='quest3' placeholder='Ejemplo: 300USD'></textarea>
              
              </div>             
            
              <div>
                <label htmlFor='quest4'><span>4</span>¿Qué oferta especial puedes proporcionar?</label>
                <textarea required name='quest4' value={formData.quest4} onChange={handleChange} id='quest4' placeholder='Ejemplo: 10% de descuento por el mes de Octubre'></textarea>
                
              </div>
              <div>
                <label htmlFor='quest5'><span>5</span>Escribe el nombre de tu empresa</label>
                <textarea required name='quest5' value={formData.quest5} onChange={handleChange} id='quest5' placeholder='Ejemplo: Belcan Enterprice'></textarea>
                
              </div> 
              
              <button>Crear Guion</button>
            </form>
          </section>
          
          {isLoading?
          <section className='loading' >
          <p >creando guion porfavor espera unos segundos....</p>
           
          <div id="container">
              
            <div >
              <span ></span>
             
            </div>
          </div>
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
                  <div className='initResponse'> 
                    <strong>Se recomienda Vender {recomendacion}</strong>
                    <strong>Objetivo del script: Vender un producto {recomendacion}</strong>
                    <strong>Descripcion: se hace un primer contacto {recomendacion} usando el siguiente libreto</strong>
                    <strong></strong>
                  </div>
                  
                       
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
        
        {isContentVisible?
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
        <button className='buttonComenzar' type="button" onClick={abrirDialog}> Comenzar </button>
      </section>
      
      :null}
      {isContentVisible? 
      <section  className='banerBeneficios' >
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
        </section>:null}
        
        {isContentVisible?
        <section  className='banersuscripcion'>
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
      </section>:null}
        {isContentVisible?
         <section className='banerPreguntasFrecuentes'>
         <div>
           <h4>
             PREGUNTAS MÁS FRECUENTES
           </h4>
             <details >
               <summary className='custom-summary'>¿Se puede usar TotalScript para crear guiones de venta para diferentes industrias y productos?</summary>
               <p>Así es, puedes usar TotalScript para diferentes industrias. Desde productos/servicios de 0 a más de 1000 USD </p>
             </details>
             <hr />
             <details >
               <summary className='custom-summary'>¿TotalScript es gratuito?</summary>
               <p>Por el momento sí. Aún estamos en nuestra versión beta. Así que puedes aprovechar al máximo esta versión gratuita.</p>
             </details>
             <hr />
             <details >
               <summary className='custom-summary'>¿Por qué debo usar un guion de ventas?</summary>
               <p>
               Tener un script o guion de ventas te permite tener un sistema profesional dentro de tu negocio. Lo cual te ayudará a tener ventas estables durante todo el año.
               </p>
             </details>
         </div>
       </section>:null}

       
        <section className='banerContact'>
          <h4>
            ¿QUIERES UN ENTRENAMIENTO EN VENTAS?
          </h4>
          <h3>
            Ponte en contacto con nuestro equipo de ventas
          </h3>
              <img alt='image' src={banerfinal} />
              <a href="https://wa.me/+51900239201/?text=Hola hugo, vengo de TotalScript. Me interesa un entrenamiento de Ventas" target="_blank" rel="noopener">Contactar</a>
        </section>
        <section>
        <ViewResponseGpt/>
        </section>
            </main>
            <footer>
              <div>
                <a href="https://www.facebook.com/hugoherreracoach" target="_blank" rel="noopener">
                <svg width="30" height="30" viewBox="0 0 50 50">
                    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                </svg>
                </a>
                <a href="https://instagram.com/hugoherreracoach" target="_blank" rel="noopener">
                <svg   width="30" height="30" viewBox="0 0 30 30">
                    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                </svg>
                </a>
                <a href="https://wa.me/+51900239201/?text=Hola hugo, vengo de TotalScript" target="_blank" rel="noopener">
                <svg  width="30" height="30" viewBox="0 0 30 30">
                    <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
                </svg>
                </a>
                <a  href="https://www.tiktok.com/@hugoherreracoach" target="_blank" rel="noopener">
                <svg  width="30" height="30" viewBox="0 0 30 30">
                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z M22.689,13.474 c-0.13,0.012-0.261,0.02-0.393,0.02c-1.495,0-2.809-0.768-3.574-1.931c0,3.049,0,6.519,0,6.577c0,2.685-2.177,4.861-4.861,4.861 C11.177,23,9,20.823,9,18.139c0-2.685,2.177-4.861,4.861-4.861c0.102,0,0.201,0.009,0.3,0.015v2.396c-0.1-0.012-0.197-0.03-0.3-0.03 c-1.37,0-2.481,1.111-2.481,2.481s1.11,2.481,2.481,2.481c1.371,0,2.581-1.08,2.581-2.45c0-0.055,0.024-11.17,0.024-11.17h2.289 c0.215,2.047,1.868,3.663,3.934,3.811V13.474z"></path>
                </svg>
                </a>
                <a>
                <svg   width="30" height="30" viewBox="0 0 30 30">
                    <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                </svg>
                </a>
              </div>
              
              Copyright 2023 TotalScript - Todos los derechos reservados  
            </footer>
          </>
        )
      }

export default App
