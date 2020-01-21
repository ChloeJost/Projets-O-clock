function askQuestion(question, solution) {
    var reponse = prompt(question);
    if (reponse.toLowerCase() === solution.toLowerCase()) {
        alert("Gagné !");
        return true;
    } else {
        alert("Perdu...");
        return false;
    }
}


var questions = [
    "Quelle mer borde la ville de Sébastopol ?",
    'Quel est l\'âge du capitaine ?',
    "Combien de nains habitent chez Blanche-Neige ?",
    'Quelle est la capitale de l\'Allemagne ?',
    'Combien font 5 * 12 ?'
];

var solutions = [
    "la mer noire",
    "63",
    "0",
    "Berlin",
    "60"
];

var score = 0;

for (var index = 0; index < solutions.length; index++) {
    var goodAnswer = askQuestion(questions[index], solutions[index]);
    if (goodAnswer) {
        score++;
    }
}

alert("Score final : " + score);