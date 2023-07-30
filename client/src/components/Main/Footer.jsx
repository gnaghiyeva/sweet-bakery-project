import React from 'react'
import footerStyle from '../../style/footer.module.css'
const Footer = () => {
    return (
        <footer className={footerStyle.footer_container}> 
            <article className={footerStyle.footer_text_container}>
                <p className={footerStyle.footer_text}>Copyright 2019 NicdarkThemes.com</p>
            </article>
        </footer>
    )
}

export default Footer