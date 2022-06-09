import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

import { SIZE, CELL_SIZE, CELL_PADDING } from "../constants";
import { resetGame, onTouch } from "../ducks/configureStore";
import Challenge from "./Challenge";
import { Glyph } from "./Glyph";
import Timer from "./Timer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#644B62",
  },
  playarea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#644B62",
  },
  topbar: {
    margin: 30,
    flexDirection: "column",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    resetGame: () => dispatch(resetGame()),
    onTouch: (s) => dispatch(onTouch(s)),
  };
}

export default connect(
  (s) => s,
  mapDispatchToProps
)(
  ({
    appData: {
      score,
      highscore,
      expectedEmoji,
      expectedCharacter,
      shuffledCharacters,
    },
    resetGame,
    onTouch,
  }) => (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Timer score={score} highscore={highscore} resetGame={resetGame} />
        <Text style={{ color: "white", fontSize: 20 }}>Score: {score}</Text>
      </View>
      <View style={styles.playarea}>
        <Challenge
          expectedEmoji={expectedEmoji}
          expectedCharacter={expectedCharacter}
        />
        <View
          style={{
            width: CELL_SIZE * SIZE,
            height: CELL_SIZE * SIZE,
            backgroundColor: "transparent",
          }}
        >
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((column) => (
              <Glyph
                key={row * SIZE + column}
                expectedCharacter={expectedCharacter}
                character={shuffledCharacters[row * SIZE + column]}
                position={{
                  left: column * CELL_SIZE + CELL_PADDING,
                  top: row * CELL_SIZE + CELL_PADDING,
                }}
                onTouch={onTouch}
              />
            ))
          )}
        </View>
      </View>
    </View>
  )
);
