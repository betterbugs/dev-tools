declare module "js-user-country" {
  interface Country {
    id: string;
    name: string;
  }

  function getUserCountry(): Promise<Country>;
  export default getUserCountry;
}
