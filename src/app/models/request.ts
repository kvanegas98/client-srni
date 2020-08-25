export class Request {
  constructor(
    public tipoSolicitud: string,
    public asunto: string,
    public detalle: string,
    public info: string,
    public ubicacion: string,
    public prioridad: string,
    public adjunto: Array<File> //public adjunto: string
  ) {}
}
