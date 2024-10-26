export default class Unexpected extends Error {
  digest: string;
  constructor(code: string) {
    super(
      "Um erro inesperado aconteceu, por favor, tente novamente mais tarde!\nCódigo: " +
        code
    );
    this.digest = "HTTP:" + code;
  }
}
