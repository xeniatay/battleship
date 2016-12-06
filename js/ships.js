import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'

const HORIZONTAL = 0
const VERTICAL = 1

export default class Ships {
  constructor(player) {
    this.ships = {}
    this.player = player
  }

  /**
   * Add a ship
   * @return {array}
   */
  add(ship) {
    this.ships[ship.id] = ship
  }

  /**
   * Get a ship
   * @return {object}
   */
  get(id) {
    return this.ships[id]
  }

  /**
   * Set a ship
   * @return {object}
   */
  set(ship) {
    this.ships[ship.id] = ship
  }

  /**
   * Update a ship as sunk
   * @return {void}
   */
  sink(id) {
    this.update(id, {
      sunk: true
    })
  }

  /**
   * Update a ship with given data
   * @return {void}
   */
  update(id, data) {
    let shipToUpdate = this.get(id)

    shipToUpdate = _.extend(shipToUpdate, data)
    this.set(shipToUpdate)
  }

  /**
   * Return all points that a ship occupies
   * @return {array}
   */
  getPoints(ship) {
    const direction = ship.direction || HORIZONTAL

    if (direction === VERTICAL) {
      return _.times(ship.length, (i) => {
        return {
          x: ship.x + i,
          y: ship.y
        }
      })
    } else if (direction === HORIZONTAL) {
      return _.times(ship.length, (i) => {
        return {
          x: ship.x,
          y: ship.y + i
        }
      })
    }
  }

  /**
   * Check if the ship is sunk
   * @return {bool}
   */
  isShipSunk(id, grid) {
    const ship = this.get(id)
    const points = this.getPoints(ship)

    return _.every(points, (p) => {
      console.log('point', p.x, p.y, grid[p.x][p.y].hit)
      return grid[p.x][p.y].hit
    })
  }

  /**
   * Check if all ships are sunk
   * @return {bool}
   */
  isAllShipsSunk() {
    console.log(this.ships)
    return _.every(this.ships, (ship) => {
      return ship.sunk
    })
  }
}
