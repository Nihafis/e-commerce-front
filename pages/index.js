import Featured from "@/components/Feature";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";



export default function HomePage({ featuredProduct, newProduct }) {


  return (
    <div>
      <Header />
      <Featured products={featuredProduct} />
      <NewProduct products={newProduct} />
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '6523d8723c2200b05a5d943e';
  mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProduct = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 })

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct))
    },
  }


}