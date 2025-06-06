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
      chat_history: {
        Row: {
          created_at: string | null
          id: string
          messages: Json
          session_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          messages: Json
          session_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          messages?: Json
          session_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      integration_commands: {
        Row: {
          created_at: string
          description: string | null
          endpoint: string | null
          example: string | null
          id: string
          integration_id: string
          is_active: boolean
          method: string | null
          name: string
          parameters: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          endpoint?: string | null
          example?: string | null
          id?: string
          integration_id: string
          is_active?: boolean
          method?: string | null
          name: string
          parameters?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          endpoint?: string | null
          example?: string | null
          id?: string
          integration_id?: string
          is_active?: boolean
          method?: string | null
          name?: string
          parameters?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_commands_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          category: string
          config: Json
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      memories: {
        Row: {
          assistant_reply: string | null
          content: string
          created_at: string | null
          id: string
          intent: string | null
          relevance_score: number | null
          tags: Json | null
          updated_at: string | null
          user_id: string
          user_input: string | null
        }
        Insert: {
          assistant_reply?: string | null
          content: string
          created_at?: string | null
          id?: string
          intent?: string | null
          relevance_score?: number | null
          tags?: Json | null
          updated_at?: string | null
          user_id: string
          user_input?: string | null
        }
        Update: {
          assistant_reply?: string | null
          content?: string
          created_at?: string | null
          id?: string
          intent?: string | null
          relevance_score?: number | null
          tags?: Json | null
          updated_at?: string | null
          user_id?: string
          user_input?: string | null
        }
        Relationships: []
      }
      user_data: {
        Row: {
          chat_history: Json | null
          created_at: string
          custom_commands: Json | null
          data_version: number | null
          general_settings: Json | null
          id: string
          integration_settings: Json | null
          last_synced_at: string | null
          memories: Json | null
          model_config: Json | null
          speech_settings: Json | null
          sync_source: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_history?: Json | null
          created_at?: string
          custom_commands?: Json | null
          data_version?: number | null
          general_settings?: Json | null
          id?: string
          integration_settings?: Json | null
          last_synced_at?: string | null
          memories?: Json | null
          model_config?: Json | null
          speech_settings?: Json | null
          sync_source?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_history?: Json | null
          created_at?: string
          custom_commands?: Json | null
          data_version?: number | null
          general_settings?: Json | null
          id?: string
          integration_settings?: Json | null
          last_synced_at?: string | null
          memories?: Json | null
          model_config?: Json | null
          speech_settings?: Json | null
          sync_source?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          settings_data: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          settings_data?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          settings_data?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      merge_user_settings: {
        Args: { _user_id: string; _settings_data: Json }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
