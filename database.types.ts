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
      ai_stories: {
        Row: {
          content: Json
          created_at: string
          id: number
          model_version: string
          prompt: string | null
          title: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: number
          model_version: string
          prompt?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: number
          model_version?: string
          prompt?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quote_ai_stories_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      ai_stories_compositions: {
        Row: {
          child_ai_story_id: number
          created_at: string
          id: number
          parent_ai_story_id: number
        }
        Insert: {
          child_ai_story_id: number
          created_at?: string
          id?: number
          parent_ai_story_id: number
        }
        Update: {
          child_ai_story_id?: number
          created_at?: string
          id?: number
          parent_ai_story_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'ai_stories_compositions_child_ai_story_id_fkey'
            columns: ['child_ai_story_id']
            isOneToOne: false
            referencedRelation: 'ai_stories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ai_stories_compositions_parent_ai_story_id_fkey'
            columns: ['parent_ai_story_id']
            isOneToOne: false
            referencedRelation: 'ai_stories'
            referencedColumns: ['id']
          },
        ]
      }
      ai_stories_quotes: {
        Row: {
          ai_story_id: number
          created_at: string
          id: number
          quote_id: number
        }
        Insert: {
          ai_story_id: number
          created_at?: string
          id?: number
          quote_id: number
        }
        Update: {
          ai_story_id?: number
          created_at?: string
          id?: number
          quote_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'quote_ai_stories_quotes_quote_ai_story_id_fkey'
            columns: ['ai_story_id']
            isOneToOne: false
            referencedRelation: 'ai_stories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quote_ai_stories_quotes_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
          },
        ]
      }
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
          prompt: string | null
          quote_id: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          model_version: string
          prompt?: string | null
          quote_id?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          model_version?: string
          prompt?: string | null
          quote_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'quote_ai_interpretations_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quote_ai_interpretations_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
          name: string
          updated_at: string
        }
        Insert: {
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          description?: string | null
          id?: number
          name?: string
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
      article_type: 'trendAndLifestyle' | 'ai' | 'frontend'
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
