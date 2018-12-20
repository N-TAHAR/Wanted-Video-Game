var param = {};

// This object is used to handle the sorting of the cards
var sortedCards = {
  allCards: [],
  lastCard: -1
};

// This object represents the player and his properties
var player = {
  attribute: {
    gold: 50,
    power: 50,
    notoriety: 50,
    loyalty: 50
  },
  turn: 0,
  name: ""
};
var cards = [];
// Declaration of all cards used in the game
var card1 = {
  infos: {
    question: "Aider un mendiant?",
    image: "/PRETRECOMPLET.b0144ca1.png"
  },
  yes: {
    text: "Donner quelques pièces",
    gold: 10,
    power: 0,
    notoriety: -5,
    loyalty: 0
  },
  no: {
    text: "Vas au diable",
    gold: -10,
    power: 0,
    notoriety: 0,
    loyalty: 0
  }
};
cards.push(card1);
// mettre une condition si le joueur refuse d'aider l'église dans 5 tour le diable apparait
var card2 = {
  infos: {
    question: "Pourriez vous faire un don à l'église, vous serez pardonné de tous vos péchés!",
    image: "/PRETRECOMPLET.b0144ca1.png"
  },
  yes: {
    text: "Donner quelques pièces",
    gold: -20,
    power: 0,
    notoriety: -10,
    loyalty: 0
  },
  no: {
    text: "Vas au diable",
    gold: 0,
    power: 0,
    notoriety: 5,
    loyalty: 0
  }
};
cards.push(card2);

var card3 = {
  infos: {
    question: "L'église a besoin de main d'oeuvre mon enfant, pourriez vous m'envoyer quelques hommes?" ,
    image: "/PRETRECOMPLET.b0144ca1.png"
  },
  yes: {
    text: "Donner quelques pièces",
    gold: 5,
    power: -15,
    notoriety: 0,
    loyalty: 0
  },
  no: {
    text: "Vas au diable",
    gold: -10,
    power: 0,
    notoriety: 0,
    loyalty: 0
  }
};
cards.push(card3);

var card4 = {
  infos: {
    question: "Bonjour mon brave! Je vends un elixir miracle qui soigne vos hommes en un clin d'oeil, je suis prêt à vous faire un bon prix. ",
    image: "url de l'image"
  },
  yes: {
    text: "Poursuivre",
    gold: -10,
    power: 5,
    notoriety: 0,
    loyalty: 0
  },
  no: {
    text: "Laisser s'échapper",
    gold: 0,
    power: 0,
    notoriety: 0,
    loyalty: 0
  }
};
cards.push(card4);

var card5 = {
  infos: {
    question: "Les fusils de vos hommes sont usés et en mauvais état, je peux vous fournir des armes à un prix raisonnable, intéressé ?",
    image: "url de l'image"
  },
  yes: {
    text: "Poursuivre",
    gold: -10,
    power: 10,
    notoriety: 5,
    loyalty: 0
  },
  no: {
    text: "Laisser s'échapper",
    gold: 10,
    power: -10,
    notoriety: -5,
    loyalty: 0
  }
};
cards.push(card5);

var card6 = {
  infos: {
    question:
      "J'ai entendu parler d'une diligence aux alentours de Black Water, on pourraient se faire un bon pactol!",
    image: "url de l'image"
  },
  yes: {
    text: "Piller",
    gold: 25,
    power: -10,
    notoriety: 20,
    loyalty: 10
  },
  no: {
    text: "Rester calme",
    gold: -10,
    power: 0,
    notoriety: -10,
    loyalty: -20
  }
};
cards.push(card6);

var card7 = {
  infos: {
    question: "Un membre du gang s'est fait capturer on devrait le libérer",
    image: "url de l'image"
  },
  yes: {
    text: "Sauver",
    gold: 0,
    power: -10,
    notoriety: 20,
    loyalty: 10
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: -10,
    loyalty: -20
  }
};
cards.push(card7);

