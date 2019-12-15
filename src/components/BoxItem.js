import React from 'react'
import './BoxItem.scss'

const BoxItem = props => {
  const { x, y, rank } = props

  const style = {
    transform: `translate(${x * 5}rem, ${y * 5}rem)`,
    backgroundImage: `url('/img/boxes/${rank}.png')`,
  }

  return <div className="box" style={style} />
}

export default BoxItem
