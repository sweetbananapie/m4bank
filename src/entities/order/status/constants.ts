import { reactive } from "vue";

export const orderStatusConstants = reactive([
  {
    status: "created",
    title: "Новый заказ",
    color: "#24cc24",
    published: true,
    client: {
      title: "Ваш заказ создан!",
      description: "Скоро его увидят и приступят к выполнению.",
    },
  },
  {
    status: "processed",
    title: "Готовится",
    color: "#e44ce4",
    published: true,
    client: {
      title: "Ваш заказ приняли в работу",
      description: "Ожидайте, скоро всё будет готово!",
    },
  },
  {
    status: "ready",
    title: "Готов",
    color: "orange",
    published: true,
    client: {
      title: "Ваш заказ готов!",
      description: "Покажите телефон бармену, чтобы забрать заказ",
    },
  },
  {
    status: "finished",
    title: "Заказ завершён",
    color: "#24cc24",
    published: false,
    client: {
      title: "Заказ выдан",
      description: "",
    },
  },
  {
    status: "cancelled",
    title: "Отменён",
    color: "red",
    published: false,
    client: {
      title: "Заказ отменён",
      description: "",
    },
  },
] as const);

export type OrderStatus = (typeof orderStatusConstants)[number]["status"];

export const getOrderStatus = (status: OrderStatus) =>
  orderStatusConstants.find((item) => item.status === status);
