const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const accountSid = "AC3d4469bba31749e15c711ac99b743439";
const authToken = "AUTH_TOKEN_HERE"; // حطه هنا
const client = require("twilio")(accountSid, authToken);

exports.sendWhatsWinner = functions.database
  .ref("/winners/{id}")
  .onCreate(async (snap) => {

    const data = snap.val();
    const phone = data.whatsapp;

    return client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+2${phone.replace(/^0/,'')}`,
      body:
`🎉 مبروك!
أنت الفائز في عجلة الحظ 🎡

👤 Roblox: ${data.roblox}
سيتم التواصل معك قريبًا ❤️`
    });
});
