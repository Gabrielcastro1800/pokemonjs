//Trabalho de programação: Pokémon JS por Gabriel Castro e Wendel Coelho ambos da 1C1
//função de dano
function damage(nvl, atk, atkpower, dfs, type, poke, s, bol){
    var multi = 1;
    var boostdfs = 1;
    var boostatk = 1;
    var table = [
        [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1],
        [1,0.5,0.5,1,2,2,1,1,1,1,1,2,0.5,1,0.5,1,2,1],
        [1,2,0.5,1,0.5,1,1,1,2,1,1,1,2,1,0.5,1,1,1],
        [1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5,1,1,1],
        [1,0.5,2,1,0.5,1,1,0.5,2,0.5,1,0.5,2,1,0.5,1,0.5,1],
        [1,0.5,0.5,1,2,0.5,1,1,2,2,1,1,1,1,2,1,0.5,1],
        [2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1,2,2,0.5],
        [1,1,1,1,2,1,1,0.5,0.5,1,1,1,0.5,0.5,1,1,0,2],
        [1,2,1,2,0.5,1,1,2,1,0,1,0.5,2,1,1,1,2,1],
        [1,1,1,0.5,2,1,2,1,1,1,1,2,0.5,1,1,1,0.5,1],
        [1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,0,0.5,1],
        [1,0.5,1,1,2,1,0.5,0.5,1,0.5,2,1,1,0.5,1,2,0.5,0.5],
        [1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1,1,0.5,1],
        [0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,0.5,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0.5,0],
        [1,1,1,1,1,1,2,1,1,1,2,1,1,2,1,0.5,1,0.5],
        [1,0.5,0.5,0.5,1,2,1,1,1,1,1,1,2,1,1,1,0.5,2],
        [1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,2,2,0.5,1]];

        for(var i=0;i<tipos[poke].length;i++){
            multi = multi*table[type][tipos[poke][i]];
        }

        if(bol == 1){
            for(var i=0;i<mboost[1+s*2];i++){
                boostdfs+=0.5;
            }
            for(var i=0;i<iboost[0+s*2];i++){
                boostatk+=0.5;
            }
            for(var i=0;i>mboost[1+s*2];i--){
                boostdfs=2/(2-(i-1));
            }
            for(var i=0;i>iboost[0+s*2];i--){
                boostatk=2/(2-(i-1));
            }
        }else if(bol == 0){
            for(var i=0;i<iboost[1+s*2];i++){
                boostdfs+=0.5;
            }
            for(var i=0;i<mboost[0+s*2];i++){
                boostatk+=0.5;
            }
            for(var i=0;i>iboost[1+s*2];i--){
                boostdfs=2/(2-(i-1));
            }
            for(var i=0;i>mboost[0+s*2];i--){
                boostatk=2/(2-(i-1));
            }
        }
        anim = true;
    return ((((2*nvl/5+2)*(atk*boostatk)*atkpower/(dfs*boostdfs))/50)+2)*multi;
}
//attacks
function Splash(bol, aaccuracy, baccuracy){
    bmessage = "Nada aconteceu!";
}

function Transform(bol, aaccuracy, baccuracy){
    if(bol==0){
        pokeatual = inimigoatual;
        bmessage = pokes[pokeatual]+" se transformou no "+pokes[inimigoatual];
    }else if(bol==1){
        inimigoatual = pokeatual;
        bmessage = pokes[inimigoatual]+" se transformou no "+pokes[pokeatual];
    }
}

function Teleport(bol, aaccuracy, baccuracy){
    bmessage = "Ele não consegue fugir";
}

function Metronome(bol, aaccuracy, baccuracy){
    var move;
    do{
        var randp = Math.ceil(Math.random()*151);
        var randa = Math.floor(Math.random()*4);
        move = moves[randp][randa];
    }while(move==0);
    moves[randp][randa](bol, aaccuracy, baccuracy);
    bmessage = moves[randp][randa].name+" foi usado! "+bmessage;
}

