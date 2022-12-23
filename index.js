const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const upload = multer();

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  var app = express();
  app.use(cors());
  app.use(upload.array());

  app.post("/api/send-message", (req, res) => {
    const { number, message } = req.body;

    client.getNumberId(number).then((contact) => {
      let formattedNumber = contact._serialized;

      client.sendMessage(formattedNumber, message).then((response) => {
        let messageId = response.id._serialized;

        res.send({
          success: true,
          message: "Message sent successfully",
          data: {
            messageId,
          },
        });
      });
    });
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

client.initialize();
