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
    id:string
}