 
import { createClient } from '@supabase/supabase-js'
 
import { Database} from './types/database'
 

  
export default function AddSupabase(data:Database['public']['Tables']['DataPromt']['Insert']) {
  try{
    InsertData(data)
  }
  catch(error){
    console.log(error)
 
  }
  
  }
 
async function InsertData(data:Database['public']['Tables']['DataPromt']['Insert']) {
  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL ,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY )
  const { data: insertedData, error } = await supabase
    .from('DataPromt')
    .insert([data])
  if (error) {
    console.error(error)

  } else {
    console.log(insertedData)
  }
}