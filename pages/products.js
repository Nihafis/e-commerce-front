import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";





export default function ProductsPage({ products }) {
    return (

        <>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductGrid products={products} />
            </Center>

        </>

    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } })

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}