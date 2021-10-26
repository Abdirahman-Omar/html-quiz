var quiz = [];
var indexQuestionCourante = 0;
var resultat = 0;



/* Cette function va aléatoirement générer des questions*/
function RandomizeQuestion() {
	quiz = [];
	indexQuestionCourante = 0;
	resultat = 0;
	var faciles = questions.questionFacile;
	var intermediaires = questions.questionInter;
	var difficiles= questions.questionDifficile;
	var easy = document.querySelector("#facile");
	var hard = document.querySelector("#difficile");
	
	
	if (!easy.checked && !hard.checked) {
		return;
	}
/* Ici on cherche 3 questions faciles et 2 questions intermédiaires*/
	if (easy.checked){
		for (let i = 0; i < 3; i++){
			var nbAlea = Math.floor(Math.random()*faciles.length);
			console.log("Question facile # ", i+1, " : ", nbAlea);
			// Utiliser push() pour mettre la question correspondant à la position aléatoire dans le tableau quiz
			quiz.push(faciles[nbAlea]);
			// Ajouter la ligne de code pour éviter de choisir de nouveau cette même question.
			faciles.splice(nbAlea, 1);
		}
	
		for (let i = 0; i < 2; i++){
			var nbAlea = Math.floor(Math.random()*intermediaires.length);
			console.log("Question intermédiaire # ", i+1, " : ", nbAlea);
			// Utiliser push() pour mettre la question correspondant à la position aléatoire dans le tableau quiz
			quiz.push(intermediaires[nbAlea]);
			// Ajouter la ligne de code pour éviter de choisir de nouveau cette même question.
			intermediaires.splice(nbAlea, 1);
		}
	}
	/* Ici on cherche 2 intermédiaires et 3 questions difficile */
	if (hard.checked){
		for (let i = 0; i < 2; i++){
			var nbAlea = Math.floor(Math.random()*intermediaires.length);
			console.log("Question intermédiaire # ", i+1, " : ", nbAlea);
			// Utiliser push() pour mettre la question correspondant à la position aléatoire dans le tableau quiz
			quiz.push(intermediaires[nbAlea]);
			// Ajouter la ligne de code pour éviter de choisir de nouveau cette même question.
			intermediaires.splice(nbAlea, 1);
		}

		for (let i = 0; i < 3; i++){
			var nbAlea = Math.floor(Math.random()*difficiles.length);
			console.log("Question difficiles # ", i+1, " : ", nbAlea);
			// Utiliser push() pour mettre la question correspondant à la position aléatoire dans le tableau quiz
			quiz.push(difficiles[nbAlea]);
			variableGlobale = difficiles[nbAlea];
			// Ajouter la ligne de code pour éviter de choisir de nouveau cette même question.
			difficiles.splice(nbAlea, 1);
		}
	}
	/* Ici on affiche les choix de difficultés*/
	/*Après avoir choisi une diffuculté, on fait disparaitre les bouttons des choix*/
	var choixNiveau = document.querySelector("#ChoixNiveau");
	choixNiveau.style.display = "none"
	var conteneurQuiz = document.querySelector("#conteneurQuiz");
	conteneurQuiz.style.display = "block"
	afficherQuestion(quiz[indexQuestionCourante])
	console.log(quiz);
}

/* Ici on affiche les questions et les choix de réponses dans le questionnaire*/
function afficherQuestion(objectQuestion) {
		var question = document.querySelector("#question");
		question.innerHTML = objectQuestion.question  + " [" + objectQuestion.niveau + "]";
		var choix1 = document.querySelector("#choix1");
		var choix2 = document.querySelector("#choix2");
		var choix3 = document.querySelector("#choix3");
		choix1.innerHTML =objectQuestion.choix[0];
		choix2.innerHTML =objectQuestion.choix[1];
		choix3.innerHTML =objectQuestion.choix[2];
         
         /*Après avoir cocher une réponse, on le décoche à la question suivante*/
		var check1 = document.querySelector("#check1");
		var check2 = document.querySelector("#check2");
		var check3 = document.querySelector("#check3");
		check1.checked = false;
		check2.checked = false;
		check3.checked = false;
}

/*Ici on gère le déroulement du quiz et des points*/
function validerQuestion() {
    var objetQuestion = quiz[indexQuestionCourante];
	var check1 = document.querySelector("#check1");
	var check2 = document.querySelector("#check2");
	var check3 = document.querySelector("#check3");
	/*Si il y'a rien de selectionner, on affiche une message d'erreur*/
	var erreur = document.querySelector("#erreur");
	if (!check1.checked && !check2.checked && !check3.checked) {
		erreur.style.display = "inline-block"
		return;
	} else {
		erreur.style.display = "none"
	}
    /*Si la bonne réponse est cocher, on lui donne un point*/
	var numeroReponse = objetQuestion.reponse;
	if (numeroReponse == 0 && check1.checked){
		resultat += 1;
	} else if (numeroReponse == 1 && check2.checked){
		resultat += 1;
	} else  if (numeroReponse == 2 && check3.checked){
		resultat += 1;
	}
	/*Si c'est la dernière question, le quiz est terminer*/
	if (indexQuestionCourante == 4) {
		afficherResultat();
		return;
	}

	indexQuestionCourante += 1;
	afficherQuestion(quiz[indexQuestionCourante])
}
/*Si le quiz est terminer, on affiche le total*/
function afficherResultat() {
	var conteneurQuiz = document.querySelector("#conteneurQuiz");
	conteneurQuiz.style.display = "none"
	var conteneurResultat = document.querySelector("#conteneurResultat");
	conteneurResultat.style.display = "block"
	var divResultat = document.querySelector("#resultat");
	divResultat.innerHTML = "Vous avez eu "+ resultat + " sur 5 bonne(s) reponse(s)";
	var total = document.querySelector("#total"); 
	total.innerHTML = "Total: " + (resultat * 100 / 5) + "%";

}
/*Lorsque le boutton "Quitter" est appuyer, on arrête le quiz et on le recommence*/
function stop() {
	var easy = document.querySelector("#facile");
	var hard = document.querySelector("#difficile");
	easy.checked = false;
	hard.checked = false;
	var choixNiveau = document.querySelector("#ChoixNiveau");
	choixNiveau.style.display = "block"
	var conteneurQuiz = document.querySelector("#conteneurQuiz");
	conteneurQuiz.style.display = "none"
}