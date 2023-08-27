import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'antd';
import { getAllDatas } from '../../../api/requests';
import { Grid, TextareaAutosize } from '@mui/material';
import emailjs from '@emailjs/browser';
import contactStyle from '../../../style/contact.module.css'
import toast, { Toaster } from 'react-hot-toast';
const ContactData = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getAllDatas().then((res) => {
      setDatas(res.data)
    })
  }, [])

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    // Perform input validation here
    const nameInput = form.current.elements.name.value;
    const emailInput = form.current.elements.email.value;
    const subjectInput = form.current.elements.text.value;
    const messageInput = form.current.elements.message.value;
  
    if (!nameInput || !emailInput || !subjectInput || !messageInput) {
      toast.error('Please fill in all fields before sending.');
      return;
    }
  
    emailjs.sendForm('service_8n4vf29', 'template_qbbqfes', form.current, '3b0tXXJQBpnlZ8vpE')
      .then((result) => {
        console.log(result.text);
        form.current.reset();
        toast.success('Email sent successfully!');
      })
      .catch((error) => {
        console.log(error.text);
        toast.error('Error sending email.');
      });
  };
  
  return (
    <Grid container spacing={4} >
      {datas && datas.map((data) => {
        return (
          <Grid item sm={12} xs={12} md={6} lg={6}>
            <article>
              <h4>{data.title}</h4>
              <p>{data.desc}</p>
            </article>

            <form ref={form} onSubmit={sendEmail}>
              <div class="form-group">
                <input name='name' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" />
              </div>
              <br />
              <div class="form-group">
                <input name='email' type="email" class="form-control" id="exampleInputPassword1" placeholder="Email" />
              </div>
              <br />
              <div class="form-group">
                <input name='text' type="text" class="form-control" id="exampleInputPassword1" placeholder="Subject" />
              </div>
              <br />
              <TextareaAutosize className={contactStyle.form_textarea} style={{ height: '100px' }} name="message" type='text' placeholder='Message...' /><br /> <br />
              <button className={contactStyle.form_button} type="submit" value="Send" > Send Now</button>
                  <Toaster position="top-center" />
            </form>
          </Grid>

        )
      })}





    </Grid>

  )
}

export default ContactData