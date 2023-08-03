import qs from 'query-string'
import { Category, Colors, Image, Sizes } from "@prisma/client";
import axios from "axios";

interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Sizes;
    color: Colors;
    images: Image[];
}




const URL = `${process.env.FRONTEND_STORE_URL}/api/products`;
interface Query{
    id?: string; 
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    productForId?: string;
    isFeatured?: boolean;
}
const getProducts = async(query: Query): Promise<Product[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            id: query.id,
            categoryId: query.categoryId,
            colorId: query.colorId,
            sizeId: query.sizeId,
            productForId: query.productForId,
            isFeatured: query.isFeatured
        }
    })
    const res = await axios.get(url)
    return res.data;
}

export default getProducts