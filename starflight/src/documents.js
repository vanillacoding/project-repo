var documents = function() {
  var doc = {
    title: document.getElementById( 'title' ),
    shield: document.getElementById( 'shield' ),
    score: document.getElementById( 'score' ),
    scoreValue: document.getElementById( 'score-value' ),
    gameOver: document.getElementById( 'gameover' ),
    hitFlash: document.getElementById( 'hit-flash' )
  }
  return doc;
}

export default documents;
