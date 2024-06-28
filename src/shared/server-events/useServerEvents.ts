import socket from "socket.io-client";

export const io = socket(import.meta.env.VITE_WS_URL, {
  autoConnect: true,
});

type OrderUpdateCallback = (data: { orderId: string }) => void;
const onOrderUpdateFns: OrderUpdateCallback[] = [];
io.on("order updated by servant", async (data) => {
  console.log("order updated by servant", { data });
  onOrderUpdateFns.forEach((f) => f(data));
});

type MenuUpdateCallback = () => void;
const onMenuUpdateFns: MenuUpdateCallback[] = [];
io.on("menu updated", async () => {
  console.log("menu updated ");
  onMenuUpdateFns.forEach((f) => f());
});

type TelegramAttachCallback = (data: {
  chatId: number;
  userId: number;
}) => void;

export default () => {
  return {
    onOrderUpdate: (callback: OrderUpdateCallback) => {
      onOrderUpdateFns.push(callback);
    },

    onMenuUpdate: (callback: MenuUpdateCallback) => {
      onMenuUpdateFns.push(callback);
    },

    onAttachTelegram: (orderId: string, callback: TelegramAttachCallback) => {
      io.once(`telegram attached to ${orderId}`, async (data) => {
        callback(data);
      });
    },

    emitOrderCreate: (orderId: string) =>
      io.emit("order created by client", { orderId }),

    emitOrderUpdate: (orderId: string) =>
      io.emit("order updated by client", { orderId }),

    // emitOrderDelete: (orderId: string) =>
    //   io.emit("order deleted by client", { orderId }),
  };
};
