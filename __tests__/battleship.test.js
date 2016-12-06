import React from 'react';
import Battleship from '../js/battleship.jsx';
import renderer from 'react-test-renderer';

test('Switch players for 2 rounds', () => {
  const PLAYERS = 2;
  const component = renderer.create(
    <Battleship/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onTurnEnd();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onTurnEnd();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
