import 'dotenv/config';
import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'node:url';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '<YOUR_BOT_TOKEN>';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? '<YOUR_CHAT_ID>';
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());
app.use(express.json());

function hasTelegramConfig() {
  return !TELEGRAM_BOT_TOKEN.startsWith('<') && !TELEGRAM_CHAT_ID.startsWith('<');
}

app.post('/send-telegram', async (req, res) => {
  const { name, phone, message } = req.body ?? {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof phone !== 'string' ||
    !phone.trim() ||
    typeof message !== 'string' ||
    !message.trim()
  ) {
    return res.status(400).json({
      success: false,
      error: 'Name, phone, and message are required.',
    });
  }

  if (!hasTelegramConfig()) {
    return res.status(500).json({
      success: false,
      error: 'Telegram bot token or chat ID is not configured.',
    });
  }

  const text = [
    'New Portfolio Contact:',
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `Message: ${message.trim()}`,
  ].join('\n');

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text,
      },
    );

    return res.status(200).json({
      success: true,
      message: 'Telegram message sent successfully.',
      telegram: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        error.response?.data?.description ??
        error.message ??
        'Failed to send Telegram message.',
    });
  }
});

function startServer(port = PORT) {
  return app.listen(port, () => {
    console.log(
      `Telegram config loaded: token=${hasTelegramConfig() ? 'yes' : 'no'}, chatId=${
        TELEGRAM_CHAT_ID.startsWith('<') ? 'no' : 'yes'
      }`,
    );
    console.log(`Telegram backend listening on port ${port}`);
  });
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  startServer();
}

export { app, startServer };
