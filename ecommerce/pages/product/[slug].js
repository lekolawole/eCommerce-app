import React from 'react';
import index from '..';
import { client, urlFor } from '../../lib/client';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[0])} />
          </div>  
          <div className='small-images-container'>

          </div>
        </div>
      </div>
    </div>
  )
}

//Requires paths to products to be known 
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths, 
    fallback: 'blocking'
  }
};

//Get props at stage, since it's not user-specific, data is already stored
export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
};

export default ProductDetails;