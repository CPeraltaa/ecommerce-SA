import {Descripcion} from './Descripcion';
export interface RequestMail{
    tipo:number;
    para:string;
    articulos:Descripcion[];
    totalCompra:number; 
    productoAgotado:string
}