var param = {};
var canPlay = false; // The player hasn't lost
var displayRules = false;
var swipeFlag = true;
var sentenceDeath = "";

oxo.player.addToScore(1);
// This object is used to handle the sorting of the cards
var sortedCards = {
  allCards: [],
  lastCard: -1
};
var endSentences = {
  gold: {
    min:
      "Vous avez épuisé tout votre argent, devant votre manque de compétence vos hommes ont décidé de vous tuer afin de vous remplacer. ",
    max:
      "La quantité d'argent que vous avez amassé a attiré la convoitise des groupes concurrents, qui ont décidé de voler votre or, vous êtes malheureusement décédé pendant les affrontements."
  },
  power: {
    min:
      "Devant le manque d'armes en votre possession, votre troupe s’est fait tuer lors d’une embuscade.",
    max:
      "Votre groupe est devenu trop menaçant aux yeux du shérif, qui a décidé de missionner des chasseurs de têtes expérimentés pour vous éliminer, leur intervention a été fatale."
  },
  notoriety: {
    min:
      "Devant le peu de notoriété de votre groupe, vos hommes ont laissé tomber l'affaire, vous avez fait mission seul et êtes morts, seul.",
    max:
      "La prime à votre égard a augmenté de façon significative, et des chasseurs de tête ont fait équipe contre vous. Faites attention à votre notoriété à l'avenir."
  },
  loyalty: {
    min:
      "Vos hommes ont décidé de vous renverser devant le peu d'attention que vous aviez à leur égard.",
    max:
    "Votre gentillesse pour envers vos hommes est passée pour de la couardise, vous avez été assassiné."
  }
};
// This object represents the player and his properties
var player = {
  attribute: {
    gold: 50,
    power: 50,
    notoriety: 50,
    loyalty: 50
  },
  turn: 1,
  name: ""
};
var cards = [];

// Declaration of all cards used in the game
var card1 = {
  infos: {
    question:
      "Mon enfant, j'ai besoin d'une certaine somme d'argent pour entretenir mon église, peux-tu m'aider ? J'en parlerai autour de moi. ",
    image: ""
  },
  yes: {
    text: "Donner quelques pièces",
    gold: -20,
    power: 0,
    notoriety: -10,
    loyalty: 10
  },
  no: {
    text: "Vas au diable",
    gold: 0,
    power: 0,
    notoriety: 15,
    loyalty: -5
  }
};
cards.push(card1);
// mettre une condition si le joueur refuse d'aider l'église dans 5 tour le diable apparait
var card2 = {
  infos: {
    question:
      "Voici des chevaux robustes, désirez-vous les acheter pour une modeste somme ?",
    image: ""
  },
  yes: {
    text: "Donner quelques pièces",
    gold: -25,
    power: 20,
    notoriety: 0,
    loyalty: 0
  },
  no: {
    text: "Va au diable",
    gold: 0,
    power: 0,
    notoriety: 0,
    loyalty: -15
  }
};
cards.push(card2);

var card3 = {
  infos: {
    question:
      "Alors l'ami besoin d'argent ? Affronte Ricky Nelson dans un duel clandestin.",
    image: ""
  },
  yes: {
    text: "Donner quelques pièces",
    gold: 20,
    power: 0,
    notoriety: 15,
    loyalty: 0
  },
  no: {
    text: "Va au diable",
    gold: 0,
    power: 0,
    notoriety: -15,
    loyalty: -5
  }
};
cards.push(card3);

var card4 = {
  infos: {
    question:
      "Bonjour mon brave! Je vends un élixir miracle qui soigne vos hommes en un clin d'oeil, je suis prêt à vous faire un bon prix. ",
    image: ""
  },
  yes: {
    text: "Poursuivre",
    gold: -20,
    power: 10,
    notoriety: 0,
    loyalty: 20
  },
  no: {
    text: "Laisser s'échapper",
    gold: 0,
    power: -10,
    notoriety: 0,
    loyalty: -15
  }
};
cards.push(card4);

