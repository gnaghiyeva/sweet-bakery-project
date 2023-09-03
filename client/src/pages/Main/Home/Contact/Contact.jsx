import React, { useRef } from 'react'
import contactStyle from '../../../../style/contact.module.css'
import emailjs from '@emailjs/browser';
import { TextareaAutosize } from '@mui/material';
const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_w5vn4y9', form.current, 'dSgJh36b-64n40_h0')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <section className={contactStyle.contact_container}>
            <div className={contactStyle.contact_form_container}>
                <article>
                    <h6 className={contactStyle.contact_text}>Contact Us</h6>
                    <h2 className={contactStyle.contact_title}>Get in Touch</h2>
                </article>

                <form ref={form} onSubmit={sendEmail} >
                    <div class="form-group">
                        <input  name='name' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name"/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <input name='email' type="email" class="form-control" id="exampleInputPassword1" placeholder="Email"/>
                    </div>
                    <br/>
                    <TextareaAutosize className={contactStyle.form_textarea}  style={{height:'100px'}}  name="message"  type='text' placeholder='Message...'  /><br /> <br/>
                    <button className={contactStyle.form_button} type="submit" value="Send">Send Now</button>
                </form>
            </div>
        </section>
    )
}

export default Contact