import React from 'react';

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='input-image' src={imageURL} alt='sample' width='500px' height='auto' />
        <div 
          className='bounding-box' 
          style={{ top:box.top_row, right: box.right_col, bottom: box.bottom_row, left:box.left_col }}>
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;