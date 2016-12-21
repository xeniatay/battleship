import _ from 'underscore'
import ClassNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class Tile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data
    const x = data.x
    const y = data.y
    const className = ClassNames('tile', {
      hit: data.hit && data.id,
      sunk: data.sunk,
      ghost: data.showGhost
    })

    return (
      <span
        className={className}
        data-coords={x + ',' + y}
        onClick={_.partial(this.props.onClick, data)}
        onMouseLeave={_.partial(this.props.onMouseLeave, data)}
        onMouseEnter={_.partial(this.props.onMouseEnter, data)}
      >
        <span className='tile-status'>
          {data.sunk
            ? '='
            : data.hit
              ? 'X'
              : '-'
          }
        </span>
        {this.props.showShips && data.id && !data.sunk
          ? (
            <span className='tile-status'>
              O
            </span>
          ) : null}
      </span>
    )
  }
}
