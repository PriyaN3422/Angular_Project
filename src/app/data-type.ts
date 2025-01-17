export interface signUp{
    name:string,
    email:string,
    password:string
}

export interface login{
    email:string,
    password:string
}

export interface product{
    product:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:string,
    quantity: undefined | number,
    productId:undefined | string,
}

export interface cart{
    product:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id: undefined | string,
    quantity: undefined | number,
    productId:string,
    userId:string
}

export interface priceSummary{
    price:number;
    discount:number;
    delivery:number;
    tax:number;
    total:number;
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalprice:number,
    userId:string
}