import React, { useEffect, useState } from 'react'
import { getBlogDetailById } from '../../../../api/requests';
import { useParams } from 'react-router-dom';

const MyBlogDetail = () => {
  const [blogdetails, setBlogDetails] = useState([])
  const { id } = useParams();
  useEffect(() => {
    getBlogDetailById(id).then((res) => {
      setBlogDetails(res);
    });
  }, [id]);
  return (
    <>
    <ul>
      {blogdetails.map((detail)=>(
    <li>
      {detail.menuTitle}
    </li>

      ))}
    </ul>
    </>
  )
}

export default MyBlogDetail