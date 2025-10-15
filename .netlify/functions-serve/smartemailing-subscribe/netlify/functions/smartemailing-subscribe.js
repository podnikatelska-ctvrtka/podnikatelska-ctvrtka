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

// netlify/functions/smartemailing-subscribe.js
var smartemailing_subscribe_exports = {};
__export(smartemailing_subscribe_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(smartemailing_subscribe_exports);
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
    console.log("\u{1F4E7} Smartemailing subscription request:", { email, name });
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" })
      };
    }
    const SMARTEMAILING_USERNAME = process.env.SMARTEMAILING_USERNAME;
    const SMARTEMAILING_API_KEY = process.env.SMARTEMAILING_API_KEY;
    const SMARTEMAILING_LIST_ID = process.env.SMARTEMAILING_LIST_ID;
    if (!SMARTEMAILING_USERNAME || !SMARTEMAILING_API_KEY || !SMARTEMAILING_LIST_ID) {
      console.error("\u274C Missing Smartemailing credentials in environment variables");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" })
      };
    }
    const authToken = Buffer.from(`${SMARTEMAILING_USERNAME}:${SMARTEMAILING_API_KEY}`).toString("base64");
    console.log("\u{1F4E4} Adding subscriber to Smartemailing:", email);
    const smartemailingResponse = await fetch(`https://app.smartemailing.cz/api/v3/import`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        settings: {
          update: true,
          // Update existing contacts
          field_policy: "FILL_IN_EMPTY"
        },
        data: [{
          emailaddress: email,
          name: name || "",
          surname: "",
          contactlists: [
            {
              id: parseInt(SMARTEMAILING_LIST_ID),
              status: "confirmed"
              // Důležité: status kontaktu v listu
            }
          ],
          // Custom fields podle potřeby
          customfields: {
            // source: 'landing_page_prelaunch'
          }
        }]
      })
    });
    const smartemailingData = await smartemailingResponse.json();
    const successStatuses = ["ok", "created"];
    if (!smartemailingResponse.ok || !successStatuses.includes(smartemailingData.status)) {
      console.error("\u274C Smartemailing API error:", smartemailingData);
      throw new Error(`Smartemailing API failed: ${JSON.stringify(smartemailingData)}`);
    }
    console.log("\u2705 Subscriber added to Smartemailing:", smartemailingData);
    const contactInfo = smartemailingData.data?.[0] || smartemailingData;
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: smartemailingData.status === "created" ? "Email successfully added to Smartemailing list!" : "Email updated in Smartemailing list!",
        status: smartemailingData.status,
        contactId: contactInfo.contact_id,
        data: smartemailingData
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
//# sourceMappingURL=smartemailing-subscribe.js.map
