'use strict'
let maincontentdiv = document.getElementById('maincontentdiv'); //main div
let loginusername = document.getElementById('loginusername');   //username value
let loginpin = document.getElementById('loginpin');  //user pin value
let table = document.getElementById('table'); //targetting table
let greeting = document.getElementById('greeting'); //greeting
let mainbalance = document.getElementById('mainbalance'); //current balance
let maindate = document.getElementById('maindate'); //current date
let maintime = document.getElementById('maintime'); //current time
let transferusername = document.getElementById('transferusername'); //username to transfer amount
let transferamount = document.getElementById('transferamount'); //amount to transfer
let transferbtn = document.getElementById('transferbtn'); //btn to transfer
let loanamount = document.getElementById('loanamount');
let loanbtn = document.getElementById('loanbtn');
let inamount = document.getElementById('inamount');
let outamount = document.getElementById('outamount');
let interestamount = document.getElementById('interestamount');
let closeusername = document.getElementById('closeusername');
let closepin = document.getElementById('closepin');
let closebtn = document.getElementById('closebtn');
let btnsort = document.getElementById('btnsort');
let timer = document.getElementById('timer');

let i, sr = 9, sum = 0, inn = 0, out = 0, gr = 9, a = [0];
let d = new Date();
let cc = new Date();

interestamount.innerHTML = 0; //intitial interest

maincontentdiv.style.display = "none";
const account1 = {
    owner: 'Nitin Garg',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    userName: 'ng'
};
const account2 = {
    owner: 'Abhay Sharma',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    userName: 'as',
};
function countdown() {
    let time = 20;
    let s = setInterval(() => {
        let min = String(Math.trunc(time / 60)).padStart(2, 0);
        let sec = String(Math.trunc(time % 60)).padStart(2, 0);
        timer.innerHTML = `${min}:${sec}`;

        if (time === 0) {
            clearTimeout(s);
            maincontentdiv.style.display = "none";
            greeting.innerHTML = "Login to get Started";
            for (i = 1; i < sr; i++) {
                table.deleteRow(-1);
            }
            inn = 0;
            out = 0;
            sum = 0;
            interestamount.innerHTML = 0;

            // for (i = 1; i < gr; i++) {
            //     table.deleteRow(-1);
            // }
            // inn = 0;
            // out = 0;
            // sum = 0;
        }
        time--;
    }, 1000);
}
function countdown2() {
    let time = 20;
    let n = setInterval(() => {
        let min = String(Math.trunc(time / 60)).padStart(2, 0);
        let sec = String(Math.trunc(time % 60)).padStart(2, 0);
        timer.innerHTML = `${min}:${sec}`;

        if (time === 0) {
            clearTimeout(n);
            maincontentdiv.style.display = "none";
            greeting.innerHTML = "Login to get Started";

            for (i = 1; i < gr; i++) {
                table.deleteRow(-1);
            }
            inn = 0;
            out = 0;
            sum = 0;
            interestamount.innerHTML = 0;
        }
        time--;
    }, 1000);
}

