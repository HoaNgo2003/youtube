import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Select from 'react-select';
import { API_BASE_URL, config } from '../../../helpers/config'
import { toast } from 'react-toastify'

const EditVideoForm = () => {
  const navigate = useNavigate()
  const [videoData, setVideoData]= useState({})
  const [category, setCategory] = useState([])
  const param = useParams()
  const {id} = param
   
   
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
  useEffect(()=>{
    const getVideoDetail = async()=>{
      const data = await axios.get(`${API_BASE_URL}/video/${id}`)
      setVideoData({
        ...videoData,
        ...data.data
      })
      
    }
    
    getVideoDetail()
    console.log(videoData)
  },[])
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(videoData)
    try {
      const data = await axios.patch(`${API_BASE_URL}/video/update/${id}`,videoData, config)
    console.log(data)
    toast.success("Update video success", {position:"top-center"})
    navigate('/admin/videolist')
    } catch (error) {
      toast.error(error.response.data.error)
    }
    
  }
  return (
    <div>
      <h1>Update video</h1>
      <form action="" className='add-video'>
        <div className="add-row">
          <span>Kênh phát hành:</span>
          <span style={{color:"black"}}>Admin</span>
        </div>
        <div className="add-row">
          <span>Tiêu đề</span>
          <input name='title' defaultValue={videoData.title} type="text" onChange={handleChange} placeholder='Tiêu đề' />
        </div>
        <div className="add-row">
          <span>Ảnh đại diện</span>
          <input name='image' defaultValue={videoData.image}  onChange={handleChange} type="text" placeholder='Image' />
        </div>
        <div className="add-row">
          <span>Mô tả</span>
          <textarea defaultValue={videoData.description}  onChange={handleChange} name="description" id="" placeholder='Mô tả'></textarea>
        </div>
        <div className="add-row">
          <span>Thể loại</span>
           <select  onChange={handleChange} name="categoryId" id="">
            <option value="">---Choose---</option>
            {category && category.map((item, index)=><>
              {videoData.categoryId===item.value?<option selected key={index} value={item.value}>{item.value}</option>:<option key={index} value={item.value}>{item.value}</option>}
            </>)}
           </select>
          
        </div>
        <div className="add-row">
          <span>Link video</span>
          <input defaultValue={videoData.link}  onChange={handleChange} name='link' type="text" placeholder='Link video' />
        </div>
        <button onClick={handleSubmit}>Update video</button>
      </form>
    </div>
  )
}

export default EditVideoForm
