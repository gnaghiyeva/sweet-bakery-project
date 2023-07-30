import React from 'react'
import followStyle from '../../../../style/follow.module.css'
import { Grid } from '@mui/material'
import FacebookIcon from '../../../../assets/logos/facebook.png'
import TwitterIcon from '../../../../assets/logos/twitter.png'
import GoogleIcon from '../../../../assets/logos/google.png'
import FlickerIcon from '../../../../assets/logos/flicker.png'
import InstagramIcon from '../../../../assets/logos/instagram.png'
import VimeoIcon from '../../../../assets/logos/vimeo.png'
const Follow = () => {
    return (
        <section className={followStyle.follow_container}>

            <article>
                <h1 className={followStyle.follow_title}>Follow Us</h1>
                <div className={followStyle.follow_img_container}>
                    <img className={followStyle.follow_img} src='http://www.nicdarkthemes.com/themes/food/wp/demo/sweet-cake/wp-content/uploads/sites/2/2019/04/divider-social1200-1024x33.png' />
                </div>
            </article>


            <Grid container spacing={2} style={{ padding: '0px 60px' }} >
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={FacebookIcon}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={TwitterIcon}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={GoogleIcon}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={FlickerIcon}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={InstagramIcon}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={VimeoIcon}/>
                </div>
            </Grid>
            </Grid>
        </section>
    )
}

export default Follow