import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../../api/requests';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import productStyle from '../../../style/products.module.css'
import { Grid } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data)
    })
  }, [])
  return (
    <Grid container spacing={2} style={{ padding: '50px 140px' }}>
      {products && products.map((product) => {
        return (
          <Grid item sm={6} xs={12} md={3}>
            <Card style={{border:'none', boxShadow:'none'}}>
              <div className={productStyle.product_image_container}>

              <Card.Img variant="top" src={product.image} />
              <span className={productStyle.product_image}>
                {product.onSale ? 'SALE !':'No Sale'}
                
              </span>
              </div>
              <Card.Body>
                <Card.Title className={productStyle.product_title}>{product.title}</Card.Title>
                <Card.Text className={productStyle.product_prices}>
                  <span style={{textDecoration:product.onSale ? 'line-through':'none'}}>
                   
                 ${product.price.toFixed(2)}
                  </span> 
                  <span style={{textDecoration:'underline'}}>
                  {product.priceDiscount ?  '$'+ product.priceDiscount.toFixed(2) :''}
                  </span>
                </Card.Text>
                <Button variant="light">Add to Cart</Button>
              </Card.Body>
            </Card>

            
          </Grid>
        )
      })}

    </Grid>
  )
}

export default Products