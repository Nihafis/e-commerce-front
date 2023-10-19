import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import Link from "next/link";

import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContex";


const Bg = styled.div`
    background-color:#222;
    color:#fff;
    padding: 50px 0;
`

const Title = styled.h1`
    margin:0;
    font-weight:normal; 
    font-size:1.5rem;
    @media screen and (min-width: 768px){
        font-size:3rem;
    }
  
`;

const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;

`;

const ColumnsWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    gap:40px;
    img{
        max-width:100%
        max-height:200px;
        display:block;
        margin: 0 auto;
    }   

    div:nth-child(1) {
        order:2;
    }

    

    @media screen and (min-width: 768px){
        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1) {
            order:0;
        }

        img{
            max-width:100%
        }   
        
    }

`;

const Column = styled.div`
display: flex;
align-items: center;
`;

const ButtonsWrapper = styled.div`
    display:flex;
    gap:10px;
    margin-top:25px;
`;

export default function Featured({ products }) {
    const { addProduct } = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(products._id)
    }
    return (
        <Bg>
            <Center>

                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{products.title}</Title>
                            <Desc>
                                {products.description}
                            </Desc>
                            <ButtonsWrapper>

                                <ButtonLink href={'/product/' + products._id} white={1} outline={1} >Read more</ButtonLink>
                                <Button white={1} onClick={addFeaturedToCart} >
                                    <CartIcon />
                                    Add to cart</Button>
                            </ButtonsWrapper>

                        </div>

                    </Column>
                    <Column>
                        <img src="https://fis-next-ecommerce.s3.amazonaws.com/1696847924006.jpg" />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}