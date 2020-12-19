export class ResPrueba {
  id: number;
  id_cliente: number;
  producto: string;
  cantidad: number;
  subtotal: number;

  constructor(
    id: number,
    id_cliente: number,
    producto: string,
    cantidad: number,
    subtotal: number
  ) {
    this.id = id;
    this.id_cliente = id_cliente;
    this.producto = producto;
    this.cantidad = cantidad;
    this.subtotal = subtotal;
  }
}