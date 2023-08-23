import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../../api/requests';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import productStyle from '../../../style/products.module.css'
import { Alert, Grid } from '@mui/material';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useBasketContext } from '../../../context/BasketContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data)
    })
  }, [])

  const [user, setUser] = useUserContext()
  const navigate = useNavigate();
  const{basket,setBasket} = useBasketContext();
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

              
                <div>
                   
                  
                 <Button onClick={()=>{
                  if(!user){
                    toast.error("User is not logged in !")
                  }
                  else{
                    setBasket([...basket,product]);
                    <button>view added</button>
                    toast.success("product added succesfully !")
                    
                  }
                 }} variant="light">Add to Cart</Button>
                  
                  <Toaster position="top-center"  />
                </div>
               
             
              </Card.Body>
            </Card>

            
          </Grid>
        )
      })}

    </Grid>
  )
}

export default Products