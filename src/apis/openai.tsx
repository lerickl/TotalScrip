import configuration,{OpenAI, ClientOptions } from 'openai'
 
 
 
const Configuration = new configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: "org-4Wo2hGDxo7xBQMzXFZ748G1M",  
  dangerouslyAllowBrowser:true,
})

const clientOption: ClientOptions = {
  apiKey: Configuration.apiKey,
  organization: Configuration.organization,
  dangerouslyAllowBrowser:true,
 
}

class chatgpt {
  query:string=''
  openai:OpenAI = new OpenAI(clientOption)
  promt:Array<OpenAI.Chat.Completions.ChatCompletionMessage> = []
  constructor(){
    this.query=''
    this.init()
  
     
  }
  init= async () =>{
    this.openai =await new OpenAI(clientOption)   
   
  }
  hangleMessage= async(query:string)=> {
    this.promt=  crearPromptfinal(query)
    const respuesta= await openaiResponse(this.promt,this.openai) 
   
    return respuesta.content
  }
   
}
async function openaiResponse(promt:Array<OpenAI.Chat.Completions.ChatCompletionMessage>,  openai: OpenAI ){
 
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: promt,
    temperature: 0.4
  });
   
  return response.choices[0].message
}
function crearPromptfinal(query: string) { 
  const promtFinal:Array<OpenAI.Chat.Completions.ChatCompletionMessage> =[
    {"role": "system", "content": "eres un experto en ventas. ayudas creando guiones de venta"},
    {"role": "user", "content": query}
  ]
  return promtFinal
}

export default chatgpt



