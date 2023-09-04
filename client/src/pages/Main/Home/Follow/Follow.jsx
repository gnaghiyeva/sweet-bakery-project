import React from 'react'
import followStyle from '../../../../style/follow.module.css'
import { Grid } from '@mui/material'
import FacebookIcon from '../../../../assets/logos/facebook.png'
import TwitterIcon from '../../../../assets/logos/twitter.png'
import GoogleIcon from '../../../../assets/logos/google.png'
import FlickerIcon from '../../../../assets/logos/flicker.png'
import InstagramIcon from '../../../../assets/logos/instagram.png'
import VimeoIcon from '../../../../assets/logos/vimeo.png'
import followsDivider from  '../../../../assets/dividers/divider-social.png' 
const Follow = () => {
    return (
        <section className={followStyle.follow_container}>

            <article>
                <h1 className={followStyle.follow_title}>Follow Us</h1>
                <div className={followStyle.follow_img_container}>
                    <img className={followStyle.follow_img} src={followsDivider} alt='follow'/>
                </div>
            </article>


            <Grid container spacing={2} style={{ padding: '0px 60px' }} >
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={FacebookIcon} alt='facebbok'/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={TwitterIcon} alt='twitter'/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={GoogleIcon} alt='google'/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={FlickerIcon} alt='flicker'/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={InstagramIcon} alt='instagram'/>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
                <div style={{width:'70%',display:'block', margin:'auto'}}>
                <img style={{width:'100%'}} src={VimeoIcon} alt='vimeo'/>
                </div>
            </Grid>
            </Grid>
        </section>
    )
}

export default Follow