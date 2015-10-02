$(document).ready(function(){
    $('#startGame').click(function(){
        $(".gameWelcomeContainer").hide();
        $(".gameContainer").show();
		$currentGameLevel = parseFloat($('div.gameLevel span.gameEpisode').html());
		countDown($currentGameLevel);
    });
    $('#newGame').click(function(){
        location.reload();
    });
    
    function newQuestion($currentGameLevel){
		stoper();
		countDown($currentGameLevel);
		
        var arrOperators = new Array( "+", "-", "*", "/");
        var iRandom = Math.floor((Math.random() * arrOperators.length)); 
        var sOperator = arrOperators[iRandom];
        $('div.arithmaticOperator').html(sOperator);
        
        $('div.finalAnswer').html('');
        $('div.firstDigit').html(Math.floor((Math.random()+0.1) * (10*$currentGameLevel)));
        $('div.secondDigit').html(Math.floor((Math.random()+0.1) * (10*$currentGameLevel)));
    }
    
	$strokeCount = 0;
	
    $('.finalAnswer').keypress(function(e){
		
        if (e.which == '13') {			
            $firstDigit = parseFloat($('div.firstDigit').html());
            $arithmaticOperator = $('div.arithmaticOperator').html();
            $secondDigit = parseFloat($('div.secondDigit').html());
            $finalAnswer = parseFloat($('div.finalAnswer').html());
            
            $finalAnswerAreaIsNull = $('div.finalAnswer').html();
            
			
			
			
            if($finalAnswerAreaIsNull == ''){
                return false;
            }else{
				$currentGameLevel = parseFloat($('div.gameLevel span.gameEpisode').html());
				
				$levelCount = parseFloat($('div.gameLevelStage span.gameLevelSpan').html());
				$('div.gameLevelStage span.gameLevelSpan').html($levelCount+1);
		
				if((++$strokeCount)%10 == 0){
					levelUp();
				}
				
                if($arithmaticOperator == '+'){
                    $addAnswer = $firstDigit+=$secondDigit;
                    if($addAnswer == $finalAnswer){
                       growScore($currentGameLevel); 
                    }else{
                       reduceLife($currentGameLevel);
                    }
                }else if($arithmaticOperator == '-'){
                    $deductAnswer = $firstDigit-=$secondDigit;
                    if($deductAnswer == $finalAnswer){
                       growScore($currentGameLevel); 
                    }else{
                       reduceLife($currentGameLevel);
                    }
                }else if($arithmaticOperator == '*'){
                    $multiplyAnswer = $firstDigit*=$secondDigit;
                    if($multiplyAnswer == $finalAnswer){
                       growScore($currentGameLevel); 
                    }else{
                       reduceLife($currentGameLevel);
                    }
                }else{
                    $devideAnswer = $firstDigit/=$secondDigit;
                    $roundedValue = Math.floor($devideAnswer * 10) / 10;
                    if($roundedValue == $finalAnswer){
                       growScore($currentGameLevel); 
                    }else{
                       reduceLife($currentGameLevel);
                    }
                }
            }
        }
    });

    function reduceLife($currentGameLevel){
        $lives = parseFloat($('div.gameLives span').html());
        if($lives == 1){
            $finalScore = parseFloat($('div.gameScore span').html());
            $finalLevel = parseFloat($('div.gameLevel span.gameEpisode').html());
            $(".gamingDetails").hide();
            $(".gameStage").hide();
			$(".countDown").hide();
            $(".gameOver").show();
            $("div.finalGameScore span").html($finalScore);
            $("div.finalGameLevel span").html($finalLevel);
        }else{
            $remainingLives = $lives-=1;
            $('div.gameLives span').html($remainingLives).animate({
                    fontSize: "80px"
                }, 1000).animate({
                    fontSize: "30px"
                }, 1000);
            newQuestion($currentGameLevel);
        }
    }
    function growScore($currentGameLevel){
        $previousScore = parseFloat($('div.gameScore span').html());
        $currentScore = $previousScore+=(10*$currentGameLevel);
        $('div.gameScore span').html($currentScore).animate({
                fontSize: "80px"
            }, 1000).animate({
                fontSize: "30px"
            }, 1000);
        newQuestion($currentGameLevel);
    }
	function levelUp(){
        $previousLevel = parseFloat($('div.gameLevel span.gameEpisode').html());
        $currentLevel = $previousLevel+=1;
        $('div.gameLevel span.gameEpisode').html($currentLevel).animate({
                fontSize: "80px"
            }, 1000).animate({
                fontSize: "30px"
            }, 1000);
    }
	
	var timer;
	function countDown($currentGameLevel){
		clearInterval(timer);
		var sec = 20;
		timer = setInterval(function() {
		$('.countDown span').text(sec--);
			if (sec == -1) {
				clearInterval(timer);
				reduceLife($currentGameLevel);
			} 
		}, 1000);
	}
	function stoper(){
		clearTimeout(timer);
	}
});

