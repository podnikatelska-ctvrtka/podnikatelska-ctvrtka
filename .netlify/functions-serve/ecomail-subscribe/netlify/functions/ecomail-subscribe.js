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

// netlify/functions/ecomail-subscribe.js
var ecomail_subscribe_exports = {};
__export(ecomail_subscribe_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(ecomail_subscribe_exports);
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
    console.log("\u{1F4E7} Ecomail subscription request:", { email, name });
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" })
      };
    }
    const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY;
    const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID;
    if (!ECOMAIL_API_KEY || !ECOMAIL_LIST_ID) {
      console.error("\u274C Missing Ecomail credentials in environment variables");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" })
      };
    }
    console.log("\u{1F4E4} Adding subscriber to Ecomail...");
    const ecomailResponse = await fetch(`https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`, {
      method: "POST",
      headers: {
        "key": ECOMAIL_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subscriber_data: {
          email,
          name: name || "",
          surname: ""
        },
        trigger_autoresponders: true,
        // Spustí automation
        update_existing: true,
        resubscribe: true
      })
    });
    const ecomailData = await ecomailResponse.json();
    if (!ecomailResponse.ok) {
      console.error("\u274C Ecomail API error:", ecomailData);
      if (ecomailData.errors && ecomailData.errors.email) {
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
      throw new Error(`Ecomail API failed: ${JSON.stringify(ecomailData)}`);
    }
    console.log("\u2705 Subscriber added to Ecomail:", ecomailData);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Successfully subscribed to Ecomail"
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
//# sourceMappingURL=ecomail-subscribe.js.map
