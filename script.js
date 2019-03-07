const table = [];
let n;
let tbody;

function log(a, x) {
    return Math.log(x) / Math.log(a);
}

function has_hole(table, x, y, width, height) {
    for (let i = y; i < y + height; i++) {
        for (let j = x; j < x + width; j++) {
            if (table[i][j] != 0) return true;
        }
    }
    return false;
}

function tile(table, x, y, width, height) {
    let mid_x = x + (width / 2) - 1;
    let mid_y = y + (height / 2) - 1;
    for (let i = 0; i < 4; i++) {
        if (has_hole(table, x + ((width / 2) * (i % 2)), y + (width / 2 * Math.floor(i / 2)), width / 2, height / 2)) {
        } else {
            table[mid_y][mid_x] = 1;
            let hue = 360 / (log(2, width)) - 1;
            tbody.children[mid_y].children[mid_x].style.background = 'hsl(' + hue + ', 50%, 50%)';
        }
        mid_x += (-1) ** (i);
        mid_y += Math.floor(Math.sin(Math.PI * i / 2));
    }
    if (width == 2) return;
    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            (function(i) {
                setTimeout(() => {
                    tile(table, x + (Math.floor((width / 2) * (i % 2))), y + Math.floor((width / 2 * Math.floor(i / 2))), width / 2, height / 2);
                }, i*200);
            })(i);
            // tile(table, x + ((width / 2) * (i % 2)), y + (width / 2 * Math.floor(i / 2)), width / 2, height / 2);
            // setTimeout(() => {
            //     (function (index) {
            //         setTimeout(function () {
            //             alert(index);
            //         }, i * 1000);
            //     })(i);
            // }, 1000);
        }
    }, 1000);
}

function create_hole(event) {
    Array.from(document.querySelectorAll('td')).forEach((cell, index) => {
        if (event.target == cell) {
            table[Math.floor(index / n)][index % n] = 1;
            event.target.style.background = '#000000';
        } else {
            cell.removeEventListener('click', create_hole);
        }
    });
    setTimeout(() => {
        tile(table, 0, 0, n, n);
    }, 1000);
}

(function (d) {
    const n_input = d.querySelector('#n');
    const generate_button = d.querySelector('#generate');
    tbody = d.querySelector('tbody');
    generate_button.addEventListener('click', event => {
        n = parseInt(n_input.value);
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        for (let i = 0; i < n; i++) {
            let row = d.createElement('tr');
            table[i] = [];
            for (let j = 0; j < n; j++) {
                table[i][j] = 0;
                let cell = d.createElement('td');
                let h = innerHeight - generate.offsetHeight;
                let multiplier = (innerWidth < h ? innerWidth : h) - n - 16;
                let width_per_cell = multiplier / n;
                cell.style.width = width_per_cell + 'px';
                cell.style.height = width_per_cell + 'px';
                cell.addEventListener('click', create_hole);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    });
})(document);