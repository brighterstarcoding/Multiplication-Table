 const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    const maxMulInput = document.getElementById('maxMul');
    const generateBtn = document.getElementById('generate');
    const clearBtn = document.getElementById('clear');
    const grid = document.getElementById('grid');
    const count = document.getElementById('count');

    function createColumn(base, maxMul){
      const col = document.createElement('div');
      col.className = 'column';
      const heading = document.createElement('h3');
      heading.textContent = `Base: ${base}`;
      col.appendChild(heading);

      for(let m = 1; m <= maxMul; m++){
        const cell = document.createElement('div');
        cell.className = 'cell';
        const expr = document.createElement('div');
        expr.className = 'expr';
        // user wanted 2x2 then 2x3 beneath — we include 1..max, but user can set start to 2
        expr.textContent = `${base} × ${m} =`;
        const val = document.createElement('div');
        val.className = 'value';
        val.textContent = (base * m);
        cell.appendChild(expr);
        cell.appendChild(val);
        col.appendChild(cell);
      }
      return col;
    }

    function generate(){
      grid.innerHTML = '';
      const start = parseInt(startInput.value, 10) || 1;
      const end = parseInt(endInput.value, 10) || start;
      const maxMul = parseInt(maxMulInput.value, 10) || 1;

      // basic validation + clamp to reasonable limits
      const S = Math.max(0, Math.min(500, start));
      const E = Math.max(S, Math.min(500, end));
      const M = Math.max(1, Math.min(500, maxMul));

      let cells = 0;
      for(let base = S; base <= E; base++){
        const col = createColumn(base, M);
        grid.appendChild(col);
        cells += M;
      }
      count.textContent = `${cells} cells`;
    }

    generateBtn.addEventListener('click', generate);
    clearBtn.addEventListener('click', ()=>{grid.innerHTML=''; count.textContent='0 cells'});

    // generate default on load
    generate();