import { GoogleGenAI } from "@google/genai";

// Helper: read API key from Vite env or browser localStorage
const getConfiguredKey = () => {
  try {
    // import.meta.env is available in Vite-built code
    const envKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : undefined;
    if (envKey) return envKey;
  } catch (e) {
    // ignore
  }

  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('GEMINI_API_KEY');
    if (stored) return stored;
  }

  // final fallback to process.env (node/build-time)
  try {
    if (typeof process !== 'undefined') return process.env?.GEMINI_API_KEY || '';
  } catch (e) {}

  return '';
};

let ai = null;

const initClient = (key) => {
  if (!key) return null;
  try {
    ai = new GoogleGenAI({ apiKey: key });
    return ai;
  } catch (err) {
    console.error('Failed to initialize Gemini client', err);
    ai = null;
    return null;
  }
};

// Initialize if env or localStorage already has key
initClient(getConfiguredKey());

export const setApiKey = (key) => {
  if (typeof window !== 'undefined' && key) {
    window.localStorage.setItem('GEMINI_API_KEY', key);
  }
  return initClient(key);
};

const getClient = () => {
  if (ai) return ai;
  const key = getConfiguredKey();
  return initClient(key);
};

const safeCall = async (cb) => {
  const client = getClient();
  if (!client) {
    return { error: 'NO_API_KEY' };
  }

  try {
    return { result: await cb(client) };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return { error };
  }
};

export const geminiService = {
  async generateSummary(patientData) {
    const res = await safeCall((client) =>
      client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a clinical assistant. Summarize this medical record for a clinician. Highlight critical risks, lab abnormalities, and recent changes. Keep it concise, professional, and action-oriented.\n\nPatient Data: ${JSON.stringify(patientData)}`,
        config: { temperature: 0.2 },
      })
    );

    if (res.error) {
      if (res.error === 'NO_API_KEY') return 'No Gemini API key configured. Paste it in the chat settings to enable the assistant.';
      return 'Clinical summary generation failed due to an API error.';
    }

    return res.result?.text || 'Clinical summary generation failed.';
  },

  async predictRisk(patientData) {
    const res = await safeCall((client) =>
      client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these patient vitals and lab results: ${JSON.stringify(patientData)}. Predict common clinical risks like sepsis, cardiac events, or metabolic crisis. Return your response as a JSON object with: - riskScore (0-100) - riskLevel (Low, Moderate, High, Critical) - topConcerns (array of strings) - rationale (brief string)`,
        config: { responseMimeType: 'application/json', temperature: 0.1 },
      })
    );

    if (res.error) {
      if (res.error === 'NO_API_KEY') return { error: 'No Gemini API key configured.' };
      return { error: 'Risk analysis service unavailable' };
    }

    try {
      return JSON.parse(res.result.text);
    } catch (e) {
      return { riskScore: 50, riskLevel: 'Unknown', topConcerns: ['Data unavailable'] };
    }
  },

  async chatWithAssistant(message, history) {
    const res = await safeCall((client) => {
      const formattedHistory = (history || []).map((h) => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] }));

      const chat = client.chats.create({
        model: 'gemini-3-flash-preview',
        history: formattedHistory,
        config: {
          systemInstruction: `You are MediSync Buddy, a professional clinical AI assistant. Your goal is to help clinicians manage patient data, understand protocols, and provide 2nd opinions on medical interpretations. Always be professional, concise, and emphasize that your insights are for reference only and clinical judgment is primary. You have access to patient summaries and general medical protocols.`,
        },
      });

      return chat.sendMessage({ message });
    });

    if (res.error) {
      if (res.error === 'NO_API_KEY') return "No Gemini API key configured. Paste it in the chat settings to enable the assistant.";
      return "I'm having trouble connecting to my clinical database. Please try again.";
    }

    return res.result?.text || "I'm sorry, I couldn't generate a response.";
  },
};

