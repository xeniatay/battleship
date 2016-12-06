## Battleship! 

### See it in action

Go to [http://xeniatay.com/battleship/](http://xeniatay.com/battleship/)!

To run locally: 

    // In the root directory of `battleship`
    > npm install
    > webpack-dev-server --progress --colors

    Go to localhost:8080

### Project Requirements

- npm 4.0.3 
- Node v6.5.0 
- OSX

### Project Tools

- Webpack
- React
- SASS
- Jest (Incomplete)

### Possible extensions

- Multiplayers
- Option to rotate ships
- Configurable grid size
- Configurable ships

### Tests

`> npm test`

Unfortunately, I was unable to get Jest set up to run with the webpack/ES6 configurations I had in place. `battleship.test.js` contains the basic test I had tried to start. 

Below are the test cases I considered:

#### Test cases

##### Battleship
- Switch turns between players
- Player 1 cannot play when Player 2 is active

#### Players
- Mock gameplay: expected instructions should match rendered instructions
- Toggling show/hide ships

#### Grid
- Initial grid: should be empty
- Ship placement: 'X'es in grid should match the data matrix
- Ship placement: ships should not be placed outside grid or overlapping
- Fire missle: trigger a hit, miss and sunk case

#### Tile
- Given mock data (hit, sunk, empty), it should render the correct content