var card5 = {
  infos: {
    question:
      "Les fusils de vos hommes sont usés et en mauvais état, je peux vous fournir des armes à un prix raisonnable, intéressé ?",
    image: ""
  },
  yes: {
    text: "Poursuivre",
    gold: -20,
    power: 20,
    notoriety: 0,
    loyalty: 10
  },
  no: {
    text: "Laisser s'échapper",
    gold: 0,
    power: 0,
    notoriety: 0,
    loyalty: -10
  }
};
cards.push(card5);

var card6 = {
  infos: {
    question:
      "J'ai entendu parler d'une diligence aux alentours de Black Water, on pourrait se faire un bon pactole !",
    image: ""
  },
  yes: {
    text: "Piller",
    gold: 30,
    power: -20,
    notoriety: 10,
    loyalty: 10
  },
  no: {
    text: "Rester calme",
    gold: 0,
    power: 0,
    notoriety: -20,
    loyalty: -10
  }
};
cards.push(card6);

var card7 = {
  infos: {
    question:
      "Il y a ceux qui ont la corde au cou et ceux qui la coupent. Acceptes-tu de tuer cet homme pour un bon whisky et quelques pièces ?",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: 10,
    power: 0,
    notoriety: 15,
    loyalty: 0
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: -15,
    loyalty: 0
  }
};
cards.push(card7);

var card8 = {
  infos: {
    question:
      "Mon beau, tu as l’air perdu, viens boire un verre, vos hommes ont soif de bons whiskys et de jupons.",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: -15,
    power: 0,
    notoriety: 0,
    loyalty: 15
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: -5,
    loyalty: -10
  }
};
cards.push(card8);
var card9 = {
  infos: {
    question:
      "Je suis prêt à oublier tes petites bêtises en échange d'une certaine somme d'argent.",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: -15,
    power: 0,
    notoriety: -20,
    loyalty: 10
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: 15,
    loyalty: -10
  }
};
cards.push(card9);
var card10 = {
  infos: {
    question:
      "Chef ma donzelle est entre les mains de l'ennemie, aidez-moi à la sauver",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: 0,
    power: -15,
    notoriety: 0,
    loyalty: 20
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: 0,
    loyalty: -25
  }
};
var card11 = {
  infos: {
    question:
      "Chef, allons conquérir le territoire des Indiens de la Pit River pour étendre notre puissance.",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: 20,
    power: -20,
    notoriety: 20,
    loyalty: 10
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: -20,
    loyalty: -10
  }
};
//
cards.push(card11);

var card12 = {
  infos: {
    question:
      "Donne-moi le nom de tes camarades recherchés, et tu pourras te faire de la maille. ",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: 20,
    power: -10,
    notoriety: -20,
    loyalty: -25
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: 20,
    loyalty: 25
  }
};
cards.push(card12);
var card13 = {
  infos: {
    question:
      "Dis mois qui a tué, la femme de Monsieur Dinginton et il se pourrait que tu n’ailles point en prison.",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: 0,
    power: -10,
    notoriety: -20,
    loyalty: 5
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: 10,
    loyalty: 10
  }
};
cards.push(card13);
var card14 = {
  infos: {
    question:
      "Le vent souffle et les temps sont durs, puis-je vous demander quelques pièces afin de survivre et de labourer nos champs ? ",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: -10,
    power: 0,
    notoriety: -15,
    loyalty: 0
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: 20,
    loyalty: 0
  }
};
cards.push(card14);
var card15 = {
  infos: {
    question:
      "Les démons nous envahissent, permettez-nous de vous demander de l’aide en faisant offrande au seigneur ?  ",
    image: ""
  },
  yes: {
    text: "Sauver",
    gold: -15,
    power: 0,
    notoriety: -10,
    loyalty: 10
  },
  no: {
    text: "Laisser tomber",
    gold: 0,
    power: 0,
    notoriety: 15,
    loyalty: -10
  }
};
cards.push(card15);
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

oxo.screens.loadScreen('home', home);

