import React from 'react'
import PropTypes from 'prop-types'
import './BoxItem.scss'

import Box from '../models/Box'

const BoxItem = ({ x, y, rank }) => {
  const style = {
    transform: `translate(${x * 5}rem, ${y * 5}rem)`,
    backgroundImage: `url('/img/boxes/${rank}.png')`,
  }

  return <div className="box" style={style} />
}

BoxItem.propTypes = {
  box: PropTypes.instanceof(Box),
}

export default BoxItem