function logincheck() {
    //countdown();
    //condition to switch for user
    if (loginusername.value == account1.userName && loginpin.value == account1.pin) {

        //setting the greetings according to time
        if (d.getHours() >= 1 && d.getHours() <= 12)
            greeting.innerHTML = `Good Morning ${account1.owner}`;
        else if (d.getHours() >= 13 && d.getHours() <= 16)
            greeting.innerHTML = `Good Afternoon ${account1.owner}`;
        else if (d.getHours() >= 17 && d.getHours() <= 24)
            greeting.innerHTML = `Good Evening ${account1.owner}`;

        //calculating the main balance
        for (i = 0; i < account1.movements.length; i++) {
            sum = sum + account1.movements[i];
        }
        mainbalance.innerHTML = sum;

        //setting the date and hour
        maindate.innerHTML = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        maintime.innerHTML = `, ${d.getHours()}:${d.getMinutes()}`

        //Calculating the amount deposited
        for (i = 0; i < account1.movements.length; i++) {
            if (account1.movements[i] >= 0) {
                inn = inn + account1.movements[i]
            }
        }
        inamount.innerHTML = inn;

        //Calculating the amount withdrawl
        for (i = 0; i < account1.movements.length; i++) {
            if (account1.movements[i] < 0) {
                out = out + account1.movements[i]
            }
        }
        outamount.innerHTML = Math.abs(out);
        maincontentdiv.style.display = "block";

        //Inserting the previous transaction into the table
        for (i = 0; i < account1.movements.length; i++) {
            let row = table.insertRow(1);
            if (account1.movements[i] > 0) {
                row.insertCell(0).innerHTML = i + 1 + " Deposit";
                if (i < 8) {
                    row.insertCell(1).innerHTML = `${cc.getDate() - 1}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                }
                else {
                    row.insertCell(1).innerHTML = `${cc.getDate()}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                }

                row.insertCell(2).innerHTML = account1.movements[i];
            }
            else if (account1.movements[i] < 0) {
                row.insertCell(0).innerHTML = i + 1 + " Withdrawl";
                if (i < 8) {
                    row.insertCell(1).innerHTML = `${cc.getDate() - 1}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                }
                else {
                    row.insertCell(1).innerHTML = `${cc.getDate()}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                }
                row.insertCell(2).innerHTML = Math.abs(account1.movements[i]);
            }

        }

        //Transfering the amount to other bank acc
        transferbtn.addEventListener("click", (event) => {
            let g = new Date();
            if (transferusername.value == account2.userName) {
                let row = table.insertRow(1);
                row.insertCell(0).innerHTML = sr + " withdrawl";
                row.insertCell(1).innerHTML = `${cc.getDate()}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                row.insertCell(2).innerHTML = Math.abs(`${transferamount.value}`);
                sr++;

                //updating main balance
                mainbalance.innerHTML = Number(mainbalance.innerHTML) - transferamount.value;

                //Updating the date when transaction is done
                maindate.innerHTML = `${g.getDate()}/${g.getMonth() + 1}/${g.getFullYear()}`;
                maintime.innerHTML = `, ${g.getHours()}:${g.getMinutes()}`

                //Updating the withdrawl amount
                outamount.innerHTML = (Number(outamount.innerHTML) + Number(transferamount.value));

                account2.movements.push(Number(transferamount.value));
            }
        });

        //Getting the loan from the bank
        loanbtn.addEventListener("click", (event) => {
            let b = new Date();
            mainbalance.innerHTML = Number(mainbalance.innerHTML) + Number(loanamount.value)
            let row = table.insertRow(1);
            row.insertCell(0).innerHTML = sr + " deposit";
            row.insertCell(1).innerHTML = `${cc.getDate()}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
            row.insertCell(2).innerHTML = Math.abs(`${loanamount.value}`);
            sr++;

            //updating the amount deposited
            inamount.innerHTML = Number(inamount.innerHTML) + Number(loanamount.value);

            //updating the interest
            interestamount.innerHTML = Math.round(Number(interestamount.innerHTML) + ((Number(loanamount.value) * account1.interestRate) / 100));

            //updating the date & time when transaction is made
            maindate.innerHTML = `${b.getDate()}/${b.getMonth() + 1}/${b.getFullYear()}`;
            maintime.innerHTML = `, ${b.getHours()}:${b.getMinutes()}`
        });

        //for closing the account
        closebtn.addEventListener('click', (event) => {
            if (closeusername.value == account1.userName && closepin.value == account1.pin) {
                maincontentdiv.style.display = "none";
                loginpin.value = null;
                greeting.innerHTML = "Login to get started";
                for (i = 1; i < sr; i++) {
                    table.deleteRow(-1);
                }
                inn = 0;
                out = 0;
                sum = 0;
                interestamount.innerHTML = 0;
            }
        });
    }
    else if (loginusername.value == account2.userName && loginpin.value == account2.pin) {
        //countdown2();
        //setting the greetings according to time
        if (d.getHours() >= 1 && d.getHours() <= 12)
            greeting.innerHTML = `Good Morning ${account2.owner}`;
        else if (d.getHours() >= 13 && d.getHours() <= 16)
            greeting.innerHTML = `Good Afternoon ${account2.owner}`;
        else if (d.getHours() >= 17 && d.getHours() <= 24)
            greeting.innerHTML = `Good Evening ${account2.owner}`;

        //calculating the main balance
        for (i = 0; i < account2.movements.length; i++) {
            sum = sum + account2.movements[i];
        }
        mainbalance.innerHTML = sum;

        //setting the date and hour
        maindate.innerHTML = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        maintime.innerHTML = `, ${d.getHours()}:${d.getMinutes()}`

        //Calculating the amount deposited

        for (i = 0; i < account2.movements.length; i++) {
            if (account2.movements[i] >= 0) {
                inn = inn + account2.movements[i]
            }
        }
        inamount.innerHTML = Math.abs(inn);

        //Calculating the amount withdrawl
        for (i = 0; i < account2.movements.length; i++) {
            if (account2.movements[i] < 0) {
                out = out + account2.movements[i]
            }
        }
        outamount.innerHTML = Math.abs(out);
        maincontentdiv.style.display = "block";

        //Inserting the previous transaction into the table
        for (i = 0; i < account2.movements.length; i++) {
            let row = table.insertRow(1);
            if (account2.movements[i] > 0) {
                row.insertCell(0).innerHTML = i + 1 + " Deposit";
                row.insertCell(1).innerHTML = `${cc.getDate() - 1}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                row.insertCell(2).innerHTML = account2.movements[i];
            }
            else if (account2.movements[i] < 0) {
                row.insertCell(0).innerHTML = i + 1 + " Withdrawl";
                row.insertCell(1).innerHTML = `${cc.getDate() - 1}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                row.insertCell(2).innerHTML = Math.abs(account2.movements[i]);
            }
        }

        //Transfering the amount to other bank acc
        transferbtn.addEventListener("click", (event) => {
            let g = new Date();
            if (transferusername.value == account1.userName) {
                let row = table.insertRow(1);
                row.insertCell(0).innerHTML = gr + " withdrawl";
                row.insertCell(1).innerHTML = `${cc.getDate()}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
                row.insertCell(2).innerHTML = Math.abs(`${transferamount.value}`);
                gr++;
                mainbalance.innerHTML = Number(mainbalance.innerHTML) - transferamount.value;

                //Updating the date when transaction is done
                maindate.innerHTML = `${g.getDate()}/${g.getMonth() + 1}/${g.getFullYear()}`;
                maintime.innerHTML = `, ${g.getHours()}:${g.getMinutes()}`

                //Updating the withdrawl amount
                outamount.innerHTML = (Number(outamount.innerHTML) + Number(transferamount.value));

                account1.movements.push(Number(transferamount.value));
            }
        });

        //Getting the loan from the bank
        loanbtn.addEventListener("click", (event) => {
            let b = new Date();
            mainbalance.innerHTML = Number(mainbalance.innerHTML) + Number(loanamount.value)
            let row = table.insertRow(1);
            row.insertCell(0).innerHTML = gr + " deposit";
            row.insertCell(1).innerHTML = `${cc.getDate()}/${cc.getMonth() + 1}/${cc.getFullYear()}`;
            row.insertCell(2).innerHTML = Math.abs(`${loanamount.value}`);
            gr++;

            //updating the amount deposited
            inamount.innerHTML = Number(inamount.innerHTML) + Number(loanamount.value);

            //updating the interest
            interestamount.innerHTML = Math.round(Number(interestamount.innerHTML) + ((Number(loanamount.value) * account2.interestRate) / 100));

            //updating the date & time when transaction is made
            maindate.innerHTML = `${b.getDate()}/${b.getMonth() + 1}/${b.getFullYear()}`;
            maintime.innerHTML = `, ${b.getHours()}:${b.getMinutes()}`
        });

        //for closing the account
        closebtn.addEventListener('click', (event) => {
            if (closeusername.value == account2.userName && closepin.value == account2.pin) {
                maincontentdiv.style.display = "none";
                loginpin.value = null;
                greeting.innerHTML = "Login to get started";
                for (i = 1; i < gr; i++) {
                    table.deleteRow(-1);
                }
                inn = 0;
                out = 0;
                sum = 0;
            }
        });
    }
    else {
        alert("Please check your username or pin");
    }
}