function home() {
  var options = {
    strings: ["Bienvenue dans Wanted!", "Es tu un leader né ?^1500"," Argent,^300  Puissance^300, Notoriété^300, Loyauté.^1500","Attention,  il suffit que l’une de ces propriétés tombe à 0 pour que vous perdiez !","Les choix que vous ferez ne resteront pas sans conséquences !^600","Bonne chance !"],
    typeSpeed: 30
  }
    var typed = new Typed(".card__question--big", options);

  var containerFlag = true;
  var lostSoundFlag = true;
  function toggleSound(music,container) {
    var volumeUpIcon = document.querySelector("."+container+" .fa-volume-up");
    var volumeMuteIcon = document.querySelector("."+container+" .fa-volume-off");
    
    volumeMuteIcon.classList.add("hidden");
    volumeMuteIcon.addEventListener("click", function() {
      volumeMuteIcon.classList.toggle("hidden");
      volumeUpIcon.classList.toggle("hidden");
      music.play();
      // ne faire que si on a cliqué sur le bouton mute effects
      if(container === 'effectsSound') containerFlag = true;
      if(container === 'backSound') lostSoundFlag = true;
     
    });
    volumeUpIcon.addEventListener("click", function() {
      volumeMuteIcon.classList.toggle("hidden");
      volumeUpIcon.classList.toggle("hidden");
      music.pause();
      // ne faire que si on a cliqué sur le bouton mute effects
      if(container === 'effectsSound') containerFlag = false;
      if(container === 'backSound') lostSoundFlag = false;

    });
  }
  function card(){
    var death = document.querySelector('.menu__death');
    var retrybtn = document.querySelector('.menu__retry');
    var backTheme = document.querySelector(".back-theme");  // Selects the back theme music in the html file
    backTheme.play();
    var son = document.getElementById("cardSound");

    toggleSound(backTheme,'backSound');
    toggleSound(son,'effectsSound');
    
    // Slide for the rules section 
    if(displayRules){
      var rules = document.querySelector('.rules');
      var rulesbtn = document.querySelector('.rules__start');
      rules.classList.add('rules--reset');
      rulesbtn.addEventListener('click', function() {
        rules.classList.remove('rules--reset'); 
        canPlay = true;         
      });
      oxo.inputs.listenKey('enter', function() {
        rules.classList.remove('rules--reset');  
        canPlay = true;         
      });
    }
    

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
   
    var srcImage = document.querySelector('.card__priest');
    var newSrcImage= srcImage.getAttribute("src");
    cards[0].infos.image = newSrcImage;
    questionField.innerHTML = cards[0].infos.question;


    // Our functions
    function updateAttribute() {
      gold.innerHTML = "&nbsp<i class=\"fas fa-dollar-sign\"></i> <br> " + player.attribute.gold;
      power.innerHTML =  player.attribute.power + "&nbsp <br>";
      loyalty.innerHTML = "&nbsp<i class=\"fas fa-handshake\"></i> <br> " + player.attribute.loyalty;
      notoriety.innerHTML = "&nbsp<i class=\"fas fa-star\"></i> <br>&nbsp " + player.attribute.notoriety;
    }
    function setup(param) {
      if(canPlay === 'false') return;
      if(swipeFlag){
        swipeFlag = false;
        setTimeout(function(){
          swipeFlag = true;
        },1000);  
        player.turn += 1;
      oxo.player.addToScore(1);
      if (oxo.screens.getCurrentScreen() !== "card") return;
      if(param.flag)son.play();
      if (param.direction === "left") {
        param.card.classList.add("rotate-right");
        player.attribute.gold += cards[random].no.gold;
        player.attribute.power += cards[random].no.power;
        player.attribute.loyalty += cards[random].no.loyalty;
        player.attribute.notoriety += cards[random].no.notoriety;
      } else {
        param.card.classList.add("rotate-left");
        player.attribute.gold += cards[random].yes.gold;
        player.attribute.power += cards[random].yes.power;
        player.attribute.loyalty += cards[random].yes.loyalty;
        player.attribute.notoriety += cards[random].yes.notoriety;
      }

      // Display the score when the user lose
      let day;
      var menuScore = document.querySelector('.menu__score');
      if(player.turn === 1) day = ' Jour';
      else day = ' Jours';
      menuScore.innerHTML = "Vous avez survécu " + oxo.player.getScore() + day;

      // If the player has an attribute under 0 or over 100, he has lost
      var menu = document.querySelector('.menu');    

      if (player.attribute.gold >= 100 || player.attribute.gold <= 0) {
        menu.classList.add('menu--reset');
        if(player.attribute.gold >= 100) death.innerHTML = endSentences.gold.max;
        if(player.attribute.gold <= 0) death.innerHTML = endSentences.gold.min;
        // redirect into the home page when you click on the button "Recommencer"
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        retrybtn.addEventListener('click', function(){
          window.location.reload();
        })
        var musicLost = document.querySelector('.darkness');
        backTheme.pause();
        canPlay = false;
        musicLost.play();
        oxo.inputs.cancelKeysListeners(['right', 'left']);
      }

      if (
        player.attribute.notoriety >= 100 ||
        player.attribute.notoriety <= 0
      ) {
        menu.classList.add('menu--reset');
        if(player.attribute.notoriety >= 100) death.innerHTML = endSentences.notoriety.max;
        if(player.attribute.notoriety <= 0) death.innerHTML = endSentences.notoriety.min;
        // redirect into the home page when you click on the button "Recommencer"
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        retrybtn.addEventListener('click', function(){
          window.location.reload();
        })
        var musicLost = document.querySelector('.darkness');
        backTheme.pause();
        canPlay = false;
        musicLost.play();
        oxo.inputs.cancelKeysListeners(['right', 'left']);
      }
      if (player.attribute.loyalty >= 100 || player.attribute.loyalty <= 0) {
        if(player.attribute.loyalty >= 100) death.innerHTML = endSentences.loyalty.max;
        if(player.attribute.loyalty <= 0) death.innerHTML = endSentences.loyalty.min;
        menu.classList.add('menu--reset');
        // redirect into the home page when you click on the button "Recommencer"
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        retrybtn.addEventListener('click', function(){
          window.location.reload();
        })
        var musicLost = document.querySelector('.darkness');
        backTheme.pause();
        canPlay = false;
        musicLost.play();
        oxo.inputs.cancelKeysListeners(['right', 'left']);
      }
      
      if (player.attribute.power >= 100 || player.attribute.power <= 0) {
        if(player.attribute.power >= 100) death.innerHTML = endSentences.power.max;
        if(player.attribute.power <= 0) death.innerHTML = endSentences.power.min;
        menu.classList.add('menu--reset');
        // redirect into the home page when you click on the button "Recommencer"
        oxo.inputs.listenKey('enter', function() {
          window.location.reload();
        });
        retrybtn.addEventListener('click', function(){
          window.location.reload();
        })
        var musicLost = document.querySelector('.darkness');
        backTheme.pause();
        canPlay = false;
        
        musicLost.play();
        oxo.inputs.cancelKeysListeners(['right', 'left']);
      }
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
        if(canPlay){

          if (key === "right") {
            param = {
              card: newCard,
              direction: "right",
              flag:containerFlag
            };
            setup(param);
          }
          if (key === "left") {
            param = {
              card: newCard,
              direction: "left",
              flag:containerFlag
            };
            setup(param);
          }
        }
      });
      }
      
    }
    updateAttribute();
    // AddEventListeners handling
    // If the user chooses yes, we change the corresponding user values

    oxo.inputs.listenArrowKeys(function(key) {
      if(canPlay){
        if (key === "right") {
          param = {
            card: sectionCard,
            direction: "right",
            flag:containerFlag
          };
          setup(param);
        }
        if (key === "left") {
          param = {
            card: sectionCard,
            direction: "left",
            flag:containerFlag
          };
          setup(param);
        }
      }
    });
  }
  oxo.inputs.listenArrowKeys(function(key) {
    if (key === "left") {
      displayRules = true;
      oxo.screens.loadScreen("card", card);
    }
    if (key === "right") {
      displayRules = false;
      canPlay = true;
      oxo.screens.loadScreen("card", card);

    }
  });
}

