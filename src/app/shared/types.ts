export interface LoginType {
  username: string;
  password: string;
}
export interface ModalType {
  title: string;
  content: string;
  isConfirmButton: boolean;
  confirmButtonAction?: () => void;
}

export interface LoaderType {
  isLoading: boolean;
  message: string;
}

export interface Product {
  productId: number;
  productName: string;
  description: string;
  imgUrl?: string;
  voltage?: string;
  type: string;
  price: string;
  rating?: string;
  ratio?: string;
  accuracy?: string;
}

export interface CustomerReviewType {
  name: string;
  role: string;
  imgURL: string;
  review: string;
  rating: string;
}

export interface Service {
  serviceId: number;
  serviceName: string;
  imgUrl: string;
  description: string;
  duration: string;
}
