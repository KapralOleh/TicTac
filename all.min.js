var boardDOM, boardJS, selected, turn, winningCombo, boardDOMEl, winner, text;
winner = false;
turn = true;
selected = false;
boardDOM = [];
boardJS = [0, 0, 0, 0, 0, 0, 0, 0, 0];
winningCombo = [[1, 4, 7], 
                [2, 5, 8], 
                [3, 6, 9], 
                [1, 2, 3], 
                [4, 5, 6], 
                [7, 8, 9], 
                [1, 5, 9], 
                [3, 5, 7]];

boardDOM = document.querySelectorAll('.cell');

document.getElementById('toogleTheme').onclick = function() {
  document.body.classList.toggle('theme');
  if (document.body.classList.contains('theme')) {
    document.getElementsByClassName('board')[0].classList.add('second-board');
    document.getElementsByClassName('board')[0].classList.remove('first-board');
    document.getElementById('header').style.background = '#a9a9a4';
    document.getElementById('h1').style.color = '#544F4A';
  } else {
    document.getElementsByClassName('board')[0].classList.add('first-board');
    document.getElementsByClassName('board')[0].classList.remove('second-board');
    document.getElementById('header').style.background = '#ff9';
    document.getElementById('h1').style.color = '#51c8c8';
  }
};

var checkWin = function (boardJS,winningCombo) {
  var masX = [];
  var masO = [];
    for (var i = 0; i < boardJS.length; i++) {
      if (boardJS[i] == 1 ) {
        masX.push(i+1);
      }
      if (boardJS[i] == -1 ) {
        masO.push(i+1);
      }
    }
    for (var i = 0; i < winningCombo.length; i++) {
      if (masX.length > 4 || masO.length > 4 ) {
        document.getElementsByClassName('winner')[0].innerHTML = "Draw";
      }
      if (masX.length >= 3) {
        if(masX.filter(function (elem) {
          return winningCombo[i].indexOf(elem) > -1;
        }).length == winningCombo[i].length){
          document.getElementsByClassName('winner')[0].innerHTML = "Player X WIN";
          winner = true;
          for (var j = 0; j < winningCombo[i].length; j++) {
            boardDOM[(winningCombo[i][j])-1].style.backgroundColor = "#51c8c8";
          }
        }
      }
      if (masO.length >= 3) {
        if(masO.filter(function (elem) {
          return winningCombo[i].indexOf(elem) > -1;
        }).length == winningCombo[i].length){
          document.getElementsByClassName('winner')[0].innerHTML = "Player O WIN";
          winner = true;
          for (var j = 0; j < winningCombo[i].length; i++) {
            boardDOM[winningCombo[i][j]].style.color = "red";
          }
        }
      }
    }
}

var setToken = function(node, token) {
  return node.classList.add(token);
};


document.getElementsByClassName('winner')[0].onmouseover = function () {
  text = document.getElementsByClassName('winner')[0].innerHTML;
  document.getElementsByClassName('winner')[0].innerHTML = "Start New Game";
}
document.getElementsByClassName('winner')[0].onmouseleave = function () {
  document.getElementsByClassName('winner')[0].innerHTML = text;
}
document.getElementsByClassName('winner')[0].onclick = function () {
  window.location.reload();
}


for (var i=0; i<boardDOM.length; i++) {
  (function(i){
    boardDOM[i].onclick = function(e) {
      var target = e.target;
      token = 'cell-x';
      if (target.classList.contains('cell-x') || target.classList.contains('cell-o') || winner == true) {
        return false;
      }

      if (turn) {
        token = 'cell-x';
        cell = 'x';
        boardJS[i] = 1;
      } else {
        token = 'cell-o';
        cell = 'y';
        boardJS[i] = -1;
      }

      turn = !turn;
        if (turn) {
          document.querySelector('.turn>.player').classList.remove('cell-o');
          document.querySelector('.turn>.player').classList.add('cell-x');
        } else {
          document.querySelector('.turn>.player').classList.remove('cell-x');
          document.querySelector('.turn>.player').classList.add('cell-o');
        }

      setToken(target, token);
      return checkWin(boardJS,winningCombo);
    };
  })(i);
}
