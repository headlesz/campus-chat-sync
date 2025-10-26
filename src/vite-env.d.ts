/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_VAPI_PUBLIC_API_KEY: string;
  readonly VITE_VAPI_ASSISTANT_ID: string;
  readonly VITE_ANTHROPIC_API_KEY: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_AI_DATE_CALENDAR_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
