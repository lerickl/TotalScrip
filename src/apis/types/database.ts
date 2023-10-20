export type Json = 
  |string
  | number
  | boolean
  | null
  | { [key: string]: Json 
  | undefined } 
  | Json[]
export interface Database {
    public: {
      Tables: {
        Emails: {
          Row: {
            Email: string
            id: number
          }
          Insert: {
            Email: string
            id?: number
          }
          Update: {
            Email?: string
            id?: number
          }
          Relationships: []
        }
        preguntas: {
          Row: {
            id: number
            pregunta1: string
            pregunta2: string | null
            pregunta3: string | null
            pregunta4: string | null
          }
          Insert: {
            id?: number
            pregunta1: string
            pregunta2?: string | null
            pregunta3?: string | null
            pregunta4?: string | null
          }
          Update: {
            id?: number
            pregunta1?: string
            pregunta2?: string | null
            pregunta3?: string | null
            pregunta4?: string | null
          }
          Relationships: []
        }
      }
      Views: {
        [_ in never]: never
      }
      Functions: {
        [_ in never]: never
      }
      Enums: {
        [_ in never]: never
      }
      CompositeTypes: {
        [_ in never]: never
      }
    }
  }