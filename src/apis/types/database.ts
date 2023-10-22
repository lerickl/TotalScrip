export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      DataPromt: {
        Row: {
          Company: string | null
          created_at: string
          Description: string | null
          Email: string | null
          id: string
          offer: string | null
          Price: string | null
          ProductOrService: string | null
        }
        Insert: {
          Company?: string | null
          created_at?: string
          Description?: string | null
          Email?: string | null
          id?: string
          offer?: string | null
          Price?: string | null
          ProductOrService?: string | null
        }
        Update: {
          Company?: string | null
          created_at?: string
          Description?: string | null
          Email?: string | null
          id?: string
          offer?: string | null
          Price?: string | null
          ProductOrService?: string | null
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