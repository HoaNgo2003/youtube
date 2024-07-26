import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, config } from '../../../helpers/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddVideoForm = () => {
  const navigate = useNavigate()
  const [videoData, setVideoData]= useState({})
  const [category, setCategory] = useState([])
  const handleChange = (e)=>{
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.value
    })
  }
  useEffect(()=>{
    const getAllCategory = async()=>{
      const {data} =await axios.get(`${API_BASE_URL}/category`)
      setCategory(data)
      console.log(data)
    }
    getAllCategory()
  },[])
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(videoData)
    setVideoData({
      ...videoData
      
    })
    try {
      console.log(videoData)
      const data = await axios.post(`${API_BASE_URL}/video/create`,videoData, config)
    console.log(data)
    toast.success("Create video success", {position:"top-center"})
    navigate('/admin/videolist')
    } catch (error) {
      toast.error(error.response.data.error)
    }
    
  }
  return (
    <div>
      <h1>Tạo video</h1>
      <form action="" className='add-video'>
        <div className="add-row">
          <span>Kênh phát hành:</span>
          <span style={{color:"black"}}>Admin</span>
        </div>
        <div className="add-row">
          <span>Tiêu đề</span>
          <input name='title' type="text" onChange={handleChange} placeholder='Tiêu đề' />
        </div>
        <div className="add-row">
          <span>Ảnh đại diện</span>
          <input name='image'  onChange={handleChange} type="text" placeholder='Image' />
        </div>
        <div className="add-row">
          <span>Mô tả</span>
          <textarea  onChange={handleChange} name="description" id="" placeholder='Mô tả'></textarea>
        </div>
        <div className="add-row">
          <span>Thể loại</span>
           <select  onChange={handleChange} name="categoryId" id="">
            <option selected value="">---Choose---</option>
            {category && category.map((item, index)=><>
              <option key={index} value={item.value}>{item.value}</option>
            </>)}
           
            
           </select>
        </div>
        <div className="add-row">
          <span>Link video</span>
          <input  onChange={handleChange} name='link' type="text" placeholder='Link video' />
        </div>
        <button onClick={handleSubmit}>Thêm video</button>
      </form>
    </div>
  )
}

export default AddVideoForm