var card8 = {
  infos: {
    question: "Voulez vous nous aider à déloger une bande de brigands qui souillent nos terres ?",
    image: "url de l'image"
  },
  yes: {
    text: "Sauver",
    gold: 10,
    power: 0,
    notoriety: 0,
    loyalty: 0
  },
  no: {
    text: "Laisser tomber",
    gold: -10,
    power: 0,
    notoriety: 0,
    loyalty: 0
  }
};
cards.push(card8);

// This function gives us a random number that hasn't been sorted until every numbers have been sorted, once it's the case it simply gives us a random number that is different that the one sorted before
function getNewRand() {
  let rand = oxo.utils.getRandomNumber(0, cards.length - 1); // Selects a random card to display
  /*
  While we don't have sorted all the cards, we don't sort two times the same, 
  but once each card has been displayed, we just displays the cards randomly
  */
  while (sortedCards.allCards.indexOf(rand) !== -1) {
    rand = oxo.utils.getRandomNumber(0, cards.length - 1);
    if (
      sortedCards.allCards.length === cards.length &&
      rand !== sortedCards.lastCard
    ) {
      sortedCards.lastCard = rand; // We memorize the last card in order to avoid having the same cards two times in a row
      return rand;
    }
  }
  sortedCards.allCards.push(rand);
  sortedCards.lastCard = rand;

  return rand;
}

var random = getNewRand();

