export type Tproduct = {
    id: number;
    image: string;
    name: string;
    value: number;
    stock: number;
    qtd: number;
    valueTotal: number;
}

export type TcreateProduct = {
    name: string;
    image: string;
    value: number;
    stock: number;
}