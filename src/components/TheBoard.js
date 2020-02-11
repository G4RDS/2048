import React from 'react'
import PropTypes from 'prop-types'

import Box from '../models/Box'

import BoxItem from './BoxItem'

const TheBoard = ({ boxes }) => {
  return (
    <div className="board">
      <div className="squares">
        {Array(16)
          .fill()
          .map((v, i) => {
            let cl
            if (Math.floor((i / 4) % 2) === 0) {
              cl = i % 2 ? 'orange' : 'yellow'
            } else {
              cl = !(i % 2) ? 'orange' : 'yellow'
            }
            return <div className={`square ${cl}`} key={i} />
          })}
      </div>
      <div className="boxes">
        {boxes.map(b => (
          <BoxItem box={b} />
        ))}
      </div>
    </div>
  )
}

TheBoard.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.instanceOf(Box)),
}

export default TheBoard
