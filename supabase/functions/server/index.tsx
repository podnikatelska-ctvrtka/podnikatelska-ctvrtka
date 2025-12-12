import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8e1fcf9a/health", (c) => {
  return c.json({ status: "ok" });
});

// 📧 SEND QUIZ RESULTS EMAIL + ADD TO SMARTEMAILING
app.post("/make-server-8e1fcf9a/send-quiz-results", async (c) => {
  try {
    const body = await c.req.json();
    const { email, score, category, categoryLabel, name } = body;
    
    console.log('📧 Sending quiz results email to:', email);
    
    // TODO: Add Resend email + SmartEmailing logic here
    // For now, just log and return success
    console.log('📊 Quiz data:', { email, score, category, categoryLabel, name });
    
    return c.json({
      success: true,
      message: 'Email sent successfully (TODO: implement Resend + SmartEmailing)'
    });
    
  } catch (error) {
    console.error('❌ Error sending quiz email:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

Deno.serve(app.fetch);