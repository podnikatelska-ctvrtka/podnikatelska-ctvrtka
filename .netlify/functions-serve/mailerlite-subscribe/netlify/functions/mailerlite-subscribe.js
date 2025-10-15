"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/mailerlite-subscribe.js
var mailerlite_subscribe_exports = {};
__export(mailerlite_subscribe_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(mailerlite_subscribe_exports);
async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }
  try {
    const { email, name } = JSON.parse(event.body);
    console.log("\u{1F4E7} MailerLite subscription request:", { email, name });
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" })
      };
    }
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.error("\u274C Missing MailerLite credentials in environment variables");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" })
      };
    }
    console.log("\u{1F4E4} Adding subscriber to MailerLite...");
    const mailerliteResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        fields: {
          name: name || ""
        },
        groups: [MAILERLITE_GROUP_ID],
        // Add to "Prelaunch" group
        status: "active",
        // Automatically confirm subscription
        subscribed_at: (/* @__PURE__ */ new Date()).toISOString()
      })
    });
    const mailerliteData = await mailerliteResponse.json();
    if (!mailerliteResponse.ok) {
      console.error("\u274C MailerLite API error:", mailerliteData);
      if (mailerliteData.message && mailerliteData.message.includes("already exists")) {
        console.log("\u26A0\uFE0F Subscriber already exists, returning success anyway");
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: "Email already subscribed",
            duplicate: true
          })
        };
      }
      throw new Error(`MailerLite API failed: ${JSON.stringify(mailerliteData)}`);
    }
    console.log("\u2705 Subscriber added to MailerLite:", mailerliteData.data);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Successfully subscribed to MailerLite",
        subscriber_id: mailerliteData.data.id
      })
    };
  } catch (error) {
    console.error("\u274C Subscription error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || "Failed to subscribe"
      })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=mailerlite-subscribe.js.map
