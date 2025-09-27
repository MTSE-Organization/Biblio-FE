export type ProductImageResType = {
  id: string;
  url: string;
  ordering: number;
  isDefault: boolean;
  productId: number;
  createdDate: string;
  modifiedDate: string;
};

export type ProductImageAutoType = {
  id: string;
  url: string;
  ordering: number;
  isDefault: boolean;
  status: number;
};
