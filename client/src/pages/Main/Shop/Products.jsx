import React, { useEffect } from 'react'
import { getAllProducts } from '../../../api/requests';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import productStyle from '../../../style/products.module.css'
import { Grid } from '@mui/material';
import { useUserContext } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useBasketContext } from '../../../context/BasketContext';
import { useProductContext } from '../../../context/ProductsContext';

const Products = () => {
  const [products, setProducts] = useProductContext([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data)
    })
  })

  const [user, setUser] = useUserContext()
  console.log(setUser)
  const { basket, setBasket } = useBasketContext();
  return (
    <>
      <div style={{ margin: '50px auto', textAlign: 'center' }}>

        <Button variant="success" size="lg">
          <Link style={{ color: 'white', textDecoration: 'none', fontFamily: 'Lobster' }} to={'/shop/favourites'}>Go to Favourites</Link>
        </Button>
      </div>

      <Grid container spacing={2} style={{ padding: '50px 140px' }}>
        {products && products.map((product) => {
          return (
            <>

              <Grid item sm={6} xs={12} md={3}>
                <Card style={{ border: 'none', boxShadow: 'none' }}>
                  <div className={productStyle.product_image_container}>

                    <Link to={`/shop/${product._id}`}><Card.Img variant="top" src={product.image} /></Link>
                    <span style={{ display: product.onSale ? 'block' : 'none' }} className={productStyle.product_image}>
                      {product.onSale ? 'SALE !' : ''}

                    </span>
                  </div>
                  <Card.Body>
                    <Card.Title className={productStyle.product_title}>{product.title}</Card.Title>
                    <Card.Text className={productStyle.product_prices}>
                      <span style={{ textDecoration: product.onSale ? 'line-through' : 'none', color: product.onSale ? 'rgb(189,189,189)' : '', }}>

                        ${product.price.toFixed(2)}
                      </span>
                      <span style={{ textDecoration: 'underline' }}>
                        {product.priceDiscount ? '$' + product.priceDiscount.toFixed(2) : ''}
                      </span>
                    </Card.Text>


                    <div>


                      <Button onClick={() => {
                        if (!user) {
                          toast.error("User is not logged in !")
                        }
                        else {
                          setBasket([...basket, product]);
                          toast.success("product added succesfully !")

                        }
                      }} variant="light">Add to Cart</Button>

                      <Toaster position="top-center" />
                    </div>


                  </Card.Body>
                </Card>


              </Grid>
            </>
          )
        })}

      </Grid>
    </>
  )
}

export default Products