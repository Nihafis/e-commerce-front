import { useState } from "react";
import styled from "styled-components";
const Image = styled.img`
max-width: 100%;
max-height:100%;    
`;


const BigImage = styled.img`
    max-width:100%;
    mac-height:200px;

`
const ImageButtons = styled.div`
    display:flex;
    gap:10px;
    flex-grow:0;
    margin-top:10px;
`;

const ImagesButton = styled.div`
    border:2px solid #aaa;  
    ${props => props.active ? `
        border-color:red;
    `: `
        border-color:transparent;

    `}
  
    height:40px;
    padding:2px;
    cursor:pointer;
    border-radius:5px;

`;

const BigImageWrapper = styled.div`
    text-align:center;

`;

export default function ProductImages({ images }) {
    const [acTiveImage, setActiveImage] = useState(images?.[0]);



    return (
        <>
            <BigImageWrapper>
                <BigImage src={acTiveImage} />
            </BigImageWrapper>

            <ImageButtons>
                {images.map(image => (
                    <ImagesButton
                        key={image}
                        active={image === acTiveImage}
                        onClick={() => setActiveImage(image)}>
                        <Image src={image} />
                    </ImagesButton>
                ))}
            </ImageButtons>
        </>
    );
}