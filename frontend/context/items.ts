export type Item = {
  id: number;
  type: "FIND" | "LOST" | "DONATION";
  title: string;
  picture: string;
  description: string;
  city: string;
  state: string;
  street: string;
  district: string;
  number: number;
  complement: string;
};
