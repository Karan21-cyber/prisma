export interface Person {
  name: string;
  age: number;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  interests: string[];
}
