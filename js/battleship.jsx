import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import Player from './player.jsx'

// CONSTANTS
const PLAYERS = 2
const SHIPS = [
  {
  //   id: 'carrier',
  //   length: 5
  // }, {
  //   id: 'battleship',
  //   length: 4
  // }, {
  //   id: 'cruiser',
  //   length: 3
  // }, {
    id: 'submarine',
    length: 3,
  }, {
    id: 'destroyer',
    length: 2
  }
]

class Battleship extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePlayer: _.random(PLAYERS - 1)
    }
  }

  render() {
    return (
      <div>
        <h1>Battleship</h1>
        {_.times(PLAYERS, (i) => {
          return <Player
            key={i}
            index={i + 1}
            active={this.state.activePlayer === i}
            gridSize={[10, 10]}
            ships={SHIPS}
            onTurnEnd={this.onTurnEnd}
          />
        })}
      </div>
    )
  }

  /**
   * Switch active player to next in line
   * @return {void}
   */
  onTurnEnd = () => {
    this.setState({
      activePlayer: (this.state.activePlayer + 1) % PLAYERS
    })
  }
}

ReactDOM.render(<Battleship/>, document.getElementById('battleship'));
