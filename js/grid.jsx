import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import Tile from './tile.jsx'
import Ships from './ships.js'

export default class Grid extends React.Component {
  constructor(props) {
    super(props)

    this.ships = new Ships(this.props.player)

    this.state = {
      grid: this.initializeGrid()
    }
  }

  render() {
    return (
      <div className='grid'>
        {_.map(this.state.grid, (row, y) => {
          const rowTiles = _.map(row, (tile, x) => {
            return this.renderTile(x, y, tile)
          })

          return (
            <div className='row' key={y}>
              {rowTiles}
            </div>
          )
        })}
      </div>
    )
  }

  renderTile(x, y, tile) {
    const tileData = _.extend({x, y}, tile)

    return <Tile
      data={tileData}
      key={x + ',' + y}
      showShips={this.props.showShips}
      onClick={this.onTileClick}
    />
  }

  /**
   * Depending on game mode, place a ship or update game
   * @return {void}
   */
  onTileClick = (tile) => {
    const ship = this.props.ship
    const x = tile.x
    const y = tile.y

    if (this.props.setUp) {
      if (this.canShipBePlaced(x, y, ship)) {
        this.placeShip(x, y, ship)
        this.props.onPlaceShip()
      }
    } else {
      this.updateTile(tile)
    }
  }

  /**
   * Update tile with game logic
   * 1. Tile is hit
   * 2. If this hit sunk a ship, update all affected tiles
   * @return {void}
   */
  updateTile(tile) {
    let grid = _.clone(this.state.grid)

    tile = _.clone(tile)
    tile.alreadyHit = tile.hit
    tile.hit = true
    grid[tile.x][tile.y] = tile

    this.setState({
      grid
    }, () => {
      if (tile.id) {
        const isSunk = this.ships.isShipSunk(tile.id, this.state.grid)

        if (isSunk) {
          this.ships.sink(tile.id)
          this.updateSunkTiles(tile.id, grid)
        }
      }

      this.updateGame(tile)
    })
  }

  /**
   * Update tiles that are affected by a sunk ship
   * @return {array}
   */
  updateSunkTiles(id) {
    let grid = _.clone(this.state.grid)
    const ship = this.ships.get(id)
    const points = this.ships.getPoints(ship)

    _.each(points, (p) => {
      const tile = _.clone(grid[p.x][p.y])

      tile.sunk = true
      grid[p.x][p.y] = tile
    })

    this.setState({ grid })
  }

  /**
   * Update the game information and status
   * @return {void}
   */
  updateGame(tile) {
    this.props.onUpdateTile(tile)

    if (this.ships.isAllShipsSunk(this.state.grid)) {
      this.props.onGameOver()
    }
  }

  /**
   * Update the grid after a ship has been placed at (x, y)
   * @return {void}
   */
  placeShip(x, y, ship) {
    const grid = _.clone(this.state.grid)
    ship = _.extend(ship, {
      x,
      y
    })
    const points = this.ships.getPoints(ship)

    _.each(points, (p) => {
      grid[p.x][p.y] = this.buildTile({
        id: ship.id,
        x: p.x,
        y: p.y
      })
    })

    this.setState({
      grid,
      ships: this.ships.add(ship)
    })
  }

  /**
   * Check if the ship can be placed at selected position
   * @return {bool}
   */
  canShipBePlaced(x, y, ship) {
    const points = this.ships.getPoints(_.extend(ship, {
      x,
      y
    }))

    return _.every(points, (p) => {
      return this.isTileValid(p.x, p.y)
    })
  }

  /**
   * Check if the tile at (x, y) is valid for ship placement
   * @return {bool}
   */
  isTileValid(x, y) {
    const tile = this.state.grid[x][y]

    return tile && !tile.id
  }

  /**
   * Initialize an empty grid
   * @return {array}
   */
  initializeGrid() {
    const grid = []
    const width = this.props.gridSize[0] || 10
    const height = this.props.gridSize[1] || 10

    _.times(width, (i) => {
      grid[i] = []
      _.times(height, (j) => {
        grid[i][j] = this.buildTile({x: i, y: j})
      })
    })

    return grid
  }

  /**
   * Return a tile with default values if needed
   * @return {object}
   */
  buildTile(data) {
    return _.extend({
      id: null,
      hit: false,
      sunk: false
    }, data)
  }
}
