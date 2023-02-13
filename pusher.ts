import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1553201",
  key: "d67b473ca345fc9be976",
  secret: "c233230f07fcc27eff51",
  cluster: "ap1",
  useTLS: true
})

export const clientPusher = new ClientPusher('d67b473ca345fc9be976', {
  cluster: 'ap1',
  forceTLS: true
})