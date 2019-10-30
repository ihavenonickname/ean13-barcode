var userInput = document.getElementById('user-input');
var binaryTable = document.getElementById('binary-table');
var displayBarcode = document.getElementById('display-barcode');
var result = document.getElementById('result');
var displayMultiplicationCalc = document.getElementById('display-multiplication-calc');
var displayMultiplicationRes = document.getElementById('display-multiplication-res');

var tables = {
    A: [
        '0001101',
        '0011001',
        '0010011',
        '0111101',
        '0100011',
        '0110001',
        '0101111',
        '0111011',
        '0110111',
        '0001011',
    ],
    B: [
        '0100111',
        '0110011',
        '0011011',
        '0100001',
        '0011101',
        '0111001',
        '0000101',
        '0010001',
        '0001001',
        '0010111',
    ],
    C: [
        '1110010',
        '1100110',
        '1101100',
        '1000010',
        '1011100',
        '1001110',
        '1010000',
        '1000100',
        '1001000',
        '1110100',
    ],
}


const sequences = [
    ['A', 'A', 'A', 'A', 'A', 'A', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'A', 'B', 'A', 'B', 'B', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'A', 'B', 'B', 'A', 'B', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'A', 'B', 'B', 'B', 'A', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'B', 'A', 'A', 'B', 'B', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'B', 'B', 'A', 'A', 'B', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'B', 'B', 'B', 'A', 'A', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'B', 'A', 'B', 'A', 'B', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'B', 'A', 'B', 'B', 'A', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['A', 'B', 'B', 'A', 'B', 'A', 'C', 'C', 'C', 'C', 'C', 'C'],
]

function generateDV(digits) {
    var sum = 0;

    for (var i = 0; i < digits.length; i++) {
        var x = digits[i];

        if (i % 2 === 0) {
            displayMultiplicationCalc.childNodes[i].textContent = `${x} × 1`;
        } else {
            displayMultiplicationCalc.childNodes[i].textContent = `${x} × 3`;
            x *= 3;
        }

        displayMultiplicationRes.childNodes[i].textContent = x;

        sum += x;
    }

    document.getElementById('display-sum').textContent = sum;
    document.getElementById('display-sum-2').textContent = sum;
    document.getElementById('display-int-part').textContent = Math.floor(sum / 10);
    document.getElementById('display-frac-part').textContent = (((sum / 10) % 1) * 10).toFixed(0)

    var dv = Math.floor(sum / 10);

    document.getElementById('display-int-part-2').textContent = dv;
    document.getElementById('display-sum-3').textContent = sum;
    dv = (dv + 1) * 10 - sum;
    document.getElementById('display-dv').textContent = dv;

    dv = dv % 10 === 0 ? 0 : dv
    document.getElementById('display-dv-2').textContent = dv;

    return dv % 10 === 0 ? 0 : dv;
}

userInput.addEventListener('input', function () {
    result.classList.add('is-hidden');

    var tbody = binaryTable.querySelector('tbody');

    while (displayBarcode.firstChild) {
        displayBarcode.removeChild(displayBarcode.firstChild);
    }

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if (!/\d{12}/.test(userInput.value)) {
        return;
    }

    var digits = userInput.value.split('').map(x => parseInt(x));
    var sequence = sequences[digits[0]]

    digits.push(generateDV(digits));

    for (var i = 1; i < digits.length; i++) {
        var table = sequence[i - 1];
        var bin = tables[table][digits[i]];

        for (var j = 0; j < bin.length; j++) {
            var div = document.createElement('div');

            if (bin[j] === '1') {
                div.classList.add('on');
            } else {
                div.classList.add('off');
            }

            displayBarcode.appendChild(div);
        }

        var tdDec = document.createElement('td');
        var tdBin = document.createElement('td');
        var tdTab = document.createElement('td');

        tdDec.appendChild(document.createTextNode(digits[i]));
        tdBin.appendChild(document.createTextNode(bin));
        tdTab.appendChild(document.createTextNode(table));

        tdDec.classList.add('has-text-centered');
        tdBin.classList.add('has-text-centered');
        tdBin.classList.add('is-family-monospace');
        tdTab.classList.add('has-text-centered');

        var tr = document.createElement('tr');

        tr.appendChild(tdDec);
        tr.appendChild(tdBin);
        tr.appendChild(tdTab);

        tbody.appendChild(tr);
    }

    result.classList.remove('is-hidden');
});

// 490250535576 9
