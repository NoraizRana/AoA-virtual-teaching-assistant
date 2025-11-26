import API from "../utils/api";

export async function sendMessageToServer(text) {
  const res = await API.post("/chat", { text });
  return res.data.reply;
}
