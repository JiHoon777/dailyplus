export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          created_at: string
          id: number
          published_at: string | null
          reference_name: string | null
          reference_url: string
          summary: string | null
          title: string | null
          type: Database['public']['Enums']['article_type']
          unique_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          published_at?: string | null
          reference_name?: string | null
          reference_url: string
          summary?: string | null
          title?: string | null
          type: Database['public']['Enums']['article_type']
          unique_id: string
        }
        Update: {
          created_at?: string
          id?: number
          published_at?: string | null
          reference_name?: string | null
          reference_url?: string
          summary?: string | null
          title?: string | null
          type?: Database['public']['Enums']['article_type']
          unique_id?: string
        }
        Relationships: []
      }
      quote_ai_interpretations: {
        Row: {
          content: string
          created_at: string
          id: number
          model_version: string
          quote_id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          model_version: string
          quote_id: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          model_version?: string
          quote_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'quote_ai_interpretation_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
          },
        ]
      }
      quote_ai_stories: {
        Row: {
          content: Json
          created_at: string
          id: number
          model_version: string
          quote_id: number
          title: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: number
          model_version: string
          quote_id: number
          title: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: number
          model_version?: string
          quote_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quote_ai_story_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
          },
        ]
      }
      quote_people: {
        Row: {
          birth_year: number | null
          created_at: string
          death_year: number | null
          description: string | null
          id: number
          updated_at: string
        }
        Insert: {
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          description?: string | null
          id?: number
          updated_at?: string
        }
        Update: {
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          description?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          id: number
          korean_text: string | null
          original_text: string
          quote_person_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          korean_text?: string | null
          original_text: string
          quote_person_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          korean_text?: string | null
          original_text?: string
          quote_person_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quotes_quote_person_id_fkey'
            columns: ['quote_person_id']
            isOneToOne: false
            referencedRelation: 'quote_people'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          role: Database['public']['Enums']['user_role']
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id: string
          name?: string | null
          role?: Database['public']['Enums']['user_role']
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: Database['public']['Enums']['user_role']
          updated_at?: string
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
      article_type: 'ai' | 'backEnd' | 'frontEnd' | 'it' | 'lifeStyle' | 'trend'
      user_role: 'user' | 'admin'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
