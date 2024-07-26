import React from 'react'

const Views = () => {
  return (
    <div>
      <h1>Thống kê</h1>
      <table className='static-search'>
        <tr>
          <th>Thống kê</th>
          <th>Từ</th>
          <th>Đến</th>
          <th>Link video</th>
        </tr>
        <tr>
          <td>
            <select name="" id="">
              <option value="">Ngày</option>
              <option value="">Tháng</option>
            </select>
          </td>
          <td>
            <input type="date" />
          </td>
          <td>
            <input type="date" />
          </td>
          <td>
            <input type="text" placeholder='Nhập link video' />
          </td>
        </tr>
      </table>
      <div className="search">
        <button>Xem thống kê</button>
      </div>
      <table className="static">
      <tr>
        <th>Kênh</th>
        <th>Thời gian</th>
        <th>Lượt truy cập</th>
      </tr>
      <tr>
        <td>Admin</td>
        <td>23/7/2024</td>
        <td>11</td>
      </tr>
       <tr>
        <td>Tổng</td>
        <td></td>
        <td>111</td>
       </tr>
      </table>
    </div>
  )
}

export default Views
