import socket from "socket.io-client";

export const io = socket(import.meta.env.VITE_WS_URL, {
  autoConnect: true,
});

type OrderUpdateCallback = (data: { orderId: string }) => void;
const onOrderUpdateFns: OrderUpdateCallback[] = [];
io.on("order updated by client", async (data) => {
  console.log("order updated by client", { data });
  onOrderUpdateFns.forEach((f) => f(data));
});
io.on("order updated by servant", async (data) => {
  console.log("order updated by servant", { data });
  onOrderUpdateFns.forEach((f) => f(data));
});

type OrderCreateCallback = (data: { orderId: string }) => void;
const onOrderCreateFns: OrderCreateCallback[] = [];
io.on("order created by client", async (data) => {
  console.log("order created by client", { data });
  onOrderCreateFns.forEach((f) => f(data));
});

type MenuUpdateCallback = () => void;
const onMenuUpdateFns: MenuUpdateCallback[] = [];
io.on("menu updated", async () => {
  console.log("menu updated ");
  onMenuUpdateFns.forEach((f) => f());
});

export default () => {
  return {
    onOrderUpdate: (callback: OrderUpdateCallback) => {
      onOrderUpdateFns.push(callback);
    },

    onOrderCreate: (callback: OrderCreateCallback) => {
      onOrderCreateFns.push(callback);
    },

    onMenuUpdate: (callback: MenuUpdateCallback) => {
      onMenuUpdateFns.push(callback);
    },

    emitOrderUpdate: (orderId: string) =>
      io.emit("order updated by servant", { orderId }),

    emitOrderDelete: (orderId: string) =>
      io.emit("order deleted by servant", { orderId }),

    emitMenuUpdate: () => io.emit("menu updated"),
  };
};
