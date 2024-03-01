import React from 'react'
import '../tags.scss'
function Tag({text}) {
  return (
    <div className='tag-container'>{text}</div>
  )
}

export default Tag