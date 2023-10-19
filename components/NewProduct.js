import styled from "styled-components"
import Center from "./Center";
import ProductGrid from "./ProductGrid";




const Title = styled.h2`
    font-size:2rem;
    margin:30px 0 20px;
    font-weight:normal;
`


export default function NewProduct({ products }) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid products={products} />
        </Center>
    )
}