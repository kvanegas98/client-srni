export class User {
  constructor(
    public _id: string,
    public primerNombre: string,
    public segundoNombre: string,
    public primerApellido: string,
    public segundoApellido: string,
    public direccion1: string,
    public direccion2: string,
    public tel: string,
    public movil: string,
    public cedula: string,
    public email: string,
    public password: string,
    public intereses: string,
    public role: string
  ) {}
}
