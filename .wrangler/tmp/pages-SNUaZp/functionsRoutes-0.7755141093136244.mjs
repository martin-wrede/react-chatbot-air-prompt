import { onRequest as __ai_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\ai.js"
import { onRequest as __ai_chatgpt_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\ai-chatgpt.js"
import { onRequest as __ai_github1_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\ai-github1.js"
import { onRequest as __ai_github2_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\ai-github2.js"
import { onRequest as __airtable_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\airtable.js"
import { onRequest as __airtable_github1_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\airtable-github1.js"
import { onRequest as __airtable_github2_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-chatbot-airtable\\functions\\airtable-github2.js"

export const routes = [
    {
      routePath: "/ai",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ai_js_onRequest],
    },
  {
      routePath: "/ai-chatgpt",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ai_chatgpt_js_onRequest],
    },
  {
      routePath: "/ai-github1",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ai_github1_js_onRequest],
    },
  {
      routePath: "/ai-github2",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ai_github2_js_onRequest],
    },
  {
      routePath: "/airtable",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__airtable_js_onRequest],
    },
  {
      routePath: "/airtable-github1",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__airtable_github1_js_onRequest],
    },
  {
      routePath: "/airtable-github2",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__airtable_github2_js_onRequest],
    },
  ]