setTimeout(function() {
  
  var containerFlag = true;
  function toggleSound(music,container) {
    var volumeUpIcon = document.querySelector("."+container+" .fa-volume-up");
    var volumeMuteIcon = document.querySelector("."+container+" .fa-volume-off");
    
    volumeMuteIcon.classList.add("hidden");
    volumeMuteIcon.addEventListener("click", function() {
      volumeMuteIcon.classList.toggle("hidden");
      volumeUpIcon.classList.toggle("hidden");
      music.play();
      containerFlag = true;
    });
    volumeUpIcon.addEventListener("click", function() {
      volumeMuteIcon.classList.toggle("hidden");
      volumeUpIcon.classList.toggle("hidden");
      music.pause();
      containerFlag = false;
    });
  }
  function card(){
    var backTheme = document.querySelector(".back-theme");  // Selects the back theme music in the html file
    backTheme.play();
    var son = document.getElementById("cardSound");

    toggleSound(backTheme,'backSound');
    toggleSound(son,'effectsSound');

    // Slide for the rules section 
    var rules = document.querySelector('.rules');
    var rulesbtn = document.querySelector('.rules__start');
    rules.classList.add('rules--reset');
    rulesbtn.addEventListener('click', function() {
      rules.classList.remove('rules--reset');          
    });
    oxo.inputs.listenKey('enter', function() {
      rules.classList.remove('rules--reset');          
    });

    // Recuperation des sources images et suppression des images du html
    function findSrc(index) {
      var img = document.querySelector('.character--hidden[data-card="' + index + '"]'
      );
      return img.getAttribute("src");
    }
    var imgs = document.querySelectorAll(".character--hidden");
    for (let i = 1; i < imgs.length+1; i++) {
      cards[i].infos.image = findSrc(i);
    }
    for (let i = 1; i < imgs.length; i++) {
      document.querySelector("body").removeChild(imgs[i]);
    }

    

    // Selecting the fields where we display the player properties
    var gold = document.querySelector(".resources__gold");
    var power = document.querySelector(".resources__power");
    var loyalty = document.querySelector(".resources__loyalty");
    var notoriety = document.querySelector(".resources__notoriety");

    // Selecting and adding content to the card fields
    var sectionCard = document.querySelector("section.card");
    var questionField = sectionCard.querySelector(".card__question");

    questionField.innerHTML = cards[random].infos.question;


    // Our functions
    function updateAttribute() {
      gold.innerHTML = "&nbsp$ <br>" + player.attribute.gold + "%";
      power.innerHTML = "&nbspP <br>" + player.attribute.power + "%";
      loyalty.innerHTML = "&nbspL <br>" + player.attribute.loyalty + "%";
      notoriety.innerHTML = "&nbspN <br>" + player.attribute.notoriety + "%";
    }
    function setup(param) {
      player.turn += 1;
      oxo.player.addToScore(1);
      console.log(player.turn);
      if (oxo.screens.getCurrentScreen() !== "card") return;
      if(param.flag)son.play();
      if (param.direction === "left") {
        param.card.classList.add("rotate-left");
        player.attribute.gold += cards[random].no.gold;
        player.attribute.power += cards[random].no.power;
        player.attribute.loyalty += cards[random].no.loyalty;
        player.attribute.notoriety += cards[random].no.notoriety;
      } else {
        param.card.classList.add("rotate-right");
        player.attribute.gold += cards[random].yes.gold;
        player.attribute.power += cards[random].yes.power;
        player.attribute.loyalty += cards[random].yes.loyalty;
        player.attribute.notoriety += cards[random].yes.notoriety;
      }

      // Display the score when the user lose
      var menuScore = document.querySelector('.menu__score');
      menuScore.innerHTML = "Vous avez survécu " + oxo.player.getScore() + " Days";

      // If the player has an attribute under 0 or over 100, he has lost
      var menu = document.querySelector('.menu');
      if (player.attribute.gold >= 100 || player.attribute.gold <= 0) {
          menu.classList.add('menu--reset');
          oxo.inputs.listenKey('enter', function() {
            window.location.reload();
          });
          var musicLost = document.querySelector('.darkness');
          backTheme.pause();
          musicLost.play();
      }
      if (player.attribute.notoriety >= 100 || player.attribute.notoriety <= 0) {
        menu.classList.add('menu--reset');
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        var musicLost = document.querySelector('.darkness');
          backTheme.pause();
          musicLost.play();
      }
      if (player.attribute.loyalty >= 100 || player.attribute.loyalty <= 0) {
        menu.classList.add('menu--reset');
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        var musicLost = document.querySelector('.darkness');
          backTheme.pause();
          musicLost.play();
      }
      if (player.attribute.power >= 100 || player.attribute.power <= 0) {
        menu.classList.add('menu--reset');
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        var musicLost = document.querySelector('.darkness');
          backTheme.pause();
          musicLost.play();
      }

      // redirect into the home page when you click on the button "Recommencer"
      var retrybtn = document.querySelector('.menu__retry');
      retrybtn.addEventListener('click', function(){
        window.location.reload();
      })
      // Removes the element one second after the keypress
      setTimeout(function() {
        var toDelete = document.querySelector("section.card");
        document.querySelector("body").removeChild(toDelete);
      }, 1000);

      updateAttribute();
      // Sorts a new random card and updates the screen fields
      random = getNewRand();

      var newCard = document.createElement("section");
      newCard.classList.add("card");
      document.querySelector("body").appendChild(newCard);

      var question = document.createElement("div");
      question.classList.add("card__question");
      question.innerHTML = cards[random].infos.question;
      newCard.appendChild(question);

      var container = document.createElement("div");
      container.classList.add("card__container");
      newCard.appendChild(container);

      var image = document.createElement("img");
      image.setAttribute("src", cards[random].infos.image);
      container.appendChild(image);

      oxo.inputs.listenArrowKeys(function(key) {
        if (key === "left") {
          param = {
            card: newCard,
            direction: "right",
            flag:containerFlag
          };
          setup(param);
        }
        if (key === "right") {
          param = {
            card: newCard,
            direction: "left",
            flag:containerFlag
          };
          setup(param);
        }
      });
    }
    updateAttribute();
    // AddEventListeners handling
    // If the user chooses yes, we change the corresponding user values

    oxo.inputs.listenArrowKeys(function(key) {
      if (key === "left") {
        param = {
          card: sectionCard,
          direction: "right",
          flag:containerFlag
        };
        setup(param);
      }
      if (key === "right") {
        param = {
          card: sectionCard,
          direction: "left",
          flag:containerFlag
        };
        setup(param);
      }
    });
  }
  oxo.inputs.listenArrowKeys(function(key) {
    if (key === "left" || key === "right") {
      oxo.screens.loadScreen("card", card);
    }
  });
});
/*
        Intégrer les images dans le html en display none, récupérer les attributs source, les passer dans l'objet 
cards et la génération aléatoire devrait être bonne
*/
