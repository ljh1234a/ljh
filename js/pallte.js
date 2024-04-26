function changeColor() {
    let arrColor = [];
    
    this.init = function(target) {
        if (!target) {
            document.body.insertAdjacentHTML('afterbegin', '<input>');
        } else {
            let wrapper = document.getElementById(target);
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'baseline';

            let btnColor = document.createElement('button');
            btnColor.innerHTML = '배경색 변경';
            btnColor.style.marginLeft = '5px';
            btnColor.style.height = '30px';
            btnColor.style.alignSelf = 'flex-start';
            btnColor.onclick = changeBgColor;
            wrapper.insertAdjacentElement('afterbegin', btnColor);

            let btnReset = document.createElement('button');
            btnReset.innerHTML = '초기화';
            btnColor.style.marginLeft = '5px';
            btnColor.style.height = '30px';
            btnColor.style.alignSelf = 'flex-start';
            btnReset.onclick = resetColor;
            wrapper.insertAdjacentElement('beforeend', btnReset);

            

            let list = document.createElement('ul');
            list.style.margin = 20;
            list.style.padding = 10;
            list.style.alignSelf = 'flex-start';
            list.style.flex = 1;
            list.style.position = 'relative';
            list.style.textAlign = 'right';
            list.style.listStyle = 'none';
            
            wrapper.insertAdjacentElement('beforeend', list);

            selectColor(list);

            let inputColor = document.createElement('input');
            inputColor.type = 'color';
            wrapper.insertAdjacentElement('afterbegin', inputColor);
            inputColor.oninput = function() {
                arrColor.push(this.value);
                selectColor(list);
            }

            
            
        }
    }

            
            function selectColor(target) {
                target.innerHTML = '';
                    // for (let i = 0; i < arrColor.length; i++) {
                    //     arrColor.push(inputColor);
                    //     bgColor.style.backgroundColor = inputColor;
                    // }
                    // arrColor.push(inputColor.value);
                    
                    for (let i = 0; i < arrColor.length; i++) {
                    // let bgColor = document.getElementById('bgColor');
                    // let displayColor = document.getElementById('displayColor');
                    let bgColor = document.createElement('li');
                    let displayColor = document.createElement('div');
                    let btnDelete = document.createElement('button');

                    displayColor.style.width = '20px';
                    displayColor.style.height = '20px';
                    displayColor.style.marginTop = '10px';
                    displayColor.style.marginRight = '10px';
                    displayColor.style.backgroundColor = arrColor[i];
                    displayColor.style.display = 'inline-block';

                    btnDelete.innerText = '삭제';
                    btnDelete.style.margin = '5px';
                    btnDelete.onclick = function() {
                        deleteColor(i);
                        selectColor(target);
                    };

                    bgColor.innerText = arrColor[i] + '';
                    bgColor.insertAdjacentElement('afterbegin', displayColor);
                    bgColor.insertAdjacentElement('beforeend', btnDelete);
                    target.insertAdjacentElement('beforeend', bgColor);

                    console.log(arrColor);
                    }
                }

                function resetColor() {
                    arrColor = [];
                    document.body.style.backgroundColor = '#fff';
                }
                
  
                    // let btnDelete = document.createElement('button');
                    // btnDelete.innerHTML = '삭제';
                   
                    
                    // arrColor.push(inputColor.value);
                    // bgColor.innerHTML += inputColor.value + '<br>';
                    // bgColor.style.backgroundColor = inputColor;
                    
                    // bgColor.innerHTML += inputColor.value + '<br>';
                    // bgColor.style.backgroundColor = inputColor.value;
                
                
                // display.innerHTML += inputColor.value;
                // arrBgColor.style.backgroundColor += inputColor.value;
                // display.innerHTML = `색상 종류:  ${arrColor}`;
                // display.innerHTMLdisplay.style.backgroundColor += arrColor;
        
            let deleteColor = (index) => {
                arrColor.splice(index, 1);
                // bgColor.innerHTML = `${arrColor}`;
                console.log(arrColor);
            }

            let changeBgColor = () => {
                // document.body.style.backgroundColor = Math.random(arrColor) * arrColor.length;
                // document.body.style.backgroundColor = Math.random();
                console.log(Math.floor(Math.random() * arrColor.length));
                document.body.style.backgroundColor = arrColor[Math.floor(Math.random() * arrColor.length)];
                // str = inputColor.value;
                // document.getElementById('display').innerHTML = str;
                // display.style.color = '#fff';
            }
        }
            // inputColor.oninput = selectColor;
            // btnColor.onclick = changeBgColor;
            // btnReset.onclick = resetColor;
            // bgColor.onclick = deleteColor;

            // document.getElementById(target).insertAdjacentElement('beforeend', inputColor);
            // document.getElementById(target).insertAdjacentElement('beforeend', btnColor);
            // document.getElementById(target).insertAdjacentElement('beforeend', btnReset);
            // document.getElementById(target).insertAdjacentElement('beforeend', btnDelete);
        
    
    