//fisicos
function Tackle(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HornAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ViceGrip(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 55;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SelfDestruct(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 200;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida = 0;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida = 0;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Explosion(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 250;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida = 0;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida = 0;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function TakeDown(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 90;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida-=damg/4;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida-=damg/4;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DoubleEdge(bol, aaccuracy, baccuracy){
    var accuracy = 100;
    var power = 130;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida-=damg/3;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida-=damg/3;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Submission(bol, aaccuracy, baccuracy){
    var accuracy = 0.80;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida-=damg/4;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida-=damg/4;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function KarateChop(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 50;
    var type = 6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Thrash(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.6){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.6){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SeismicToss(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(tipos[inimigoatual][0] != 13 && tipos[inimigoatual][1] != 13){
                var damg = meunvl;
                inivida-=damg;
                bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[inimigoatual]+" é imune!";
            }
        }else if(bol==1){
            if(tipos[pokeatual][0] != 13 && tipos[pokeatual][1] != 13){
                var damg = ininvl;
                vida-=damg;
                bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[pokeatual]+" é imune!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PayDay(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function LeechLife(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 80;
    var type = 11;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida+=damg/2;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida+=damg/2;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Pound(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Peck(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 35;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DrillPeck(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 80;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function QuickAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Swift(bol, aaccuracy, baccuracy){
    var power = 60;
    var type = 0;
    if(bol==0){
        var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
        var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
        var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
        inivida-=damg;
        bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
    }else if(bol==1){
        var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
        var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
        var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
        vida-=damg;
        bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
    }
}

function Scratch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function VineWhip(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 45;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Slam(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function RockThrow(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var power = 50;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function MegaPunch(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function MegaKick(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var power = 120;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Slash(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 70;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bite(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 60;
    var type = 15;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function BoneClub(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 65;
    var type = 8;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function RollingKick(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 60;
    var type = 6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Stomp(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Wrap(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            iwrap = true;
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            mwrap = true;
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bind(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 15;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            iwrap = true;
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            mwrap = true;
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HyperFang(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Headbutt(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 70;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DizzyPunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 70;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.8){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.8){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SuperFang(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var damg = maxinivida/2;
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var damg = maxvida/2;
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PoisonSting(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 7;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7 && tipos[inimigoatual][1] != 16 && tipos[inimigoatual][1] != 7 && tipos[inimigoatual][0] != 7){
                iestado = 4;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7 && tipos[pokeatual][1] != 16 && tipos[pokeatual][1] != 7 && tipos[pokeatual][0] != 7){
                mestado = 4;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FuryAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function CometPunch(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 18;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bonemerang(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var power = 50;
    var type = 8;
    var rand = 2;
    var ttdano = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DoubleKick(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 30;
    var type = 6;
    var rand = 2;
    var ttdano = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DoubleSlap(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 15;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FurySwipes(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function BodySlam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 85;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HiJumpKick(bol, aaccuracy, baccuracy){
    var accuracy = 90;
    var power = 130;
    var type = 6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
            vida-=maxvida/2;
            if(vida<0){
                vida=0;
            }
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
            inivida-=maxinivida/2;
            if(inivida<0){
                inivida=0;
            }
        }
    }
}

function Lick(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 35;
    var type = 13;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FirePunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 75;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ThunderPunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 75;
    var type = 3;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function IcePunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 75;
    var type = 5;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iestado = 2;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mestado = 2;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Earthquake(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 100;
    var type = 8;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Dig(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mwait == true){
            var accuracy = 1;
            var power = 100;
            var type = 8;
            var chance = accuracy*aaccuracy/baccuracy;
            if(Math.random()<chance){
                    var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                    var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                    var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                    inivida-=damg;
                    bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
                    maccuracy-=1000;
            }else{
                bmessage = pokes[pokeatual]+" errou o ataque!";
            }
            mwait = false;
        }else{
            mwait = true;
            maccuracy+=1000;
            bmessage = pokes[pokeatual]+" entrou na terra!";
        }
    }else if(bol==1){
        if(iwait == true){
            var accuracy = 1;
            var power = 100;
            var type = 8;
            var chance = accuracy*aaccuracy/baccuracy;
            if(Math.random()<chance){
                    var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                    var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                    var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                    vida-=damg;
                    bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
                    iaccuracy-=1000;
            }else{
                bmessage = pokes[inimigoatual]+" errou o ataque!";
            }
            iwait = false;
        }else{
            iwait = true;
            iaccuracy+=1000;
            bmessage = pokes[inimigoatual]+" entrou na terra!";
        }
    }
}

//status
function LeechSeed(bol, aaccuracy, baccuracy){
    var accuracy = 0.90;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            iniseed = true;
            bmessage = pokes[inimigoatual]+" foi plantado";
        }else if(bol==1){
            mseed = true;
            bmessage = pokes[pokeatual]+"  foi plantado";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PoisonPowder(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[inimigoatual]+" é imune";
            }else{
                iestado = 4;
                bmessage = pokes[inimigoatual]+" foi envenenado";
            }
        }else if(bol==1 && mestado == 0){
            if(tipos[pokeatual][1] == 16 || tipos[pokeatual][1] == 7 || tipos[pokeatual][0] == 7){
                bmessage = pokes[pokeatual]+" é imune";
            }else{
                mestado = 4;
                bmessage = pokes[pokeatual]+"  foi envenenado";
            }
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PoisonGas(bol, aaccuracy, baccuracy){
    var accuracy = 0.90;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[inimigoatual]+" é imune";
            }else{
                iestado = 4;
                bmessage = pokes[inimigoatual]+" foi envenenado";
            }
        }else if(bol==1 && mestado == 0){
            if(tipos[pokeatual][1] == 16 || tipos[pokeatual][1] == 7 || tipos[pokeatual][0] == 7){
                bmessage = pokes[pokeatual]+" é imune";
            }else{
                mestado = 4;
                bmessage = pokes[pokeatual]+"  foi envenenado";
            }
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Toxic(bol, aaccuracy, baccuracy){
    var accuracy = 0.90;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[inimigoatual]+" é imune";
            }else{
                iestado = 4;
                bmessage = pokes[inimigoatual]+" foi envenenado";
            }
        }else if(bol==1 && mestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[pokeatual]+" é imune";
            }else{
                mestado = 4;
                bmessage = pokes[pokeatual]+"  foi envenenado";
            }
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SleepPowder(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 5;
            bmessage = pokes[inimigoatual]+" está dormindo";
        }else if(bol==1 && mestado == 0){
            mestado = 5;
            bmessage = pokes[pokeatual]+"  está dormindo";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Hypnosis(bol, aaccuracy, baccuracy){
    var accuracy = 0.6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 5;
            bmessage = pokes[inimigoatual]+" está dormindo";
        }else if(bol==1 && mestado == 0){
            mestado = 5;
            bmessage = pokes[pokeatual]+"  está dormindo";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function StunSpore(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 3;
            bmessage = pokes[inimigoatual]+" está paralizado";
        }else if(bol==1 && mestado == 0){
            mestado = 3;
            bmessage = pokes[pokeatual]+"  está paralizado";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Sing(bol, aaccuracy, baccuracy){
    var accuracy = 0.55;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 5;
            bmessage = pokes[inimigoatual]+" está dormindo";
        }else if(bol==1 && mestado == 0){
            mestado = 5;
            bmessage = pokes[pokeatual]+"  está dormindo";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ThunderWave(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 3;
            bmessage = pokes[inimigoatual]+" está paralizado";
        }else if(bol==1 && mestado == 0){
            mestado = 3;
            bmessage = pokes[pokeatual]+"  está paralizado";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Harden(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=1;
            bmessage = pokes[pokeatual]+" endureceu";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=1;
            bmessage = pokes[inimigoatual]+" endureceu";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function Withdraw(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=1;
            bmessage = pokes[pokeatual]+" endureceu";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=1;
            bmessage = pokes[inimigoatual]+" endureceu";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function AcidArmor(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=2;
            bmessage = pokes[pokeatual]+" endureceu bastante";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=2;
            bmessage = pokes[inimigoatual]+" endureceu bastante";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function Rest(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mestado == 0){
            vida = maxvida;
            mestado = 5;
            bmessage = pokes[pokeatual]+" recuperou a vida";
        }else{
            bmessage = pokes[pokeatual]+" já tem algum efeito";
        }
    }else if(bol==1){
        if(iestado == 0){
            inivida = maxinivida;
            iestado = 5;
            bmessage = pokes[inimigoatual]+" recuperou a vida";
        }else{
            bmessage = pokes[inimigoatual]+" já tem algum efeito";
        }
    }
}

function Recover(bol, aaccuracy, baccuracy){
    if(bol==0){
        vida += maxvida/2;
        if(vida>maxvida){
            vida=maxvida;
        }
        bmessage = pokes[pokeatual]+" recuperou a vida";
    }else if(bol==1){
        inivida += maxinivida/2;
        if(inivida>maxinivida){
            inivida=maxinivida;
        }
        bmessage = pokes[inimigoatual]+" recuperou a vida";
    }
}

function DefenseCurl(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=1;
            bmessage = pokes[pokeatual]+" endureceu";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=1;
            bmessage = pokes[inimigoatual]+" endureceu";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function Leer(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iboost[1]>-6){
                iboost[1]-=1;
                bmessage = pokes[inimigoatual]+" perdeu defesa";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda defesa";
            }
        }else if(bol==1){
            if(mboost[1]>-6){
                mboost[1]-=1;
                bmessage = pokes[pokeatual]+"  perdeu defesa";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda defesa";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Growl(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iboost[0]>-6){
                iboost[0]-=1;
                bmessage = pokes[inimigoatual]+" perdeu ataque";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu todo ataque";
            }
        }else if(bol==1){
            if(mboost[0]>-6){
                mboost[0]-=1;
                bmessage = pokes[pokeatual]+" perdeu ataque";
            }else{
                bmessage = pokes[pokeatual]+" perdeu todo ataque";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function TailWhip(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iboost[1]>-6){
                iboost[1]-=1;
                bmessage = pokes[inimigoatual]+" perdeu defesa";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda defesa";
            }
        }else if(bol==1){
            if(mboost[1]>-6){
                mboost[1]-=1;
                bmessage = pokes[pokeatual]+"  perdeu defesa";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda defesa";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SandAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iaccuracy>50){
                iaccuracy-=10;
                bmessage = pokes[inimigoatual]+" perdeu precisão";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda precisão";
            }
        }else if(bol==1){
            if(maccuracy>50){
                maccuracy-=10;
                bmessage = pokes[pokeatual]+" perdeu precisão";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda precisão";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SmokeScreen(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iaccuracy>50){
                iaccuracy-=10;
                bmessage = pokes[inimigoatual]+" perdeu precisão";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda precisão";
            }
        }else if(bol==1){
            if(maccuracy>50){
                maccuracy-=10;
                bmessage = pokes[pokeatual]+" perdeu precisão";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda precisão";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Minimize(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(maccuracy<160){
            maccuracy+=20;
            bmessage = pokes[pokeatual]+" aumentou evasão";
        }else{
            bmessage = pokes[pokeatual]+" aumentou toda evasão";
        }
    }else if(bol==1){
        if(iaccuracy<160){
            iaccuracy+=20;
            bmessage = pokes[inimigoatual]+" aumentou evasão";
        }else{
            bmessage = pokes[inimigoatual]+" aumentou toda evasão";
        }
    }
}

function ConfuseRay(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mconfuso = true;
            bmessage = pokes[inimigoatual]+" está confuso";
        }else if(bol==1){
            iconfuso = false;
            bmessage = pokes[pokeatual]+"  está confuso";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SuperSonic(bol, aaccuracy, baccuracy){
    var accuracy = 0.55;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mconfuso = true;
            bmessage = pokes[inimigoatual]+" está confuso";
        }else if(bol==1){
            iconfuso = false;
            bmessage = pokes[pokeatual]+"  está confuso";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

//special
function RazorLeaf(bol, aaccuracy, baccuracy){
    var accuracy = 0.95;
    var power = 55;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Absorb(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 20;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            vida+=damg/2;
            if(vida>maxvida){
                vida=maxvida;
            }
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            inivida+=damg/2;
            if(inivida>maxinivida){
                inivida=maxinivida;
            }
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function MegaDrain(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            vida+=damg/2;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            inivida+=damg/2;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SonicBoom(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var damg = 20;
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var damg = 20;
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DragoRage(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 ){
            if(tipos[inimigoatual][0] != 17 && tipos[inimigoatual][1] != 17){
                var damg = 40;
                inivida-=damg;
                bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[inimigoatual]+" é imune!";
            }
        }else if(bol==1){
            if(tipos[inimigoatual][0] != 17 && tipos[inimigoatual][1] != 17){
                var damg = 40;
                vida-=damg;
                bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[pokeatual]+" é imune!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Gust(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function WingAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 60;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Ember(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ThunderShock(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 3;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Thunder(bol, aaccuracy, baccuracy){
    var accuracy = 0.7;
    var power = 110;
    var type = 3;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7 && iestado==0){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7 && mestado==0){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bubble(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function WaterGun(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Surf(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Flamethrower(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Sludge(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7 && iestado==0){
                iestado = 4;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7 && mestado==0){
                mestado = 4;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function TriAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.8 && iestado==0){
                iestado = Math.ceil(Math.random()*3);
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.8 && mestado==0){
                mestado = Math.ceil(Math.random()*3);
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Psybeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Psychic(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iboost[3]<6){
                iboost[3]--;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mboost[3]<6){
                iboost[3]--;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DreamEater(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 100;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 5){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            vida+=damg/2;
            if(vida>maxvida){
                vida = maxvida;
            }
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1 && mestado == 5){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            inivida+=damg/2;
            if(inivida>maxinivida){
                inivida = maxinivida;
            }
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else{
            bmessage = "O pokémon está acordado!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Confusion(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 50;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function NightShade(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(tipos[inimigoatual][0] != 0 && tipos[inimigoatual][1] != 0){
                var damg = meunvl;
                inivida-=damg;
                bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[inimigoatual]+" é imune!";
            }
        }else if(bol==1){
            if(tipos[pokeatual][0] != 0 && tipos[pokeatual][1] != 0){
                var damg = ininvl;
                vida-=damg;
                bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[pokeatual]+" é imune!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Acid(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 7;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iboost[3]--;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mboost[3]--;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function AuroraBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 5;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iboost[0]--;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mboost[0]--;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function IceBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 5;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 2;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 2;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SolarBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FireBlast(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HydroPump(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HyperBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

//inicio
var canvas = document.getElementById("inicio");
var ctx = canvas.getContext("2d");

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var back = new Image();
var chat = new Image();
var poke1 = new Image();
var poke2 = new Image();
var vspng = new Image();
var barpng = new Image();
var arena = new Image();
var arena2 = new Image();
var arena3 = new Image();
var mart = new Image();
var image = new Image();
var arenaescolher = 0;
var count = 1;
var choose = 1;
var message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
var poke = "";
var escolha = false;
var yn = 0;
var fob = 1; //fob = fight or bag
var money = 10;
var comp = 0;
var bag=[[potion, 0, 10, "Poção","Images/itens/potion.png"],[spotion, 0, 50, "SuperPoção","Images/itens/super-potion.png"],[fullheal, 0, 60, "CuraTudo","Images/itens/full-heal.png"],[revive, 0, 30, "Reviver","Images/itens/revive.png"],[maxrevive, 0, 80, "ReviverMax","Images/itens/max-revive.png"],[rarecandy, 0, 100, "Doce Raro","Images/itens/rare-candy.png"],[pokeball, 0, 10, "PokeBola","Images/itens/pokeball.png"],[thunderstone, 0, 150, "PedraTrovão","Images/itens/thunder-stone.png"],[moonstone, 0, 150, "PedradaLua","Images/itens/moon-stone.png"],[firestone, 0, 150, "PedradoFogo","Images/itens/fire-stone.png"],[leafstone, 0, 150, "PedradaFolha","Images/itens/leaf-stone.png"],[waterstone, 0, 150, "PedradaÁgua","Images/itens/water-stone.png"]];
var bagoverlay = false;
var pokeoverlay = false;
var bagovs = 0;
var trans = 0;
var transy = 0;
var transimg = new Image();
var ly = 0;
var cy = 0;

//transição
var tela = 1;
var versus = new Image();
var spr1 = new Image();
var spr2 = new Image();

//batalha
var pokeatual, meunvl, vida, maxvida, inimigoatual, ininvl, inivida, maxinivida, Statusg=[], pokes=[], moves=[], tipos=[], lvs=[], mboost=[], iboost=[], meuspokes=[], pokedesc=[];
var yatk = 0;
var xatk = 0;
var bmessage;
var battlemode = 0;
var click;
var inimigoatk = 0;
var meuatk = 0;
var mseed = false;
var iniseed = false;
var mestado = 0;
var iestado = 0;
var meuestado = new Image();
var iniestado = new Image();
var backcount = new Image();
var mrecharge = false;
var irecharge = false;
var mconfuso = false;
var iconfuso = false;
var mwrap = false;
var iwrap = false;
var flinch = false;
var mflinch = false;
var iwait = false;
var mwait = false;
var mspeed = 0;
var ispeed = 0;
var item = false;
var damagepng = new Image();
var xplayer = 300;
var xini = 500;
var anim = false;
var batalha = 0;
var music = 0;
var battlemusic = new Audio("audio/battle.mp3");
var bulbasound = new Audio("audio/bulbasaur.mp3")
var charsound = new Audio("audio/charmander.mp3")
var squisound = new Audio("audio/Squirtle.mp3")
var pokeovs = 0;
var k=0;
var pokeop = false;
var pokeopc = 0;
var amessage = "";
var trade1=0,trade2=0;
var captura = false;
var pokedex = 0;
var choosedex = 0;
var pokeback = new Image();
var pokeimage = new Image();
var lines = [""];
var palavras = [];
var c =0;
var l=0;
var verify = false;
var use = false;
var usaritem = 0;
var pos = 0;
//pokes: poke, vida, estado, nivel, xp;
meuspokes=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

//errar e acertar
var maccuracy = 1, mevasion = 1, iaccuracy = 1, ievasion = 1, a = 1;
pokes = [0,"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
//moves
moves = [0,[Tackle, LeechSeed, PoisonPowder, RazorLeaf],[SleepPowder, LeechSeed, PoisonPowder, RazorLeaf],[SleepPowder, LeechSeed, PoisonPowder, SolarBeam],[Scratch, Ember, 0, 0],[Slash, Ember, 0, 0],[FireBlast, Flamethrower, BodySlam, Earthquake],[Tackle, Bubble, Bite, 0],[Tackle, WaterGun, Bite, MegaPunch],[HydroPump, WaterGun, Bite, MegaPunch],[Tackle, 0, 0, 0],[Tackle, Harden, 0, 0],[Confusion, PoisonPowder, Psybeam, SleepPowder],[PoisonSting, 0, 0, 0],[PoisonSting, Harden, 0, 0],[PoisonSting, Harden, Toxic, FuryAttack],[Gust, QuickAttack, SandAttack, 0],[Gust, QuickAttack, SandAttack, WingAttack],[HyperBeam, QuickAttack, SandAttack, WingAttack],[Tackle, QuickAttack, 0, 0],[SuperFang, QuickAttack, HyperFang, 0],[Peck, 0, 0, 0],[Peck, FuryAttack, DrillPeck, 0],[Leer, Wrap, PoisonSting, 0],[Leer, Wrap, PoisonSting, Acid],[ThunderShock, ThunderWave, Growl, QuickAttack],[Thunder, ThunderWave, MegaPunch, QuickAttack],[Scratch, SandAttack, PoisonSting, 0],[Swift, FurySwipes, PoisonSting, Dig],[Tackle, PoisonSting, Bite, 0],[Tackle, PoisonSting, Bite, FurySwipes],[Earthquake, Toxic, BodySlam, FurySwipes],[Tackle, PoisonSting, Bite, 0],[Tackle, PoisonSting, Bite, FurySwipes],[Earthquake, Toxic, BodySlam, FurySwipes],[Growl, Sing, DefenseCurl, Metronome],[Growl, Sing, DoubleSlap, Metronome],[Ember, QuickAttack, ConfuseRay, 0],[Swift, QuickAttack, ConfuseRay, Flamethrower],[Sing, Pound, DefenseCurl, DoubleSlap],[Sing, BodySlam, DefenseCurl, DoubleSlap],[Bite, LeechLife, SuperSonic, 0],[Bite, LeechLife, SuperSonic, WingAttack],[Absorb, PoisonPowder, Acid, SleepPowder],[Absorb, PoisonPowder, Acid, SleepPowder],[MegaDrain, PoisonPowder, SolarBeam, SleepPowder],[Scratch, StunSpore, LeechLife, 0],[Scratch, StunSpore, LeechLife, Slash],[Tackle, PoisonPowder, LeechLife, 0],[Psybeam, PoisonPowder, LeechLife, Psychic],[Scratch, Dig, SandAttack, 0],[Slash, Dig, SandAttack, Earthquake],[Growl, Scratch, Bite, PayDay],[FurySwipes, Slash, Bite, PayDay],
[Scratch, TailWhip, Confusion, 0],[FurySwipes, TailWhip, Confusion, HydroPump],[Scratch, FurySwipes, KarateChop, 0],[SeismicToss, FurySwipes, KarateChop, Thrash],[Bite, Ember, Leer, 0],[Bite, Flamethrower, TakeDown, FireBlast],[Bubble, Hypnosis, WaterGun, DoubleSlap],[BodySlam, Hypnosis, WaterGun, DoubleSlap],[BodySlam, Hypnosis, HydroPump, DoubleSlap],[Teleport, 0, 0, 0],[Teleport, Confusion, Psybeam, 0],[Metronome, Confusion, Psybeam, Psychic],[KarateChop, Leer, MegaKick, 0],[KarateChop, Leer, MegaKick, SeismicToss],[KarateChop, Submission, MegaKick, SeismicToss],[VineWhip, Wrap, PoisonPowder, 0],[VineWhip, Wrap, PoisonPowder, RazorLeaf],[Slam, Wrap, PoisonPowder, RazorLeaf],[WaterGun, Wrap, PoisonSting, SuperSonic],[WaterGun, Wrap, PoisonSting, HydroPump],[Tackle, DefenseCurl, RockThrow, 0],[Tackle, DefenseCurl, RockThrow, SelfDestruct],[Explosion, DefenseCurl, RockThrow, Earthquake],[Ember, TailWhip, Stomp, 0],[TakeDown, TailWhip, Stomp, FireBlast],[Confusion, Headbutt, Growl, 0],[Confusion, Headbutt, Psychic, WaterGun],[SuperSonic, ThunderShock, SonicBoom, 0],[SuperSonic, Thunder, SonicBoom, ThunderWave],[Peck, SandAttack, FurySwipes, Slash],[Peck, Growl, FurySwipes, DrillPeck],
[Peck, TriAttack, FurySwipes, DrillPeck],[Headbutt, Growl, AuroraBeam, Rest],[TakeDown, IceBeam, AuroraBeam, Rest],[PoisonGas, Pound, Minimize, 0],[PoisonGas, AcidArmor, Minimize, Harden],[Tackle, Withdraw, SuperSonic, 0],[TriAttack, Withdraw, SuperSonic, IceBeam],[ConfuseRay, Lick, NightShade, 0],[ConfuseRay, Lick, NightShade, Hypnosis],[DreamEater, Lick, NightShade, Hypnosis],[Tackle, Bind, RockThrow, Slam],[Hypnosis, Pound, Confusion, Headbutt],[Hypnosis, PoisonGas, Psychic, DreamEater],[Bubble, Leer, ViceGrip, 0],[Bubble, Harden, ViceGrip, Stomp],[Tackle, SonicBoom, SelfDestruct, 0],[Swift, SonicBoom, Explosion, ThunderShock],[Hypnosis, LeechSeed, StunSpore, 0],[SleepPowder, Stomp, StunSpore, SolarBeam],[BoneClub, Growl, Leer, Thrash],[Bonemerang, Growl, Leer, Thrash],[DoubleKick, MegaKick, HiJumpKick, RollingKick],[MegaPunch, FirePunch, ThunderPunch, IcePunch],[Slam, SuperSonic, Wrap, Stomp],[Tackle, SmokeScreen, SelfDestruct, Sludge],[Tackle, SmokeScreen, Explosion, Sludge],[HornAttack, Stomp, FuryAttack, TakeDown],[HornAttack, Surf, Earthquake, TakeDown],[DoubleSlap, DoubleEdge, Sing, Minimize],[Bind, Absorb, PoisonPowder, Slam],[Bite, MegaPunch, DizzyPunch, CometPunch],[Bubble, SmokeScreen, WaterGun, Leer],[Bubble, SmokeScreen, WaterGun, HydroPump],[Peck, SuperSonic, HornAttack, FuryAttack],[TakeDown, Surf, HornAttack, FuryAttack],[Tackle, WaterGun, Harden, Recover],[HydroPump, Surf, Harden, Recover],[Confusion, DoubleSlap, 0],[QuickAttack, Leer, Slash, Swift],[DoubleSlap, IcePunch, BodySlam, Thrash],[QuickAttack, ThunderShock, ThunderPunch, Thunder],[Ember, ConfuseRay, FirePunch, Flamethrower],[ViceGrip, SeismicToss, Harden, Slash],[Tackle, Stomp, Leer, TakeDown],[Splash, 0, 0, 0],[DragoRage, HydroPump, HyperBeam, Bite],[Sing, IceBeam, BodySlam, Surf],
[Transform, 0, 0, 0],[SandAttack, Tackle, QuickAttack, Bite],[SandAttack, Surf, HydroPump, Bite],[SandAttack, ThunderShock, Thunder, Bite],[SandAttack, Flamethrower, FireBlast, Bite],[Recover, Psybeam, TriAttack, Tackle],[WaterGun, Withdraw, HornAttack, Leer],[WaterGun, Withdraw, HornAttack, HydroPump],[Harden, Scratch, Absorb, Slash],[Harden, HydroPump, Absorb, Slash],[WingAttack, SuperSonic, Bite, HyperBeam],[Rest, BodySlam, HyperBeam, Headbutt],[IceBeam, Peck, HyperBeam, Rest],[ThunderShock, Peck, Thunder, Rest],[Flamethrower, Peck, FireBlast, Rest],[Wrap, ThunderWave, Slam, 0],[Wrap, ThunderWave, Slam, DragoRage],[FireBlast, HyperBeam, Surf, DragoRage],[Psychic, Thunder, Recover, IceBeam],[Psychic, Transform, Recover, Metronome]];
//status
Statusg = [0,[45,49,49,65,65,45],[60,62,63,80,80,60],[80,82,83,100,100,80],[39,52,43,60,50,65],[58,64,58,80,65,80],[78,84,78,109,85,100],[44,48,65,50,64,43],[59,63,80,65,80,58],[79,83,100,85,105,78],[45,30,35,20,20,45],[50,20,55,25,25,30],[60,45,50,90,80,70],[40,35,30,20,20,50],[45,25,50,25,25,35],[65,90,40,45,80,75],[40,45,40,35,35,56],[63,60,55,50,50,71],[83,80,75,70,70,101],[30,56,35,25,35,72],[55,81,60,50,70,97],[40,60,30,31,31,70],[65,90,65,61,61,100],[35,60,44,40,54,55],[60,95,69,65,79,80],[35,55,40,50,50,90],[60,90,55,90,80,110],[50,75,85,20,30,40],[75,100,110,45,55,65],[55,47,52,40,40,41],[70,62,67,55,55,56],[90,92,87,75,85,76],[46,57,40,40,40,50],[61,72,57,55,55,65],[81,102,77,85,75,85],[70,45,48,60,65,35],[95,70,73,95,90,60],[38,41,40,50,65,65],[73,76,75,81,100,100],[115,45,20,45,25,20],[140,70,45,85,50,45],[40,45,35,30,40,55],[75,80,70,65,70,90],[45,50,55,75,65,30],[60,65,70,85,75,40],[75,80,85,110,90,50],[35,70,55,45,55,25],[60,95,80,60,80,30],[60,55,50,40,55,45],[70,65,60,90,75,90],[10,55,25,35,45,95],[35,100,50,50,70,120],[40,45,35,40,40,90],[65,70,60,65,65,115],[50,52,48,65,50,55],[80,82,78,95,80,85],[40,80,35,35,45,70],[65,105,60,60,70,95],[55,70,45,70,50,60],[90,110,80,100,80,95],[40,50,40,40,40,90],[65,65,65,50,50,90],[90,95,95,70,90,70],[25,20,15,105,55,90],[40,35,30,120,70,105],[55,50,45,135,95,120],[70,80,50,35,35,35],[80,100,70,50,60,45],[90,130,80,65,85,55],[50,75,35,70,30,40],[65,90,50,85,45,55],[80,105,65,100,70,70],[40,40,35,50,100,70],[80,70,65,80,120,100],[40,80,100,30,30,20],
[55,95,115,45,45,35],[80,120,130,55,65,45],[50,85,55,65,65,90],[65,100,70,80,80,105],[90,65,65,40,40,15],[95,75,110,100,80,30],[25,35,70,95,55,45],[50,60,95,120,70,70],[52,90,55,58,62,60],[35,85,45,35,35,75],[60,110,70,60,60,110],[65,45,55,45,70,45],[90,70,80,70,95,70],[80,80,50,40,50,25],[105,105,75,65,100,50],[30,65,100,45,25,40],[50,95,180,85,45,70],[30,35,30,100,35,80],[45,50,45,115,55,95],[60,65,60,130,75,110],[35,45,160,30,45,70],[60,48,45,43,90,42],[85,73,70,73,115,67],[30,105,90,25,25,50],[55,130,115,50,50,75],[40,30,50,55,55,100],[60,50,70,80,80,150],[60,40,80,60,45,40],[95,95,85,125,75,55],[50,50,95,40,50,35],[60,80,110,50,80,45],[50,120,53,35,110,87],[50,105,79,35,110,76],[90,55,75,60,75,30],[40,65,95,60,45,35],[65,90,120,85,70,60],[80,85,95,30,30,20],[105,130,120,45,45,40],[250,5,5,35,105,50],[65,55,115,100,40,60],[105,95,80,40,80,90],[30,40,70,70,25,60],[55,65,95,95,45,85],[45,67,60,35,50,63],[80,92,65,65,80,68],[30,45,55,70,55,85],[60,75,85,100,85,115],[40,45,65,100,120,90],[70,110,80,55,80,105],[65,50,35,115,95,95],[65,83,57,95,85,105],[65,95,57,100,85,93],[65,125,100,55,70,85],[75,100,95,40,70,110],[20,10,55,15,20,80],[95,125,79,60,100,81],[130,85,80,85,95,60],[48,48,48,48,48,48],[55,55,50,45,65,55],[130,65,60,110,95,65],[65,65,60,110,95,130],[65,130,60,95,110,65],[65,60,70,85,75,40],[35,40,100,90,55,35],[70,60,125,115,70,55],[30,80,90,55,45,55],[60,115,105,65,70,80],[80,105,65,60,75,130],[160,110,65,65,110,30],[90,85,100,95,125,85],[90,90,85,125,90,100],[90,100,90,125,85,90],[41,64,45,50,50,50],[61,84,65,70,70,70],[91,134,95,100,100,80],[106,110,90,154,90,130],[100,100,100,100,100,100]]

//Types
tipos=[0,[4,7],[4,7],[4,7],[1],[1],[1,9],[2],[2],[2],[11],[11],[11,9],[11,7],[11,7],[11,7],[0,9],[0,9],[0,9],[0],[0],[0,9],[0,9],[7],[7],[3],[3],[8],[8],[7],[7],[7,8],[7],[7],[7,8],[17],[17],[1],[1],[0,17],[0,17],[7,9],[7,9],[4,7],[4,7],[4,7],[11,4],[11,4],[11,7],[11,7],[8],[8],[0],[0],[2],[2],[6],[6],[1],[1],[2],[2],[2,6],[10],[10],[10],[6],[6],[6],[4,7],[4,7],[4,7],[2,7],[2,7],[12,6],[12,6],[12,6],[1],[1],[2,10],[2,10],[3,16],[3,16],[0,9],[0,9],[0,9],[2],[2,5],[7],[7],[2],[2,5],[13,7],[13,7],[13,7],[12,8],[10],[10],[2],[2],[3],[3],[4,10],[4,10],[8],[8],[6],[6],[0],[7],[7],[8,12],[8,12],[0],[4],[0],[2],[2],[2],[2],[2],[2,10],[10,17],[9,11],[5,10],[3],[1],[11],[0],[2],[2,9],[2,5],[0],[0],[2],[3],[1],[0],[12,2],[12,2],[12,2],[12,2],[12,9],[0],[5,9],[3,9],[1,9],[14],[14],[14,9],[10],[10]];
//niveis de evolução
lvs=[0,16,32,-1,16,36,-1,16,36,-1,7,10,-1,7,10,-1,18,36,-1,20,-1,20,-1,22,-1,-2,-1,22,-1,16,-3,-1,16,-3,-1,-3,-1,-4,-1,-3,-1,22,-1,21,-5,-1,24,-1,31,-1,26,-1,28,-1,33,-1,28,-1,-4,-1,25,-6,-1,16,40,-1,28,40,-1,21,-5,-1,30,-1,25,40,-1,40,-1,37,-1,30,-1,-1,31,-1,34,-1,38,-1,-6,-1,25,40,-1,-1,26,-1,38,-1,30,-1,-5,-1,28,-1,-1,-1,-1,-1,35,-1,42,-1,-1,-1,-1,32,-1,33,-1,-6,-1,-1,-1,-1,-1,-1,-1,20,-1,-1,-1,-1,-1,-1,-1,-1,40,-1,40,-1,-1,-1,-1,-1,-1,30,55,-1,-1,-1,];
//status boost
mboost=[0,0,0,0,0];
iboost=[0,0,0,0,0];
//descrição dos pokémons,  proximo zubat!
pokedesc=[0,"Bulbasaur pode ser visto tirando uma soneca ao sol. A semente nas suas costas cresce cada vez mais à medida que absorve os raios solares.", "Há um broto nas costas deste Pokémon. As pernas e o tronco de Ivysaur são grossos e fortes para aguentar seu peso. Se começa a passar mais tempo no sol, é sinal de que seu bulbo logo irá florescer em uma flor grande.", "Há uma flor grande nas costas de Venusaur. Dizem que a flor adquire cores vívidas se está bem nutrido e se toma muito sol. O aroma da flor acalma as emoções das pessoas.", "A chama que queima na ponta da sua cauda é um indicador de suas emoções. A chama oscila quando Charmander está contente. Se o Pokémon fica com raiva, a chama queima violentamente.", "Charmeleon destrói seus oponentes sem pena com suas garras afiadas. Torna-se agressivo quando encontra um oponente forte e então a chama na ponta da sua cauda queima intensamente em uma cor azulada.", "Charizard voa pelo céu à procura de oponentes poderosos. Aspira fogo de temperatura tão ardente que derrete qualquer coisa. Entretanto, este Pokémon nunca virará seu hálito ardente em oponentes mais fracos que ele.", "A carapaça de Squirtle não serve só para sua proteção. As ranhuras em sua superfície e a sua forma arredondada ajudam a minimizar a resistência na água permitindo que nade em alta velocidade.", "Sua cauda grande é coberta por um pelo grosso. A cauda se torna cada vez mais escura à medida que Wartortle envelhece. Os arranhões na sua carapaça são evidências da resistência deste Pokémon em batalha.", "Blastoise possui canos de água muito precisos que sobressaem de sua carapaça. Podem dar tiros de água com tamanha precisão que conseguem abater latas vazias a uma distância de mais de 50 metros.", "Caterpie tem um apetite voraz. Pode devorar folhas maiores do que seu corpo bem diante de seus olhos. Este Pokémon libera um cheiro terrivelmente forte das suas antenas.", "O invólucro que reveste o corpo deste Pokémon é duro como uma prancha de metal. Metapod não se move muito e permanece imóvel para que seus órgãos moles evoluam dentro de sua couraça.", "Butterfree tem uma habilidade especial para achar o pólen delicioso das flores. Pode localizar, extrair e carregar o mel das flores que estão florescendo a mais de 10 km do seu ninho.", "Weedle tem um olfato extremamente aguçado. É capaz de distinguir os tipos de folhas que gosta dos tipos que não gosta simplesmente farejando com seu nariz vermelho grande.", 
"Kakuna permanece praticamente imóvel se agarrando a árvores. Entretanto, a preparação para a sua futura evolução é extremamente intensa. A prova disto é a quentura de sua carapaça.", "Beedrill são extremamente territoriais. Por segurança, aconselha-se que ninguém chegue perto de seus ninhos, pois se enraivecidos, atacam em um enxame furioso.", "Pidgey tem um senso de direção extremamente aguçado. É capaz de voltar para seu ninho sem errar, mesmo que seja removido dos lugares que conhece.", "Pidgeotto se apossa de uma área grande como seu próprio território. Este Pokémon voa para vigiar seu espaço. Se alguém invadir o seu território, punirá o invasor arduamente com suas garras afiadas sem piedade.", "Este Pokémon tem uma plumagem deslumbrante de belas penas brilhantes. Muitos Treinadores são atraídos pela beleza extraordinária das penas em sua cabeça, os convencendo a escolher Pidgeot como seu Pokémon.", "Rattata é extremamente prudente. Move suas orelhas até enquanto dorme para ouvir tudo. Não é particular na hora de escolher seu habitat podendo fazer seu ninho em qualquer lugar.", "As presas robustas de Raticate crescem continuamente. Para mantê-las afiadas, rói troncos e pedras. Pode até mesmo roer as paredes das casas.", "Spearow tem um piado muito alto que pode ser ouvido a mais de 1 km de distância. Se seu piado agudo e lamentoso for ouvido por todo lado, é sinal de que estão avisando uns aos outros que há perigo iminente.", "Fearow é reconhecido por seu pescoço e bico longo. O formato de seu corpo é bom para caça em terra ou água. Move seu bico fino agilmente para capturar presas.", "Ekans se enrola para descansar. Adota esta posição para responder rapidamente a qualquer ameaça de qualquer direção levantando a cabeça com uma encarada feroz.", "Este Pokémon é terrivelmente forte e pode esmagar qualquer coisa com seu corpo. Pode achatar até cilindros pesados de aço. Uma vez que Arbok se enrosca em seu oponente, escapar de seu abraço é impossível.", "Quando Pikachu acha alguma coisa nova, lança uma carga elétrica nela. Se você encontrar uma fruta torrada, é prova de que este Pokémon errou na intensidade de sua carga elétrica.", "Se suas bolsas elétricas ficarem sobrecarregadas, Raichu aterrará sua cauda no solo para descarregar eletricidade. Zonas queimadas podem ser encontradas perto de seu ninho.",
"O corpo de Sandshrew é configurado para absorver água sem desperdício, o que permite que sobreviva em desertos áridos. Enrola-se para se proteger de seus oponentes.", "O corpo de Sandslash é coberto por espinhos duros, que são partes endurecidas da sua pele. Troca seus espinhos uma vez por ano e os espinhos novos crescem por baixo dos velhos.", "Nidoran♀ tem espinhos que secretam um veneno poderoso. Pensa-se que foram desenvolvidos como proteção para este Pokémon pequenino. Quando enraivado, libera uma toxina horrível pelo seu chifre.", "Quando estão entre amigos e familiares, escondem seus espinhos para evitar acidentes. Ficam nervosos se forem separados de seu grupo.", "O corpo de Nidoqueen é revestido de escamas duríssimas. Gosta de lançar seus oponentes pelos ares com suas investidas fortes. Dá tudo de si para proteger suas crias.",  "Nidoran♂ desenvolveu músculos para mover suas orelhas em qualquer direção. Nem mesmo o menor som passa desapercebido por este Pokémon.", "Nidorino tem um chifre que é mais duro do que um diamante. Se sentir uma presença hostil, todos os espinhos nas suas costas se eriçam, e assim, desafia o oponente com toda sua força.", "A cauda grossa de Nidoking tem um poder imensamente destrutivo. Com uma rabada, pode derrubar uma torre de transmissão de metal. Uma vez que este Pokémon entra em um estado voraz, não há como pará-lo.", "Toda noite de lua cheia, grupos deste Pokémon saem para brincar. Ao amanhecer, os Clefairy cansados retornam aos seus refúgios nas montanhas e vão dormir pertinho uns dos outros.", "Clefable movimenta-se saltitando como se estivesse usando suas asas. Seus passinhos leves permitem que ande sobre água. É conhecido por caminhar em lagos em noites calmas de lua cheia.", "Ao nascer, Vulpix tem uma cauda branca. A cauda se separa em seis se este Pokémon recebe bastante amor de seu Treinador. As seis caudas se encaracolam majestosamente.", "Ninetales emite uma luz sinistra de seus olhos vermelhos para controlar totalmente a mente de seus oponentes. Diz-se que este Pokémon vive por mil anos.", "As cordas vocais de Jigglypuff podem se ajustar sem problema ao comprimento de onda de sua voz. Usa esta habilidade para cantar com um comprimento de onda preciso para adormecer seus oponentes.", "Wigglytuff tem olhos enormes e em forma de pires. As superfícies de seus olhos são sempre cobertas com uma camada fina de lágrimas. Se qualquer poeira entra nos olhos deste Pokémon, é lavada rapidamente.",
"Zubat permanece imóvel quietamente no escuro durante o dia. Se este Pokémon passasse muito tempo exposto ao sol, correria perigo de sofrer queimaduras leves.", "Golbat ama beber sangue de seres vivos. Este Pokémon é particularmente ativo em noites escuras. Ao cair da noite sai voando para procurar sangue fresco.", "Durante o dia, Oddish se enterra no solo para absorver nutrientes usando seu corpo inteiro. Quanto mais fértil for o solo, mais lustrosas se tornam as suas folhas.", "Gloom libera uma fragrância fedorenta do pistilo de sua flor. Quando se depara com perigo, o fedor aumenta. Se estiver se sentindo calmo e em segurança, não libera seu aroma fétido.", "O pólen tóxico de Vileplume causa ataques de alergia aguda. Por isso não é aconselhável se aproximar de nenhuma flor na selva, por mais linda que seja.", "Paras tem cogumelos parasitas crescendo em suas costas chamados tochukaso. Eles crescem ao se alimentarem dos nutrientes deste Pokémon Inseto. São muito valiosos como elixir de vida.", "Parasect são conhecidos por infestar árvores grandes em massa e drenar os nutrientes de seus troncos e raízes. Quando a árvore infestada padece, movem-se de uma vez para outra árvore.", "Diz-se que Venonat evoluiu com um revestimento fino de pelo rígido que cobre e protege seu corpo inteiro. Possui olhos tão grandes que não há uma presa que passe desapercebida.", "Venomoth é um Pokémon noturno e só ativo à noite. Suas presas favoritas são insetos pequenos que se encontram em volta das luzes nas ruas, atraídos pela luz na escuridão.", "Diglett são criados na maioria das fazendas agrícolas pela simples razão de que quando escavam, deixam o solo perfeitamente lavrado para o plantio. O solo fica ideal para o cultivo de legumes deliciosos.", "Dugtrio são na verdade trigêmeos originados de um único corpo, por isso pensam da mesma forma. Trabalham em equipe e sem descanso quando escavam.", "Meowth retrai as garras afiadas das suas patas para esgueirar-se furtivamente sem fazer barulho. Por algum motivo, este Pokémon ama moedas brilhantes que reluzem com a luz.", "Persian tem seis bigodes chamativos que dão uma aparência feroz a este Pokémon. Seus bigodes detectam os movimentos do ar para determinar o que está à sua volta. Torna-se manso se for agarrado pelos bigodes.", "Psyduck usa um poder misterioso que gera ondas cerebrais supostamente observadas apenas em seres adormecidos. Esta descoberta motivou polêmica entre estudiosos.",
"Golduck alcança uma velocidade incrível graças às nadadeiras membranosas de suas patas dianteiras e traseiras e à forma aerodinâmica de seu corpo. A velocidade deste Pokémon de fato supera a de qualquer nadador.", "Quando Mankey começa a se tremer e sua respiração nasal fica ofegante, é o sinal certo de que está ficando com raiva. Entretanto, porque explode de raiva rapidamente, é impossível alguém escapar de sua fúria.", "Quando Primeape fica furioso, sua circulação sanguínea é intensificada e seus músculos ficam ainda mais fortes. Entretanto, se torna menos inteligente.", "Growlithe tem um olfato bastante aguçado e uma memória olfativa incrível, nunca esquece um cheiro. Usa seu sistema de olfato avançado para determinar as emoções de outros seres vivos.", "Arcanine é conhecido por sua alta velocidade. Dizem que é capaz de percorrer mais de 10 mil quilômetros em um único dia e noite. O fogo que arde com vigor no corpo deste Pokémon é sua fonte de poder.", "Poliwag tem uma pele bem fina. Tanto que é possível ver suas vísceras em espiral através dela. Apesar de fina, a pele é também bem flexível e até mesmo os caninos mais afiados ricocheteiam dela.", "A superfície do corpo de Poliwhirl é sempre úmida e lisa com um fluido viscoso. Graças a esta película escorregadia, pode escapar das garras dos oponentes em batalhas.", "Os músculos fortes e altamente desenvolvidos de Poliwrath nunca se cansam, por mais que se exercite muito. É tão incrivelmente forte que pode cruzar o oceano nadando sem nenhum esforço.", "Abra dorme por 18 horas por dia. Entretanto, pode pressentir a presença de oponentes até mesmo enquanto dorme. Quando em perigo, se teletransporta para um lugar seguro.", "Kadabra emite uma onda alfa peculiar se tem dor de cabeça. Somente uma pessoa com uma psique forte pode se tornar o Treinador deste Pokémon.", "O cérebro de Alakazam cresce sem parar e por causa disso sua cabeça é muito pesada para seu pescoço segurar. Portanto, segura sua cabeça usando seu poder psicocinético.", "Os músculos de Machop são especiais e nunca ficam doloridos, nem mesmo com exercícios excessivos. Tem poder suficiente para arremessar cem pessoas adultas.", "Os músculos tonificados de Machoke são fortes como aço. Este Pokémon é tão forte que pode levantar um lutador de sumô com um só dedo.",
"Machamp é tão forte que pode arremessar o que quiser. Entretanto, quando tem que realizar uma tarefa que requer delicadeza e destreza, seus braços acabam se enrolando sem jeito. Tende a agir sem pensar.", "Este Pokémon tem um corpo fino e flexível permitindo que se incline e se balanceie para se esquivar de ataques. Cospe um fluido corrosivo capaz de derreter até ferro.", "Weepinbell tem um gancho na parte de trás de seu corpo, que usa à noite para se prender a um galho e dormir. Caso se mova enquanto dorme, pode acordar no chão.", "Victreebel tem uma trepadeira que estende de sua cabeça e agita como se fosse um animal prestes a atacar uma presa. Quando uma presa se aproxima, este Pokémon a engole por inteiro.", "O corpo de Tentacool é composto por muita água. Se for removido do mar, acaba ressecado e murcho. Se este Pokémon acabar desidratado, coloque-o de volta no mar.", "Tentacruel tem grandes esferas vermelhas em sua cabeça que brilham antes de lançar uma explosão ultrassônica. A explosão deste Pokémon causa ondas fortes ao seu redor.", "Quanto mais longa for a vida de Geodude, maior será o desgaste nas suas extremidades, deixando este Pokémon mais arredondado. Entretanto, seu coração continuará duro, rochoso e áspero.", "Graveler cresce comendo pedras. Aparentemente prefere comer as pedras que estão cobertas de musgo. Este Pokémon come toneladas de pedras diariamente.", "Golem vive em montanhas. Se tiver um grande terremoto, estes Pokémon rolarão em massa para descer para o pé da montanha.", "Ponyta é um Pokémon muito fraco quando nasce, mal pode se levantar. Fortalece-se ao tropeçar e cair tentando seguir seus pais.", "Rapidash são vistos geralmente galopando por campos e planícies. Entretanto, quando este Pokémon fica sério, sua crina flameja e queima enquanto galopa a 240 km/h.", "Slowpoke usa sua cauda para pegar presas ao mergulhá-la em um rio. Entretanto, este Pokémon frequentemente esquece o que está fazendo e passa dias inteiros fazendo nada na beira da água.", "A cauda de Slowbro tem um Shellder grudado nela com uma mordida. Como resultado, a cauda não pode ser mais usada para pesca, o que faz Slowbro nadar com relutância para pegar presas.", "Magnemite se conecta às linhas de tensão para alimentar-se de eletricidade. Se faltar energia na sua casa, cheque seu disjuntor. Você pode encontrar um alto número destes Pokémon grudados à caixa do disjuntor.",
"Magneton emite uma força magnética poderosa que é fatal aos dispositivos mecânicos. Por isso, as cidades grandes ligam suas sirenes para alertar aos cidadãos do aparecimento em massa deste Pokémon.", "Farfetch'd é sempre visto com um caule de alguma planta. Parece que há caules bons e ruins. Este Pokémon é conhecido por lutar contra outros pelos caules.", "As duas cabeças de Doduo nunca dormem ao mesmo tempo. Elas sempre revezam para que uma possa ficar de vigia enquanto a outra dorme.", "Se as três cabeças de Dodrio estiverem olhando para lados diferentes, é sinal de que está de vigia. Se este Pokémon estiver de vigia, não chegue perto dele, pois poderá ser bicado.", "Seel caça suas presas no oceano gelado debaixo das camadas de gelo. Quando precisa respirar, abre um buraco no gelo com a protuberância afiada de sua cabeça.", "Dewgong ama cochilar sobre gelo. Há muito tempo um marinheiro viu este Pokémon dormindo sobre uma geleira e pensou que fosse uma sereia.", "O corpo de lodo e elástico de Grimer pode passar por qualquer fresta, por menor que seja. Este Pokémon entra em canos de esgoto para beber a água suja.", "Um fluido nojento com um cheiro horrível emana do corpo de Muk. Uma só gota do fluido corporal deste Pokémon pode apodrecer uma piscina inteira.", "À noite, este Pokémon usa sua língua para cavar um buraco no fundo do mar para dormir. Shellder fecha sua concha enquanto dorme, mas deixa sua língua para fora.", "Cloyster é capaz de nadar no mar ingerindo água pela boca e a expelindo para trás. Este Pokémon atira espinhos de sua concha com o mesmo método.", "Gastly é constituído em grande parte de matéria gasosa. Seu corpo gasoso reduz rapidamente quando é exposto a ventos fortes. Grupos deste Pokémon se aglomeram debaixo das beiras das casas para escapar dos ventos.", "Haunter é um Pokémon perigoso. Se acenar para você enquanto flutua no escuro, nunca chegue perto. Este Pokémon tentará lambê-lo para se apossar de sua vida.", "Às vezes, em uma noite escura, sua sombra projetada pela luz da rua irá dominar você de repente. É na verdade Gengar fingindo ser sua sombra.", "Onix tem um ímã no seu cérebro que age como um compasso para que não se perca enquanto está andando por túneis. Seu corpo se torna mais redondo e mais liso ao envelhecer.", "Se seu nariz começar a coçar enquanto dorme, é sinal de que um destes Pokémon está no seu travesseiro tentando comer seu sonho pelas suas narinas.",
"Hypno segura um pêndulo na sua mão, cujo movimento e brilho deixam o oponente em um estado hipnótico profundo. Enquanto este Pokémon procura por presas, pule o pêndulo.", "Krabby vivem em praias, enterrados em buracos na areia. Em praias quase sem comida, estes Pokémon podem ser vistos brigando uns com os outros por território.",  "Kingler tem uma pinça enorme que agita no ar para se comunicar com outros. Entretanto, por sua pinça ser muito pesada, o Pokémon se cansa rapidamente.", "Voltorb foi visto primeiro em uma empresa que fabrica Poké Bolas. A conexão entre a primeira vez em que foi visto e o fato de se parecer com uma Poké Bola ainda é um mistério.", "Electrode come eletricidade da atmosfera. Em dias em que raios caem, você pode ver este Pokémon explodindo por todo canto de tanto comer eletricidade.", "Este Pokémon consiste de seis ovos que formam um aglomerado coeso. Os seis ovos se atraem e giram. Quando rachaduras aparecem nos ovos, é sinal de que está perto de evoluir.", "Exeggutor veio originalmente dos trópicos. Suas cabeças crescem com sua exposição ao sol quente. Dizem que quando suas cabeças caem, se juntam para formar Exeggcute.", "Cubone se lamenta pela mãe que não verá de novo. A lua cheia lembra este Pokémon de sua mãe, o que o faz chorar. As manchas na sua caveira são causadas por suas lágrimas.", "Marowak é a forma evoluída de um Cubone. É mais forte por ter superado a tristeza de perder sua mãe. O temperamento forte e decidido deste Pokémon não é fácil de mudar.", "As pernas de Hitmonlee se contraem e se alongam livremente. Usa suas pernas elásticas para dominar seus oponentes com chutes devastadores. Após a batalha, massageia suas pernas para vencer o cansaço.", "Dizem que Hitmonchan possui o espírito de um boxeador que treinava para um campeonato mundial. Tem um espírito indomável e nunca irá amarelar diante de adversidades.", "Sempre que Lickitung acha alguma coisa nova, irá, sem dúvidas, lambê-la. Faz isto para memorizar as coisas por sua textura e gosto. Não gosta de coisas azedas.", "Se Koffing se agita, levanta a toxicidade de seus gases internos e os jorra pelo seu corpo inteiro. Pode inflar seu corpo demais e explodir.", "Weezing ama os gases que emanam de comidas estragadas. Este Pokémon achará uma casa suja e a fará sua casa. À noite, quando as pessoas da casa dormem, irá se esbaldar no lixo.",
"Rhyhorn corre em linha reta esmagando tudo pelo seu caminho. Não se incomoda quando dá de cabeça com um bloco de aço. Entretanto, pode sentir um pouco de dor no dia seguinte pela batida.", "O chifre de Rhydon pode esmagar até mesmo diamantes. Uma só pancada de seu rabo pode derrubar um prédio. Sua pele é tão dura que nem mesmo canhões podem arranhá-la.",  "Chansey põe ovos muito nutritivos diariamente. Os ovos são tão gostosos que são facilmente devorados até mesmo por pessoas sem apetite.", "Os cipós de Tangela quebram facilmente se são agarrados. Isto não causa dor a este Pokémon, o que permite que fuja rapidamente. Os cipós perdidos são substituídos por novos cipós no dia seguinte.", "Se encontrar alguma cria de Kangaskhan brincando sozinha, não é aconselhável que chegue perto ou tente pegá-la. A mãe com certeza estará por perto e ficará violentamente furiosa com você.", "Horsea come insetos pequenos e os musgo de pedras. Se a correnteza do mar mudar rapidamente, irá se ancorar enrolando sua cauda em pedras ou corais para não ser arrastado para longe.", "Seadra dorme após abrir espaço entre as ramas dos corais. Os pescadores de corais são espetados pelos espinhos venenosos deste Pokémon quando não percebem sua presença.", "Goldeen é um Pokémon muito bonito com nadadeiras que crescem elegantemente na água. Entretanto, não baixe sua guarda perto deste Pokémon, pois pode atacar você com seu chifre.", "No outono, Seaking machos podem ser vistos performando danças de acasalamento nos leitos de rios para atrair as fêmeas. A cor de seu corpo fica mais bonita nessa estação.", "Staryu tem um órgão central, conhecido como núcleo, que brilha com uma luz vermelha. Se você for para a praia no final do verão, os núcleos destes Pokémon brilham como as estrelas no céu.", "A parte central de Starmie, seu núcleo, brilha fortemente em sete cores. Por causa de sua natureza brilhante, este Pokémon foi apelidado de “joia do mar”.", "Mr. Mime é um mestre em pantomima. Seus gestos e movimentos convencem os espectadores de que algo invisível realmente existe. Uma vez que os espectadores acreditam, aquilo que era invisível se torna palpável.", "Scyther é incrivelmente rápido. Sua velocidade intensa reforça a eficácia do par de foices em seus antebraços. Suas foices são tão efetivas que podem cortar troncos maciços em um só gesto.",
"Jynx anda ritmicamente movimentando seus quadris como se estivesse dançando. Seus movimentos são tão fascinantes que pessoas que os veem são levadas a balançar seus quadris sem pensar no que estão fazendo.", "Quando há uma tempestade, grupos deste Pokémon competem entre si para escalar prédios que possivelmente serão atingidos por raios. Algumas cidades usam Electabuzz como para-raios.", "Magmar expele chamas violentas por seu corpo durante uma batalha para intimidar seu oponente. Suas explosões ardentes criam ondas quentes que queimam gramas e árvores ao seu redor.", "Pinsir é surpreendentemente forte. Pode agarrar um oponente que pesa o dobro com seus chifres e levantá-lo facilmente. Os movimentos deste Pokémon ficam lentos em lugares frios.", "Não se satisfaz a não ser que esteja sempre causando alvoroço. Se não há um oponente para Tauros batalhar, atacará árvores grandes e as derrubará para se acalmar.", "Magikarp é um triste exemplo de um Pokémon que só consegue pular e salpicar água. Esta conduta levou os cientistas a estudar este Pokémon.", "Quando Magikarp evolui para Gyarados, suas células cerebrais sofrem uma alteração estrutural. Dizem que esta alteração é a culpada por este Pokémon ser violento por natureza.", "Humanos quase levaram Lapras à extinção. Dizem que à tardinha este Pokémon canta melancolicamente procurando pelos outros que restaram da sua espécie.", "Ditto reorganiza sua estrutura celular para mudar de forma. Entretanto, se tenta se transformar em algo se guiando somente por sua memória, acaba errando nos detalhes.", "A configuração genética instável de Eevee permite que mude de acordo com o ambiente em que vive. A radiação de várias pedras faz este Pokémon evoluir.", "Vaporeon sofreu uma mutação repentina e cresceu brânquias e barbatanas que permitem que viva na água. Este Pokémon tem a habilidade de controlar água.", "As células de Jolteon geram um nível baixo de eletricidade. Este poder é amplificado pela eletricidade estática do seu pelo, permitindo que solte relâmpagos. Seu pelo é feito de agulhas carregadas de eletricidade.", "O pelo macio de Flareon tem um propósito funcional de liberar calor no ar para que seu corpo não superaqueça. A temperatura corporal deste Pokémon pode atingir um máximo de 900 °C.", "Porygon é capaz de reverter completamente os dados do seu programa e entrar no espaço cibernético. Este Pokémon é protegido contra cópia, então não pode ser duplicado.",
"Omanyte é um dos Pokémon anciões que foi extinto há muito tempo e que foi regenerado a partir de fósseis por humanos. Se for atacado por um oponente, entra em sua concha dura.", "Omastar usa seus tentáculos para capturar suas presas. Acredita-se que entrou em extinção porque sua concha cresceu pesada demais, fazendo com que seus movimentos ficassem muito devagar e difíceis.", "Kabuto é um Pokémon regenerado de um fóssil, porém, em raras ocasiões, foram encontrados casos de exemplares vivos. Este Pokémon não mudou nada em 300 milhões de anos.", "Há muito tempo Kabutops nadava debaixo d’água para caçar suas presas. Parece que estava evoluindo da vida marinha para a terrestre, como é evidente pelas mudanças em suas brânquias e pernas.", "A origem de Aerodactyl data da era dos dinossauros. Foi regenerado do material genético extraído de âmbar. Supõe-se que tenha sido considerado o rei dos céus em tempos antigos.", "Um dia normal da vida de Snorlax consiste em comer e dormir. É um Pokémon tão dócil que é fácil de ver crianças brincando em cima da sua barriga enorme.", "Articuno é um Pokémon pássaro lendário que pode controlar gelo. O bater de suas asas esfria o ar. Dizem que começa a nevar quando este Pokémon voa.", "Zapdos é um Pokémon pássaro lendário que tem a habilidade de controlar eletricidade. Vive em nuvens carregadas de eletricidade e ganha poder se for atingido por raios.", "Moltres é um Pokémon pássaro lendário capaz de controlar fogo. Dizem que caso se machuque, mergulha seu corpo no magma de um vulcão para arder e se curar.", "Dratini muda e se desfaz de sua pele velha continuamente, porque a energia vital de seu corpo não para de alcançar níveis incontroláveis.", "Dragonair acumula uma quantidade enorme de energia dentro de seu corpo. Dizem que altera o clima da área em que está descarregando energia através dos cristais no seu pescoço e cauda.", "Dragonite é capaz de dar a volta no mundo em apenas 16 horas. Tem um coração bondoso e guia para terra barcos perdidos durante tempestades.", "Mewtwo é um Pokémon que foi criado por manipulação genética. Entretanto, apesar do poder científico dos humanos ter criado seu corpo, eles falharam em dar a Mewtwo um coração sensível.", "Dizem que Mew possui a composição genética de todos os Pokémon. É capaz de ficar invisível quando quer para passar desapercebido quando alguém se aproxima."];

meunvl = 5;
do{
    ininvl = Math.ceil(Math.random()*meunvl+3);
}while(ininvl<meunvl-2);
var meuxp = 0;
var maxxp = 100*(meunvl-5)*2;

click = 0;

ctx.imageSmoothingEnabled = false

//teclas pressionadas
addEventListener("keyup", function(){
    if(event.keyCode === 39 || event.keyCode === 68)
    {
        right();   
    }
    if(event.keyCode === 37 || event.keyCode === 65)
    {
        left();
    }
    if(event.keyCode === 38 || event.keyCode === 87)
    {
        up();
    }
    if(event.keyCode === 40 || event.keyCode === 83)
    {
        down();
    }

    if(event.keyCode === 13)
    {
        enter();
    }
    if(event.keyCode === 8)
    {
        backspace();
    }
});

//funçoes de items
function pokeball(){
    if(!use){
        bmessage = "você usou a Pokebola";
        item=true;
        if(!iwait){
            do{
                inimigoatk = Math.floor(Math.random()*4);
            }while(moves[inimigoatual][inimigoatk]==0);
        }
        battlemode = 2;
        bag[bagovs][1]-=1;
        mspeed += 10000;
    }else{
        if(Math.random()>0.8*inivida/maxinivida){
            k=0;
            while(meuspokes[k][0]!=0 && k<=5){
                k++;
            }
            if(k<=5){
                meuspokes[k][0]=inimigoatual;
                meuspokes[k][1]=inivida;
                meuspokes[k][2]=iestado;
                meuspokes[k][3]=ininvl;
                meuspokes[k][4]=0;
                bmessage = "Capturou "+pokes[inimigoatual];
                captura = true;
                win();
            }else{
                pokeoverlay = true;
                bmessage = "Capturou! Escolha um pokémon para substituir!";
            }
        }else{
            bmessage = "Não conseguiu capturar "+pokes[inimigoatual];
        }
        use = false;
    }
}
function potion(){
    if(!use){
        if(usaritem==0){
            bagoverlay=false;
            pokeoverlay=true;
            amessage = "Escolha um pokémon para usar";
            usaritem=1;
        }else if(usaritem==2){
            if(meuspokes[pos][1]<(((50+2*Statusg[meuspokes[pos][0]][0])*meuspokes[pos][3]/100)+10+meuspokes[pos][3])){
                bag[bagovs][1]-=1;
                mspeed += 10000;
                bmessage = "você usou Poção";
                item = true;
                if(!iwait){
                    do{
                        inimigoatk = Math.floor(Math.random()*4);
                    }while(moves[inimigoatual][inimigoatk]==0);
                }
                battlemode = 2;
            }else{
                amessage="Você não pode usar isto agora!";
                usaritem=0;
                pokeoverlay=false;
                bagoverlay=true;
            }
        }
    }else{
        Cura(20);
        usaritem=0;
        use = false;
    }
}
function thunderstone(){
    if(usaritem==0){
        bagoverlay=false;
        pokeoverlay=true;
        amessage = "Escolha um pokémon para usar";
        usaritem=1;
    }else if(usaritem==2){
        if(lvs[meuspokes[pos][0]]==-2){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra Trovão";
            meuspokes[pos][0]++;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else if(meuspokes[pos][0]==133){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra Trovão";
            meuspokes[pos][0]=135;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else{
            amessage="Você não pode usar isto agora!";
            usaritem=0;
            pokeoverlay=false;
            bagoverlay=true;
        }
    }
}
function moonstone(){
    if(usaritem==0){
        bagoverlay=false;
        pokeoverlay=true;
        amessage = "Escolha um pokémon para usar";
        usaritem=1;
    }else if(usaritem==2){
        if(lvs[meuspokes[pos][0]]==-3){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra da Lua";
            meuspokes[pos][0]++;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else{
            amessage="Você não pode usar isto agora!";
            usaritem=0;
            pokeoverlay=false;
            bagoverlay=true;
        }
    }
}
function leafstone(){
    if(usaritem==0){
        bagoverlay=false;
        pokeoverlay=true;
        amessage = "Escolha um pokémon para usar";
        usaritem=1;
    }else if(usaritem==2){
        if(lvs[meuspokes[pos][0]]==-5){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra da Folha";
            meuspokes[pos][0]++;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else{
            amessage="Você não pode usar isto agora!";
            usaritem=0;
            pokeoverlay=false;
            bagoverlay=true;
        }
    }
}
function firestone(){
    if(usaritem==0){
        bagoverlay=false;
        pokeoverlay=true;
        amessage = "Escolha um pokémon para usar";
        usaritem=1;
    }else if(usaritem==2){
        if(lvs[meuspokes[pos][0]]==-4){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra do Fogo";
            meuspokes[pos][0]++;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else if(meuspokes[pos][0]==133){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra do Fogo";
            meuspokes[pos][0]=136;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else{
            amessage="Você não pode usar isto agora!";
            usaritem=0;
            pokeoverlay=false;
            bagoverlay=true;
        }
    }
}
function waterstone(){
    if(usaritem==0){
        bagoverlay=false;
        pokeoverlay=true;
        amessage = "Escolha um pokémon para usar";
        usaritem=1;
    }else if(usaritem==2){
        if(lvs[meuspokes[pos][0]]==-6){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra da Água";
            meuspokes[pos][0]++;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else if(meuspokes[pos][0]==133){
            bag[bagovs][1]-=1;
            amessage = "Você usou Pedra da Água";
            meuspokes[pos][0]=134;
            pokeatual=meuspokes[0][0];
            usaritem=0;
            pokeoverlay=false;
        }else{
            amessage="Você não pode usar isto agora!";
            usaritem=0;
            pokeoverlay=false;
            bagoverlay=true;
        }
    }
}
function rarecandy(){
    if(usaritem==0){
        bagoverlay=false;
        pokeoverlay=true;
        amessage = "Escolha um pokémon para usar";
        usaritem=1;
    }else if(usaritem==2){
        bag[bagovs][1]-=1;
        mspeed += 10000;
        bmessage = "você usou Doce Raro";
        meuspokes[pos][3]++;
        if(lvs[meuspokes[pos][0]]!=-1 && lvs[meuspokes[pos][0]]<=meuspokes[pos][3]){
            meuspokes[pos][0]++;
        }
        meunvl=meuspokes[0][3];
        pokeatual=meuspokes[0][0];
        usaritem=0;
    }
}
function revive(){
    if(!use){
        if(usaritem==0){
            bagoverlay=false;
            pokeoverlay=true;
            amessage = "Escolha um pokémon para usar";
            usaritem=1;
        }else if(usaritem==2){
            if(meuspokes[pos][1]<=0){
                bag[bagovs][1]-=1;
                mspeed += 10000;
                bmessage = "você usou Revive";
                item = true;
                if(!iwait){
                    do{
                        inimigoatk = Math.floor(Math.random()*4);
                    }while(moves[inimigoatual][inimigoatk]==0);
                }
                battlemode = 2;
            }else{
                amessage="Você não pode usar isto agora!";
                usaritem=0;
                pokeoverlay=false;
                bagoverlay=true;
            }
        }
    }else{
        Cura((((50+2*Statusg[meuspokes[pos][0]][0])*meuspokes[pos][3]/100)+10+meuspokes[pos][3])/2);
        usaritem=0;
        use = false;
    }
}
function maxrevive(){
    if(!use){
        if(usaritem==0){
            bagoverlay=false;
            pokeoverlay=true;
            amessage = "Escolha um pokémon para usar";
            usaritem=1;
        }else if(usaritem==2){
            if(meuspokes[pos][1]<=0){
                bag[bagovs][1]-=1;
                mspeed += 10000;
                bmessage = "você usou Revive";
                item = true;
                if(!iwait){
                    do{
                        inimigoatk = Math.floor(Math.random()*4);
                    }while(moves[inimigoatual][inimigoatk]==0);
                }
                battlemode = 2;
            }else{
                amessage="Você não pode usar isto agora!";
                usaritem=0;
                pokeoverlay=false;
                bagoverlay=true;
            }
        }
    }else{
        Cura((((50+2*Statusg[meuspokes[pos][0]][0])*meuspokes[pos][3]/100)+10+meuspokes[pos][3]));
        usaritem=0;
        use = false;
    }
}
function spotion(){
    if(!use){
        if(usaritem==0){
            bagoverlay=false;
            pokeoverlay=true;
            amessage = "Escolha um pokémon para usar";
            usaritem=1;
        }else if(usaritem==2){
            if(meuspokes[pos][1]<(((50+2*Statusg[meuspokes[pos][0]][0])*meuspokes[pos][3]/100)+10+meuspokes[pos][3])){
                bag[bagovs][1]-=1;
                mspeed += 10000;
                bmessage = "você usou Super Poção";
                item = true;
                if(!iwait){
                    do{
                        inimigoatk = Math.floor(Math.random()*4);
                    }while(moves[inimigoatual][inimigoatk]==0);
                }
                battlemode = 2;
            }else{
                amessage="Você não pode usar isto agora!";
                usaritem=0;
                pokeoverlay=false;
                bagoverlay=true;
            }
        }
    }else{
        Cura(50);
        usaritem=0;
        use = false;
    }
}
function fullheal(){
    if(!use){
        if(usaritem==0){
            bagoverlay=false;
            pokeoverlay=true;
            amessage = "Escolha um pokémon para usar";
            usaritem=1;
        }else if(usaritem==2){
            if(meuspokes[pos][2]>0){
                bag[bagovs][1]-=1;
                mspeed += 10000;
                bmessage = "você usou CuraTudo";
                item = true;
                if(!iwait){
                    do{
                        inimigoatk = Math.floor(Math.random()*4);
                    }while(moves[inimigoatual][inimigoatk]==0);
                }
                battlemode = 2;
            }else{
                amessage="Você não pode usar isto agora!";
                usaritem=0;
                pokeoverlay=false;
                bagoverlay=true;
            }
        }
    }else{
        meuspokes[pos][2]=0;
        mestado=meuspokes[0][2];
        usaritem=0;
        use = false;
    }
}
function Cura(cura){
    bmessage = pokes[meuspokes[pos][0]]+" curou alguns pontos de vida!";
    meuspokes[pos][1] = meuspokes[pos][1]+cura;
    if(meuspokes[pos][1] > (((50+2*Statusg[meuspokes[pos][0]][0])*meuspokes[pos][3]/100)+10+meuspokes[pos][3])){
        meuspokes[pos][1] = (((50+2*Statusg[meuspokes[pos][0]][0])*meuspokes[pos][3]/100)+10+meuspokes[pos][3]);
    }
    vida=meuspokes[0][1];
}

//se apertar pra esquerda, executar
function left(){
    if(tela == 4){
        comp = comp-1;
        if(comp < 0){
            comp = bag.length-1;
        }
        cy=Math.floor(comp/8);
    }else{
    if(tela==1){
        if(!escolha){
            count-=2;
            choose--;
            if(count<1){
                choose=4;
                count = 7;
            }
        }else{
            yn--;
            if(yn<0){
                yn=1;
            }
        }
    }else if(tela==3){
        if(battlemode==0 && bagoverlay == false && choosedex==0){
            fob = fob+1;
            if(fob == 3)
            {
                fob = 1;
            }else if(fob == 5){
                fob = 3;
            }
        }else if(choosedex>0){
            if(choosedex==1){
                choosedex=2;
            }else{
                choosedex=1;
            }
        }else if(battlemode==1){
            if(xatk==1){
                xatk=0;
            }else{
                xatk=1;
            }
        }
    }}}

//se apertar pra direita, executar
function right(){
    if(tela == 4){
        comp = comp+1;
        if(comp > bag.length-1){
            comp = 0;
        }
        cy=Math.floor(comp/8);
    }
    if(tela==1){
        if(!escolha){
            count+=2;
            choose++;
            if(count>7){
                choose=1;
                count = 1;
            }
        }else{
            yn++;
            if(yn>1){
                yn=0;
            }
        }
    }else if(tela==3){
        if(battlemode==0 && bagoverlay == false && choosedex==0){
            fob = fob-1;
            if(fob == 0)
            {
                fob = 2;
            }else if(fob == 2){
                fob = 4;
            }
        }else if(choosedex>0){
            if(choosedex==1){
                choosedex=2;
            }else{
                choosedex=1;
            }
        }else if(battlemode==1){
            if(xatk==1){
                xatk=0;
            }else{
                xatk=1;
            }
        }
    }}


//se apertar pra cima, executar
function up(){
    if(bagoverlay == true)
    {
        bagovs = bagovs-1;
        if(bagovs < 0){
            bagovs = bag.length-1;
        }
    }else if(pokeoverlay == true)
    {
        if(pokeop==false){
            pokeovs = pokeovs-1;
            if(pokeovs < 0){
                k=0;
                while(meuspokes[k][0]!=0){
                    k++;
                }
                pokeovs = k-1;
            }
        }
    }else if(tela==3){
        if(battlemode==0 && bagoverlay == false && choosedex==0){
            if(fob == 1){
                fob = 3;
            }else if(fob == 3){
                fob = 1;
            }else if(fob == 2){
                fob = 4;
            }else if(fob == 4){
                fob = 2;
            }
        }else if(battlemode==1){
            if(yatk==1){
                yatk=0;
            }else{
                yatk=1;
            }
        }
    }
}

//se apertar pra baixo, executar
function down(){
    if(bagoverlay == true)
    {
        bagovs = bagovs+1;
        if(bagovs > bag.length-1){
            bagovs = 0;
        }
    }else if(pokeoverlay == true)
    {
        if(pokeop==false){
            pokeovs = pokeovs+1;
            k=0;
            while(meuspokes[k][0]!=0){
                k++;
            }
            if(pokeovs > k-1){
                pokeovs = 0;
            }
        }
    }else if(tela==3){
        if(battlemode==0 && bagoverlay == false && choosedex==0){
            if(fob == 1){
                fob = 3;
            }else if(fob == 3){
                fob = 1;
            }else if(fob == 2){
                fob = 4;
            }else if(fob == 4){
                fob = 2;
            }
        }else if(battlemode==1){
            if(yatk==1){
                yatk=0;
            }else{
                yatk=1;
            }
        }
    }
}
//se apertar enter, executar
function enter(){
    if(trans==0){
        if(music == 0){
            music+=1;
        }
        if(tela == 4){
            if(money >= bag[comp][2]){
                bag[comp][1]+=1;
                money = money-bag[comp][2];
            }
        }
        if(tela==1){
            if(!escolha){
                switch(choose){
                    case 1:
                        poke = "Bulbassaur?";
                        bulbasound.play();
                        break;
                    case 2:
                        poke = "Charmander?";
                        charsound.play();
                        break;
                    case 3:
                        poke = "Squirtle?";
                        squisound.play();
                        break;
                    case 4:
                        poke = "um Aleatório?"
                }
                message = "Tem certeza que deseja escolher "+poke;
                escolha = true;
            }else{
                if(yn==1){
                    message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
                    escolha = false;
                }else{
                    trans = 2;
                    if(choose == 1){
                        pokeatual = 1;
                    }else if(choose == 2){
                        pokeatual = 4;
                    }else if(choose == 3){
                        pokeatual = 7;
                    }else if(choose == 4){
                        pokeatual = Math.ceil(Math.random()*151);;
                    }
                    inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                    arenaescolher = Math.ceil(Math.random()*3);
                    maxvida = ((50+2*Statusg[pokeatual][0])*meunvl/100)+10+meunvl;
                    vida = maxvida
                    escolha = false;
                }
            }
        }else if(tela==2){
            trans = 3;
            maxinivida = ((50+2*Statusg[inimigoatual][0])*ininvl/100)+10+ininvl;;
            inivida = maxinivida;
            mseed = false;
            iniseed = false;
            iestado = 0;
            mconfuso = false;
            iconfuso = false; 
            mboost=[0,0,0,0,0];
            iboost=[0,0,0,0,0];
            mwrap = false;
            iwrap = false;
            iwait = false;
            mwait = false;
            fob=1;
            amessage = "O que o "+pokes[pokeatual]+" vai fazer?";
            meuspokes[0][0]=pokeatual;
            meuspokes[0][1]=vida;
            meuspokes[0][2]=mestado;
            meuspokes[0][3]=meunvl;
            meuspokes[0][4]=meuxp;
        }else if(tela==3){
            if(battlemode==0){
                //pokes: poke, vida, estado, nivel, xp;
                if(bagoverlay == true){
                    if(bag[bagovs][1] > 0){
                        bag[bagovs][0]();
                    }
                }else if(pokeoverlay == true){
                    amessage = "O que o "+pokes[pokeatual]+" vai fazer?";
                    if(usaritem==1){
                        pos = pokeovs;
                        usaritem=2;
                        pokeoverlay=false;
                        bagoverlay=true;
                        bag[bagovs][0]();
                    }else if(trade2==0){
                        if(pokeop == true && pokeopc == 0){
                            k=0;
                            while(meuspokes[k][0]!=0){
                                k++;
                            }
                            if(k>1){
                                trade1 = pokeovs;
                                trade2 = meuspokes[pokeovs];
                                pokeop = false;
                            }else{
                                amessage = "Você tem apenas um pokémon!";
                                pokeop = false;
                            }
                        }else if(meuspokes[pokeovs][1]>0){
                            pokeop = true;
                        }
                    }else{
                        if(trade1==0 && pokeovs!=trade1 || pokeovs==0 && pokeovs!=trade1){
                            if(meuspokes[trade1][1]>0 && meuspokes[pokeovs][1]>0 || trade1==0 && meuspokes[pokeovs][1]>0){
                                meuspokes[trade1]=meuspokes[pokeovs];
                                meuspokes[pokeovs] = trade2;
                                pokeatual=meuspokes[0][0];
                                vida=meuspokes[0][1];
                                mestado=meuspokes[0][2];
                                meunvl=meuspokes[0][3];
                                meuxp=meuspokes[0][4];
                                pokeoverlay = false;
                                maxvida = ((50+2*Statusg[pokeatual][0])*meunvl/100)+10+meunvl;
                                amessage = "Trocou para "+pokes[pokeatual];
                                click=2;
                                battlemode = 2;
                                mspeed=3000;
                            }else{
                                amessage = "Ele não pode mais lutar!";
                                pokeop=false;
                            }
                        }else{
                            amessage = "Não troque pelo mesmo pokémon!";
                            if(meuspokes[0][1]==0){
                                trade1 = pokeovs;
                                trade2 = meuspokes[pokeovs];
                                pokeop = false;
                            }
                        }
                        if(meuspokes[0][1]>0){
                            trade1=0;
                            trade2=0;
                        }
                    }
                }else{
                    amessage = "O que o "+pokes[pokeatual]+" vai fazer?";
                }
                if(fob == 2 && bagoverlay==false && usaritem==0){
                    bagoverlay = true;
                }
                if(fob==1){
                    battlemode=1;
                }
                if(fob==3 && pokeoverlay==false && battlemode==0){
                    meuspokes[0][0]=pokeatual;
                    meuspokes[0][1]=vida;
                    meuspokes[0][2]=mestado;
                    meuspokes[0][3]=meunvl;
                    meuspokes[0][4]=meuxp;
                    pokeoverlay=true;
                }
                if(choosedex==1){
                    pokedex = pokeatual;
                    lines = [""];
                }else if(choosedex==2){
                    pokedex = inimigoatual;
                    lines = [""];
                }
                if(fob==4 && choosedex==0){
                    amessage="Qual pokémon vamos ver a pokedex?"
                    choosedex=1;
                }
            }else if(battlemode==1){
                mspeed = ((50+2*Statusg[pokeatual][5]+5)*meunvl/100);
                ispeed = ((50+2*Statusg[inimigoatual][5]+5)*ininvl/100);
                if(mestado == 3){
                    mspeed-=500;
                }
                if(iestado == 3){
                    ispeed-=500;
                }
                if(xatk==0 && yatk==0 && moves[pokeatual][0] != 0){
                    meuatk = 0;
                    battlemode=2;
                }else if(xatk==1 && yatk==0 && moves[pokeatual][1] != 0){
                    meuatk = 1;
                    battlemode=2;
                }else if(xatk==0 && yatk==1 && moves[pokeatual][2] != 0){
                    meuatk = 2;
                    battlemode=2;
                }else if(xatk==1 && yatk==1 && moves[pokeatual][3] != 0){
                    meuatk = 3;
                    battlemode=2;
                }
                if(!iwait){
                    do{
                        inimigoatk = Math.floor(Math.random()*4);
                    }while(moves[inimigoatual][inimigoatk]==0);
                }
                if(moves[pokeatual][meuatk].name=="QuickAttack"){
                    mspeed+=1000;
                }
                if(moves[inimigoatual][inimigoatk].name=="QuickAttack"){
                    ispeed+=1000;
                }
                if(mspeed>ispeed){
                    bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][meuatk].name;
                }else{
                    bmessage = pokes[inimigoatual]+" usou "+moves[inimigoatual][inimigoatk].name;
                }
            }else if(battlemode==2){
                bagoverlay = false;
                click++;
                if(mspeed>ispeed){
                    if(click == 1){
                        if(item==false){
                            if(mestado == 5){
                                if(Math.random()>0.6){
                                    mestado = 0;
                                }
                            }
                            if(mestado == 2){
                                if(Math.random()>0.6){
                                    mestado = 0;
                                }
                            }
                            if(mestado != 5 && mestado != 2){
                                if(mestado == 3){
                                    a = Math.random();
                                }
                                if(a > .5){
                                    if(!mconfuso || mconfuso && Math.random()>0.66){
                                        if(xatk==0 && yatk==0){
                                            moves[pokeatual][0](0,maccuracy,iaccuracy);
                                        }else if(xatk==1 && yatk==0){
                                            moves[pokeatual][1](0,maccuracy,iaccuracy);
                                        }else if(xatk==0 && yatk==1){
                                            moves[pokeatual][2](0,maccuracy,iaccuracy);
                                        }else if(xatk==1 && yatk==1){
                                            moves[pokeatual][3](0,maccuracy,iaccuracy);
                                        }
                                        if(inivida<0){
                                            inivida=0;
                                        }
                                    }else{
                                        bmessage = pokes[pokeatual]+" se bateu por estar confuso!";
                                        vida-=5;
                                    }
                                    a = 1;
                                }else{
                                    bmessage = "Está paralizado!"
                                    a = 1;
                                }
                            }else{
                                bmessage = pokes[pokeatual]+" está impossibilitado de fazer isso";
                            }
                        }else{
                            use = true;
                            bag[bagovs][0]();
                            item = false;
                        }
                    }else if(click==2){
                        if(pokeoverlay==true && bmessage == "Capturou! Escolha um pokémon para substituir!"){
                            meuspokes[pokeovs][0]=inimigoatual;
                            meuspokes[pokeovs][1]=inivida;
                            meuspokes[pokeovs][2]=iestado;
                            meuspokes[pokeovs][3]=ininvl;
                            meuspokes[pokeovs][4]=0;
                            bmessage = "Capturou "+pokes[inimigoatual];
                            pokeatual=meuspokes[0][0];
                            vida=meuspokes[0][1];
                            mestado=meuspokes[0][2];
                            meunvl=meuspokes[0][3];
                            meuxp=meuspokes[0][4];
                            maxvida = ((50+2*Statusg[pokeatual][0])*meunvl/100)+10+meunvl;
                            captura = true;
                            pokeoverlay=false;
                            win();
                        }
                        gameover();
                        win();
                        if(inivida>0){
                            if(!flinch){
                                bmessage = pokes[inimigoatual]+" usou "+moves[inimigoatual][inimigoatk].name;
                            }else{
                                flinch = false;
                                click = 3;
                            }
                        }
                    }else if(click == 3){
                        if(iestado == 5){
                            if(Math.random()>0.6){
                                iestado = 0;
                            }
                        }
                        if(iestado == 2){
                            if(Math.random()>0.6){
                                iestado = 0;
                            }
                        }
                        if(iestado != 5 && iestado != 2){
                            if(irecharge == false){
                                if(iestado == 3){
                                    a = Math.random();
                                }
                                if(a > .5){
                                    if(!iconfuso || iconfuso && Math.random()>0.66){
                                        moves[inimigoatual][inimigoatk](1,iaccuracy,maccuracy);
                                        if(vida<0){
                                            vida=0;
                                        }
                                    }else{
                                        bmessage = pokes[inimigoatual]+" se bateu por estar confuso!";
                                        inivida-=5;
                                    }
                                        a = 1;
                                }else{
                                    bmessage = "Está paralizado!"
                                    a = 1;
                                }
                            }else{
                                bmessage = pokes[inimigoatual]+" está recarregando";
                                irecharge = false;
                            }
                        }else{
                            bmessage = pokes[inimigoatual]+" está impossibilitado de fazer isso";
                        }
                    }else if(click == 4){
                        if(vida > 0){
                        if(mseed == true){
                            vida-=maxvida/8;
                            inivida+=maxvida/8;
                        }
                        if(iniseed == true){
                            inivida-=maxinivida/8;
                            vida+=maxinivida/8;
                        }
                        if(mwrap == true){
                            vida-=maxvida/8;
                        }
                        if(iwrap == true){
                            inivida-=maxinivida/8;
                        }
                        if(mestado == 4){
                            vida-=maxvida/8;
                        }
                        if(iestado == 4){
                            inivida-=maxvida/8;
                        }
                        if(mestado == 1){
                            vida-=maxvida/16;
                        }
                        if(iestado == 1){
                            inivida-=maxvida/16;
                        }
                        bmessage = "Dano extra";
                        if(vida>maxvida){
                            vida=maxvida
                        }
                        if(inivida>maxinivida){
                            inivida=maxinivida
                        }
                    }
                    win();
                    }else if(click == 5){
                        gameover();
                        if(mrecharge == false){
                            if(!mwait){
                            click=0;
                            battlemode = 0;
                            }else{
                                click=0;
                                battlemode = 2;
                                bmessage = pokes[pokeatual]+" usou Dig!";
                            }
                        }else{
                            mrecharge = false;
                            click=1;
                            battlemode = 2;
                            bmessage = "Está recarregando";
                        }
                    }
                }else{
                    if(click == 1){
                        if(iestado == 5){
                            if(Math.random()>0.6){
                                iestado = 0;
                            }
                        }
                        if(iestado == 2){
                            if(Math.random()>0.6){
                                iestado = 0;
                            }
                        }
                        if(iestado != 5 && iestado != 2){
                            if(irecharge == false){
                                if(iestado == 3){
                                    a = Math.random();
                                }
                                if(a > .5){
                                    if(!iconfuso || iconfuso && Math.random()>0.66){
                                        moves[inimigoatual][inimigoatk](1,iaccuracy,maccuracy);
                                        if(vida<0){
                                            vida=0;
                                        }
                                    }else{
                                        bmessage = pokes[inimigoatual]+" se bateu por estar confuso!";
                                        inivida-=5;
                                    }
                                        a = 1;
                                }else{
                                    bmessage = "Está paralizado!"
                                    a = 1;
                                }
                            }else{
                                bmessage = pokes[inimigoatual]+" está recarregando";
                                irecharge = false;
                            }
                        }else{
                            bmessage = pokes[inimigoatual]+" está impossibilitado de fazer isso";
                        }
                    }else if(click==2){
                        gameover();
                        if(!mflinch){
                            bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][meuatk].name;
                        }else{
                            click = 3;
                            mflinch = false;
                        }
                    }else if(click == 3){
                        if(mestado == 5){
                            if(Math.random()>0.6){
                                mestado = 0;
                            }
                        }
                        if(mestado == 2){
                            if(Math.random()>0.6){
                                mestado = 0;
                            }
                        }
                        if(mestado != 5 && mestado != 2){
                            if(mestado == 3){
                                a = Math.random();
                            }
                            if(a > .5){
                                if(!mconfuso || mconfuso && Math.random()>0.66){
                                    if(xatk==0 && yatk==0){
                                        moves[pokeatual][0](0,maccuracy,iaccuracy);
                                    }else if(xatk==1 && yatk==0){
                                        moves[pokeatual][1](0,maccuracy,iaccuracy);
                                    }else if(xatk==0 && yatk==1){
                                        moves[pokeatual][2](0,maccuracy,iaccuracy);
                                    }else if(xatk==1 && yatk==1){
                                        moves[pokeatual][3](0,maccuracy,iaccuracy);
                                    }
                                    if(inivida<0){
                                        inivida=0;
                                    }
                                }else{
                                    bmessage = pokes[pokeatual]+" se bateu por estar confuso!";
                                    vida-=5;
                                }
                                a = 1;
                            }else{
                                bmessage = "Está paralizado!"
                                a = 1;
                            }
                        }else{
                            bmessage = pokes[pokeatual]+" está impossibilitado de fazer isso";
                        }
                        win();
                    }else if(click == 4){
                        if(vida > 0){
                        if(mseed == true){
                            vida-=maxvida/8;
                            inivida+=maxvida/8;
                        }
                        if(iniseed == true){
                            inivida-=maxinivida/8;
                            vida+=maxinivida/8;
                        }
                        if(mwrap == true){
                            vida-=maxvida/8;
                        }
                        if(iwrap == true){
                            inivida-=maxinivida/8;
                        }
                        if(mestado == 4){
                            vida-=maxvida/8;
                        }
                        if(iestado == 4){
                            inivida-=maxvida/8;
                        }
                        if(mestado == 1){
                            vida-=maxvida/16;
                        }
                        if(iestado == 1){
                            inivida-=maxvida/16;
                        }
                        bmessage = "Dano extra";
                        if(vida>maxvida){
                            vida=maxvida
                        }
                        if(inivida>maxinivida){
                            inivida=maxinivida
                        }
                    }
                    win();
                    }else if(click == 5){
                        gameover();
                        win();
                        if(mrecharge == false){
                            if(!mwait){
                            click=0;
                            battlemode = 0;
                            }else{
                                click=0;
                                battlemode = 2;
                                bmessage = pokes[pokeatual]+" usou Dig!";
                            }
                        }else{
                            mrecharge = false;
                            click=1;
                            battlemode = 2;
                            bmessage = "Está recarregando";
                        }
                    }
                }
            }
        }
    }
}
//se apertar backspace executar!
function backspace(){
    if(bagoverlay==true){
        amessage = "O que o "+pokes[pokeatual]+" vai fazer?";
    }
    if(tela == 2){trans = 4}else if(tela == 4){trans =2}
    if(tela == 3){bagoverlay = false}
    if(battlemode==1){
        battlemode=0;
    }
    if(pokeoverlay == true && amessage!="Escolha outro pokémon!" && meuspokes[0][1]>0){
        pokeoverlay=false;
        amessage = "O que o "+pokes[pokeatual]+" vai fazer?";
    }else if(pokeoverlay == true){
        amessage="Você tem que escolher um pokémon!";
    }
    if(pokedex>0){
        pokedex=0;
    }else if(choosedex>0){
        choosedex=0;
        amessage = "O que o "+pokes[pokeatual]+" vai fazer?";
    }
}
//se o seu pokemon morrer executar
function gameover(){
    if(vida<0){
        vida=0;
    }
    meuspokes[0][0]=pokeatual;
    meuspokes[0][1]=vida;
    meuspokes[0][2]=mestado;
    meuspokes[0][3]=meunvl;
    meuspokes[0][4]=meuxp;
    captura = false;
    if(vida <= 0){
        k=0;
        for(var i=0;i<meuspokes.length;i++){
            if(meuspokes[i][1]!=0){
                k++;
            }
        }
        if(k>0){
            mestado=0;
            meuspokes[0][0]=pokeatual;
            meuspokes[0][1]=vida;
            meuspokes[0][2]=mestado;
            meuspokes[0][3]=meunvl;
            meuspokes[0][4]=meuxp;
            battlemode=0;
            pokeoverlay=true;
            fob = 3;
            trade1 = 0;
            trade2 = meuspokes[0];
            amessage="Escolha outro pokémon!";
        }else{
            batalha = 0;
            money = 10;
            trans = 1;
            vida = maxvida
            ininvl = 5;
            meunvl = 5;
            message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
            bmessage = "";
            fob = 1; //fob = fight or bag
            mestado = 0;
            money = 10
            comp = 1
            for(var i=0;i<bag.length;i++){
                bag[i][1]=0;
            }
            bagoverlay = false;
            bagovs = 1;
            battlemode =0;
            mboost=[0,0,0,0,0];
            iboost=[0,0,0,0,0];
            mconfuso = true;
            meuxp = 0;
            maxxp = 100*((meunvl-5)*2);
        }
    }
}

//executa se vencer
function win(){
    if(inivida<=0 || captura){
        inimigoatual = Math.ceil(Math.random()*151);//151 para todos
        arenaescolher = Math.ceil(Math.random()*3);
        trans = 2;
        batalha++;
        money += 5*Math.floor(maxinivida/10);
        battlemode=0;
        bmessage = "";
        meuxp+=10*ininvl;
        do{
            ininvl = Math.ceil(Math.random()*(meunvl+2));
        }while(ininvl<meunvl-3);
        while(meuxp>=maxxp){
            meuxp=meuxp-maxxp;
            maxxp = 100*2;
            meunvl++;
        }
        maxxp = 100*(meunvl-5)*2;
        click=0;
        if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
            pokeatual++;
        }
        captura = false;
    }
}

//toca música ou sons
function playmusic(){
    if(!(tela == 3)){
        battlemusic.pause();
        battlemusic.currentTime = 0;}
        if(tela == 3){
        if(music == 1){
            battlemusic.play()
            battlemusic.volume = 1
            
        }}
        requestAnimationFrame(playmusic)
}

//desenha tudo na tela
function draw(){
    ctx.clearRect(0, 0, 800, 500);
    //Se for a tela 1 ele vai desenhar isso
    if(tela == 1){
        //desenhar fundo
        back.src = "Images/fundo/lab.png"
        ctx.drawImage(back, -90, -150, back.width*6, back.height*6);

        //desenhar titulo
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        chat.src = "Images/fundo/chat.png";
        ctx.drawImage(chat, 180, 15, 450, 45);
        ctx.fillText("Escolha o Pokémon inicial:", 400, 50);

        ctx.drawImage(chat, 345, 220, 110, 45);

        //desenhar mensagem
        ctx.font = "20px Arial";
        ctx.textAlign = "start";
        ctx.drawImage(chat, 2, 270, 720, 45);
        ctx.fillText(message, 50, 300);

        //sim ou não
        if(!escolha){
            if(choose<4){
                ctx.fillStyle = "rgb(184,241,112)";
                poke1.src = "Images/fundo/poke1.png";
                ctx.drawImage(poke1,50+(100*count), 100, 100, 100);
            }else{
                ctx.fillStyle = "rgb(184,241,112)";
                ctx.fillRect(345, 220, 110, 45);
            }
        }else{
            ctx.fillStyle = "rgb(184,241,112)";
            ctx.fillRect(45+(100*yn), 328, 50, 30);

            ctx.fillStyle = "black";
            ctx.fillText("Sim", 50, 350);
            ctx.fillText("Não", 150, 350);
        }
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Aleatório", 400, 250);

        poke2.src = "Images/fundo/poke2.png"

        //desenhar pokemons
        if(choose != 1 || escolha){ctx.drawImage(poke2, 150, 100, 100, 100);}
        img1.src = "Images/Sprites/1.png";
        ctx.drawImage(img1, 150, 100, 100, 100);
        if(choose != 2 || escolha){ctx.drawImage(poke2, 350, 100, 100, 100);}
        img2.src = "Images/Sprites/4.png";
        ctx.drawImage(img2, 350, 100, 100, 100);
        if(choose != 3 || escolha){ctx.drawImage(poke2, 550, 100, 100, 100);}
        img3.src = "Images/Sprites/7.png";
        ctx.drawImage(img3, 550, 100, 100, 100);
    }
    //Se for a tela 2 ele vai desenhar isso
    if(tela == 2){

        //desenhar versus
        versus.src = "Images/fundo/versus.png"
        ctx.drawImage(versus,0,0,800,500);
        
        //Desenha os pokemons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(350, 120);
        ctx.scale(-1, 1);
        ctx.drawImage(spr1, 0, 0, 350, 350);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        ctx.drawImage(spr2, 450, 120, 350, 350);

        //desenha a mensagem
        ctx.fillStyle = "black";
        ctx.textAlign = "start";
        ctx.font = "25px Arial";
        chat.src = "Images/fundo/chat.png";
        ctx.drawImage(chat, 17, 20, 500, 45);
        ctx.drawImage(chat, 17, 70, 530, 45);
        ctx.fillText("Aperte 'Enter' para começar a batalha!", 50, 50);
        ctx.fillText("Ou Aperte 'Backspace' para ir a lojinha!", 50, 100);
    }
    //Se for a tela 3 ele vai desenhar isso
    if(tela==3){
        arena.src = "Images/fundo/arena.png"
        arena2.src = "Images/fundo/arena2.png"
        arena3.src = "Images/fundo/arena3.png"

        if(arenaescolher == 1){
        ctx.drawImage(arena,0,0,800,350)}
        if(arenaescolher == 2){
            ctx.drawImage(arena2,0,0,800,350)}
            if(arenaescolher == 3){
                ctx.drawImage(arena3,0,0,800,350)}

        if(choosedex>0){
            ctx.fillStyle = "rgb(184,241,142,0.7)";
            ctx.fillRect(100+((choosedex-1)*400), 150,200,200);
        }
        //desenhar pokémons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(xplayer, 120);
        ctx.scale(-1, 1);
        if(!mwait)ctx.drawImage(spr1, 0, 50, 200, 200);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        if(!iwait)ctx.drawImage(spr2, xini, 160, 200, 200);

        //desenhar contagem
        backcount.src="Images/fundo/counter.png";
        ctx.drawImage(backcount, 335, -5, 130, 130);
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(batalha, 400, 40);

        //desenhar barras de vida
        ctx.drawImage(chat, 10, 15, 240, 60);
        ctx.drawImage(chat, 550, 15, 240, 60);
        ctx.textAlign = "start";
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(30, 20, 200, 15);
        ctx.fillRect(30, 55, 200, 10);
        ctx.fillText("Nvl: "+meunvl, 30, 50);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(30, 20, 200*vida/maxvida, 15);
        ctx.fillStyle = "rgb(68,196,250)";
        ctx.fillRect(30, 55, 200*meuxp/maxxp, 10);
        ctx.fillStyle = "black";
        ctx.fillRect(770, 20, -200, 15);
        ctx.fillText("Nvl: "+ininvl, 730, 50);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(770, 20, -200*inivida/maxinivida, 15);

        //Desenha Status:
        meuestado.src = "Images/icones/"+mestado+".png";
        ctx.drawImage(meuestado, 70, 35, 20, 20);
        iniestado.src = "Images/icones/"+iestado+".png";
        ctx.drawImage(iniestado, 710, 35, 20, 20);

        //desenha o chat em baixo da batalha
        ctx.drawImage(chat,0,350,800,150);
        if(battlemode==0){
            //desenha as opções de combate
            ctx.fillStyle = "rgb(184,241,142)";
            if(fob == 1){
                ctx.fillRect(515, 370,115,40);
            }
            if(fob == 2){
                ctx.fillRect(645, 370,105,40);
            }
            if(fob == 3){
                ctx.fillRect(515, 430,115,40);
            }
            if(fob == 4){
                ctx.fillRect(645, 430,105,40);
            }
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            ctx.fillText("Lutar", 520, 400);
            ctx.fillText("Mochila", 650, 400);
            ctx.fillText("Pokémon", 520, 460);
            ctx.fillText("Pokédex", 650, 460);

            //escreve a mensagem inicial
            ctx.fillStyle = "black";
            ctx.fillText(amessage, 80, 400);
        }else if(battlemode==1){
            //desenha os ataques
            ctx.fillStyle = "rgb(184,241,142)";
            ctx.fillRect(90+(200*xatk), 370+(50*yatk),180,40);

            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            if(moves[pokeatual][0]!=0){
                ctx.fillText(moves[pokeatual][0].name, 100, 400);
            }
            if(moves[pokeatual][1]!=0){
                ctx.fillText(moves[pokeatual][1].name, 300, 400);
            }
            if(moves[pokeatual][2]!=0){
                ctx.fillText(moves[pokeatual][2].name, 100, 450);
            }
            if(moves[pokeatual][3]!=0){
                ctx.fillText(moves[pokeatual][3].name, 300, 450);
            }

        }else if(battlemode==2){
            //desenha as mensagens do ataque
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            ctx.fillText(bmessage, 80, 400);
        }
        //desenha a mochila
        if(bagoverlay == true){
            ctx.drawImage(chat,580,30,250,460);
            ctx.fillStyle = "rgb(184,241,142)";
            if(bagovs<9){
                ctx.fillRect(600, 60+(bagovs*40),200,40);
            }else{
                ctx.fillRect(600, 420,200,40);
            }
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            for(var i=0;i<bag.length;i++){
                if(bagovs>9){
                    if(i<=9+(bagovs-9) && i>=(bagovs-9)){
                        ctx.fillText(bag[i][3]+": "+bag[i][1], 600, 90+((i-(bagovs-9))*40));
                    }
                }else{
                    if(i<=9){
                        ctx.fillText(bag[i][3]+": "+bag[i][1], 600, 90+(i*40));
                    }
                }
            }
        }
        //desenha os pokes capturados
        if(pokeoverlay==true){
            //pokes: poke, vida, estado, nivel, xp;
            ctx.drawImage(chat,500,-50,300,600);
            ctx.fillStyle = "rgb(184,241,142)";
            ctx.fillRect(520,2+(83*pokeovs),260,83);
            ctx.fillStyle = "rgb(0,148,255,.4)";
            ctx.fillRect(520,2,260,83);
            for(var i=0;i<meuspokes.length;i++){
                if(meuspokes[i][0]!=0){
                    image = new Image();
                    image.src = "Images/Sprites/"+meuspokes[i][0]+".png";
                    ctx.drawImage(image,510,2+(83*i),80,80);
                    ctx.fillStyle = "black";
                    ctx.textAlign = "start";
                    ctx.font = "15px Calibri";
                    ctx.fillText(pokes[meuspokes[i][0]]+"   Nvl: "+meuspokes[i][3], 580, 35+(83*i));
                    image = new Image();
                    image.src = "Images/icones/"+meuspokes[i][2]+".png";
                    ctx.drawImage(image, 730, 25+(83*i), 15, 15);
                    ctx.fillStyle = "black";
                    ctx.fillRect(580, 50+(83*i), 180, 15);
                    ctx.fillRect(580, 70+(83*i), 180, 10);
                    ctx.fillStyle = "rgb(77,188,88)";
                    ctx.fillRect(580, 50+(83*i), 180*meuspokes[i][1]/(((50+2*Statusg[meuspokes[i][0]][0])*meuspokes[i][3]/100)+10+meuspokes[i][3]), 15);
                    ctx.fillStyle = "rgb(68,196,250)";
                    ctx.fillRect(580, 70+(83*i), 200*meuspokes[i][4]/(100*((meuspokes[i][3]-5)*2)), 10);
                }
            }
            if(pokeop==true){
                ctx.drawImage(chat,580,300,250,150);
                ctx.fillStyle = "rgb(184,241,142)";
                ctx.fillRect(600, 310,200,40);
                ctx.fillStyle = "black";
                ctx.textAlign = "start";
                ctx.font = "25px Arial";
                ctx.fillText("Trocar", 600, 340);
            }
        }
        //desenhar pokedex
        if(pokedex>0){
            pokeback.src = "Images/fundo/pokedex.png";
            ctx.drawImage(pokeback,109,0,691,500);
            pokeimage.src = "Images/Sprites/"+pokedex+".png";
            ctx.drawImage(pokeimage,281,158,129,129);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "13px Arial";
            ctx.fillText((pokes[pokedex]).toUpperCase(), 109+165, 420);
            ctx.font = "bold 18px Arial";
            ctx.fillText("N: "+pokedex, 109+450, 433);
            if(lvs[pokedex]>0){
                ctx.fillText("Evo: "+lvs[pokedex], 109+555, 433);
            }else if(lvs[pokedex]<-1){
                ctx.fillText("Evo: Pedra", 109+555, 433);
            }else{
                ctx.fillText("Evo: Não", 109+555, 433);
            }
            if(tipos[pokedex].length>1){
                for(var i =0;i<2;i++){
                    pokeimage = new Image();
                    pokeimage.src = "Images/tipos/"+tipos[pokedex][i]+".png";
                    ctx.drawImage(pokeimage,209,164+(i*63),60,60);
                }
            }else{
                pokeimage = new Image();
                pokeimage.src = "Images/tipos/"+tipos[pokedex][0]+".png";
                ctx.drawImage(pokeimage,209,194,60,60);
            }
            palavras = pokedesc[pokedex].split(" ");
            l=0;
            lines[l]="";
            c=0;
            for(var i=0;i<palavras.length;i++){
                for(var g=0;g<palavras[i].length;g++){
                    if(c<24){
                        c++
                    }
                }
                if(c<24){
                    lines[l]+=palavras[i]+" ";
                }else{
                    i--;
                    c=0;
                    l++;
                    lines[l]="";
                }
            }
            for(var i=0;i<lines.length;i++){
                ctx.fillStyle = "rgb(72,0,255)";
                ctx.textAlign = "start";
                ctx.font = "16px brassMono";
                ctx.fillText(lines[i], 109+390, 170+(15*i));
            }
        }
        if(anim){
            if(mspeed>ispeed && click==1 || ispeed>mspeed && click==3){
                damagepng.src = "Images/fundo/damage.png";
                ctx.drawImage(damagepng,550,240,50,50);
                anim = false;
            }
            if(ispeed>mspeed && click==1 || mspeed>ispeed && click==3){
                damagepng.src = "Images/fundo/damage.png";
                ctx.drawImage(damagepng,200,240,50,50);
                anim = false;
            }
        }
    }
    if(tela == 4){
        mart.src = "Images/fundo/pokemart.png";
        ctx.clearRect(0,0,800,500);
        ctx.drawImage(mart,0,0,800,500);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect((100*(comp-(cy*8))), 100+(120*cy),100,100);
        ly=-1;
        for(var i=0;i<bag.length;i++){
            if(i%8==0){
                ly++;
            }
            console.log(100+(120*ly))
            image = new Image();
            image.src = bag[i][4];
            ctx.drawImage(image,0+((i-(ly*8))*100),100+(120*ly),100,100);
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            ctx.fillText(bag[i][2]+"$", 30+((i-(ly*8))*100), 220+(120*ly));
        }
        ctx.fillText("Dinheiro:"+money, 10, 25);
    }
    //transição
    if(trans>0){
        transy+=7;
        if(transy>=300){
            tela = trans;
            trans = 0;
        }
    }else if(trans==0 && transy>0){
        transy-=7;
    }
    if(transy<=280){
        transimg = new Image();
        transimg.src = "Images/fundo/transup.png";
        ctx.drawImage(transimg,0,-280+transy,800,500);
        transimg = new Image();
        transimg.src = "Images/fundo/transdown.png";
        ctx.drawImage(transimg,0,280-transy,800,500);
    }else{
        transimg = new Image();
        transimg.src = "Images/fundo/transup.png";
        ctx.drawImage(transimg,0,0,800,500);
        transimg = new Image();
        transimg.src = "Images/fundo/transdown.png";
        ctx.drawImage(transimg,0,0,800,500);
    }
    requestAnimationFrame(draw);
}

draw();
playmusic();
