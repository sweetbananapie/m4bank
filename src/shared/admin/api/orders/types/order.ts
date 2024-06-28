export interface Order {
  id: number;
  name: string;
  telephone: string;
  comment: string;
  telegramUser?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    telephone: string;
  };
  cooker: {
    id: number;
    username: string;
    email: string;
  };
  orderId: string;
  createdAt: string;
  updatedAt: string;
  isPayed: boolean | null;
  status: string;
  items: Item[];
  messages: Message[];
}

interface Item {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

interface Message {
  id: number;
  text: string;
  notify: boolean;
  createdAt: string;
  updatedAt: string;
}
