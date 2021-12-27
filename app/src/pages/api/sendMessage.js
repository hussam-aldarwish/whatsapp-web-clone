import Pusher from "pusher";

async function handle(req, res) {
  const pusher = new Pusher({
    appId: process.env.app_id,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true,
  });
  if (req.method === "POST") {
    const message = req.body;
    await pusher.trigger("my-channel", "chat-update", message);
    res.json({ status: 200 });
  }
}

export default handle;
