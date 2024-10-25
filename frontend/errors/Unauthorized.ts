export default class Unauthorized extends Error {
  digest: string;
  constructor() {
    super(
      "Você precisa estar autenticado e ter permissão para acessar essa página!"
    );
    this.digest = "HTTP:401";
  }
}
