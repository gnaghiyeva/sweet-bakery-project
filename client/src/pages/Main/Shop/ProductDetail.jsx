import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProductSliders, getCommentById, getProductById, postComment } from '../../../api/requests';
import { Alert, Button, Grid, TextField } from '@mui/material';
import productdetailStyle from '../../../style/productDetail.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useBasketContext } from '../../../context/BasketContext';
import { useUserContext } from '../../../context/UserContext';

import { useFormik } from 'formik'
import { CommentsValidation } from '../../../validation/commentsSchema';
import Rating from '@mui/material/Rating';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  '../../../style/productSlider.module.css'
import textStyle from '../../../style/productSlider.module.css'
import { Bounce } from "react-awesome-reveal";

const ProductDetail = () => {
    const [comments, setComments] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState({})
    const [sliders, setSliders] = useState([]);
  
    const { id } = useParams();
    useEffect(() => {
        getProductById(id).then((res) => {
            setProducts(res.data);
        });
    }, [id]);

    useEffect(() => {
        getCommentById(id).then((res) => {
            console.log('API Cavabı:', res.data); // API cavabını konsola çıxar
            setComments(res.data)
        });
    }, [id]);
 
    

    useEffect(() => {
        getAllProductSliders().then((res) => {
          setSliders(res.data)
          console.log(res.data)
        })
      }, [])

    const [user, setUser] = useUserContext()
    console.log(setUser)
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        if(user){
            values.productID = id;
            await postComment(values)
            setComments([...comments,values])
            actions.resetForm()
            navigate(`/shop/${products._id}`)
        }


    }
    const formik = useFormik({
        initialValues: {
            rating: '',
            name: '',
            email: '',
            review: ''
        },
        validationSchema: CommentsValidation,
        onSubmit: handleSubmit,
    })
    const { basket, setBasket } = useBasketContext();
    return (
        <>

<Swiper
      pagination={{
        type: 'progressbar',
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {sliders && sliders.map((slider) => (

        <SwiperSlide key={slider._id} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${slider.image}) `, backgroundSize: 'cover', backgroundPosition: 'center', padding: '140px 0', width: '100%' }}>
          <article className={textStyle.slider_text}>
            <Bounce>
              <h1 className={textStyle.slider_text_h1}>{slider.title}</h1>
            </Bounce>
          </article>
        </SwiperSlide>
      ))}
     </Swiper>

            <Grid container spacing={10} style={{ padding: '50px 80px' }}>


                <Grid item sm={12} xs={12} md={6} lg={6}>
                    <div className={productdetailStyle.product_image_container}>
                        <img src={products.image} alt='productImage' />
                        <span style={{ display: products.onSale ? 'block' : 'none' }} className={productdetailStyle.product_image}>
                            {products.onSale ? 'SALE !' : ''}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={12} xs={12} md={6} lg={6}>
                    <div className={productdetailStyle.product_image_container}>
                        <h3 className={productdetailStyle.product_title}>{products.title}</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                            <h3 style={{ color: '#7E7E7E', fontFamily: 'Lobster' }}>{products.price ? '$' + products.price.toFixed(2) : ''}</h3>
                            <h3 style={{ color: '#7E7E7E', fontFamily: 'Lobster' }}>{products.priceDiscount ? '$' + products.priceDiscount.toFixed(2) : ''}</h3>
                        </div>
                        <br /><br />

                        <div>
                            <p style={{ color: '#7E7E7E', fontFamily: 'Old Standard TT', lineHeight: '2em' }}>{products.desc}</p>
                        </div>


                        <div style={{ display: 'flex', gap: '20px' }}>
                            <input type='number' value={quantity} min={1} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ width: '15%' }} />
                            <button style={{ padding: '7px 30px', backgroundColor: '#BFE1A4', color: 'white', fontFamily: 'Lobster', border: 'none' }} onClick={() => {
                                if (!user) {
                                    toast.error("User is not logged in !")
                                }
                                else {
                                    const productsToAdd = Array(quantity).fill(products);
                                    setBasket([...basket, ...productsToAdd]);
                                    toast.success("product added succesfully !")

                                }
                            }} variant="light">Add to Cart</button>

                            <Toaster position="top-center" />
                        </div>
                    </div>
                </Grid>



            </Grid>

            <Grid container spacing={10} style={{ padding: '50px 80px' }}>

                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', width: '60%', padding: '50px 80px' }}>
                    <h5>Comments</h5>
                    {/* <TextField name='rating' type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rating} id="outlined-basic" label="rating" variant="outlined" />
                    {formik.errors.rating && formik.touched.rating && (<span>{formik.errors.rating}</span>)} */}

                    <p>Rating</p>
                    <Rating
                        name="rating"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rating}
                    />
                     {formik.errors.rating && formik.touched.rating && (<Alert severity="warning">{formik.errors.rating}</Alert>)}

                    <br />
                    <TextField name='review' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.review} id="outlined-basic" label="Your comment" variant="outlined" /><br />
                    {formik.errors.review && formik.touched.review && (<Alert severity="warning">{formik.errors.review}</Alert>)}

                    <TextField name='name' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /><br />
                    {formik.errors.name && formik.touched.name && (<Alert severity="warning">{formik.errors.name}</Alert>)}

                    <TextField name='email' type='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id="outlined-basic" label="email" variant="outlined" /><br />
                    {formik.errors.email && formik.touched.email && (<Alert severity="warning">{formik.errors.email}</Alert>)}


                    <Button style={{ width: '15%' }} variant='contained' color='success' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0} onClick={()=>{
                         if (!user) {
                            toast.error("User is not logged in !")
                          }
                          else{
                            toast.success("Comment posted succesfully !")
                          }
                    }}>Submit</Button>
                </form>
            </Grid>
           
            <div style={{ padding: '0 80px' }}>
    <h4 style={{ color: 'gray', fontFamily: 'Lobster' }}>Reviews</h4>
    {comments && comments.length > 0 ? (
        comments.map((comment) => (
            <div key={comment._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div>
                        <img style={{ borderRadius: '50%' }} src='http://0.gravatar.com/avatar/0560077b462e533e17d42326550ba365?s=60&d=mm&r=g' alt="İstifadəçi Avatarı" />
                    </div>
                    <div>
                        <h5>{comment.name}</h5>
                        <p>{comment.review}</p>
                    </div>
                </div>
                <div>
                    <Rating readOnly name="rating" value={comment.rating} />
                </div>
            </div>
        ))
    ) : (
        <p>No comments available.</p>
    )}
</div>

        </>
        
    )
}

export default ProductDetail

