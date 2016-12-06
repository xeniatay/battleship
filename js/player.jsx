import _ from 'underscore'
import ClassNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import Grid from './grid.jsx'

export default class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      setUp: true,
      currentShip: 0,
      showShips: true,
      activeTile: {}
    }
  }

  render() {
    const className = ClassNames('player', {
      'active': true // this.props.active
    })

    return (
      <div className={className}>
        <h3>Player {this.props.index}</h3>
        <Grid
          setUp={this.state.setUp}
          gridSize={this.props.gridSize}
          ship={this.props.ships[this.state.currentShip]}
          showShips={this.state.showShips}
          player={this.props.index}
          onPlaceShip={this.onPlaceShip}
          onUpdateTile={this.onUpdateTile}
          onGameOver={this.onGameOver}
        />
        <div className='status'>
          {this.state.setUp
            ? this.renderSetupStatus()
            : this.renderGamePlay()
          }
        </div>
        <div className='options'>
          <label>
            <input type='checkbox' checked={this.state.showShips} onChange={this.toggleShowShips}/>
            Show ships
          </label>
        </div>
      </div>
    )
  }

  renderGamePlay() {
    const tile = this.state.activeTile

    return (
      <div className='gameplay-status'>
        {this.renderInstructions()}
        {!_.isEmpty(tile)
          ? (
            <div>
              <h2>
                {tile.sunk
                  ? 'SUNK'
                  : this.state.hit
                    ? 'HIT'
                    : 'MISS'
                }
              </h2>

              <p className='gameplay-details'>
                ({tile.x}, {tile.y})
                {tile.alreadyHit ? ' already hit' : null}
              </p>
            </div>
          ) : null
        }
      </div>
    )
  }

  renderSetupStatus() {
    const ship = this.props.ships[this.state.currentShip]

    return (
      <div>
        <h2>Player {this.props.index} is setting up...</h2>
        <p>
          Place your ship:
        </p>
        <p className='ship-details'>
          {ship
            ? '- ' + ship.id + ', length ' + ship.length
            : null}
        </p>
      </div>
    )
  }

  renderInstructions() {
    return (
      <div className='gameplay-instructions'>
        {this.state.gameOver
          ? <h1>GAME OVER</h1>
          : (
            <h3>
              Game on! Click tile to launch missle.
            </h3>
          )
        }
      </div>
    )
  }

  /**
   * After a ship has been placed, iterate to next ship or end set up mode
   * @return {void}
   */
  onPlaceShip = () => {
    const nextShip = this.state.currentShip + 1

    this.setState({
      currentShip: nextShip,
      setUp: nextShip < this.props.ships.length
    }, () => {
      if (!this.state.setUp) {
        this.toggleShowShips()
        this.props.onTurnEnd()
      }
    })
  }

  /**
   * Update the latest clicked tile for gameplay information display
   * @return {void}
   */
  onUpdateTile = (tile) => {
    this.setState({
      hit: !!tile.id,
      activeTile: tile
    }, () => {
      this.props.onTurnEnd()
    })
  }

 /**
   * Let the user know it is Game Over!
   * @return {void}
   */
  onGameOver = () => {
    this.setState({
      gameOver: true
    })
  }

 /**
   * Show/hide ships
   * - Good for players who forget where they placed their ships
   * @return {void}
   */
  toggleShowShips = () => {
    this.setState({
      showShips: !this.state.showShips
    })
  }
}
