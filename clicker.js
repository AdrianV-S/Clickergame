"use strict";

const workers = [
    {   
        lvlUpBtnRef: "companyLvlUpBtn",
        lvlRef: "companyLvl",
        lvl: 0,
        cost: 10,
        currency: "$$",
        tick: null,
        handler: (lvl) => {
            wallets[0].value += lvl > 2 ? lvl * 2 : lvl;
            updateBalanceUi();        
        },    
    },
    {   
        lvlUpBtnRef: "aliensLvlUpBtn",
        lvlRef: "aliensLvl",
        lvl: 0,
        cost: 5,
        currency: "nanos",
        tick: null,
        handler: (lvl) => {
            wallets[0].value += lvl > 2 ? lvl * 2.5 : lvl;
            updateBalanceUi();        
        },   
    },
]
//@todo worker wallets implementieren balance ersetzen!
const wallets = [
    {
        name: "$$",
        value: 0,
    },
    {
        name: "nanos",
        value: 0,
    },
]

function updateBalanceUi() {
    document.getElementById("balance").innerText = wallets[0].value;
}

function updateNanosUi() {
    document.getElementById("nanos").innerText = wallets[1].value;
}

document.getElementById("manualClickBtn").onclick = () => {
    wallets[0].value++;
    updateBalanceUi();
}

for(let worker of workers) {
    const currencyIndex = worker.currency === "$$" ? 0 : 1;
        document.getElementById(worker.lvlUpBtnRef).onclick = () => {
        if (wallets[currencyIndex].value >= worker.cost) {
            wallets[currencyIndex].value -= worker.cost;
            worker.lvl = worker.lvl+1;
            
            document.getElementById(worker.lvlRef).innerText = worker.lvl; 
            updateBalanceUi();
            updateNanosUi();

            clearInterval(worker.tick);
            worker.tick = setInterval(worker.handler.bind(null, worker.lvl), 1000);   
        }
    }
    
}

document.getElementById("nanosBtn").onclick = () => {
    if (wallets[0].value >= 5) {
        wallets[0].value -= 5;
        wallets[1].value++;

        updateBalanceUi();
        updateNanosUi();
    }
}
