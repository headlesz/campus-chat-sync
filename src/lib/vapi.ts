import Vapi from '@vapi-ai/web';

let client: any | null = null;

export function getVapi() {
  if (client) return client;
  const key = import.meta.env.VITE_VAPI_PUBLIC_API_KEY as string | undefined;
  if (!key) return null;
  try {
    client = new (Vapi as any)(key);
    return client;
  } catch {
    return null;
  }
}
