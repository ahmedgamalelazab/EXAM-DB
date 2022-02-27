$(document).ready(function () {
  $('#custum-button').on('click', function () {
    $('#sidebar-wrapper').toggle();
  });
  $('#qus-btn').on('click', function () {
    do {
      numOfExamQus = parseInt(prompt('inter the number of qus'));
    } while (isNaN(numOfExamQus));

    let arr = [];
    for (let i = 0; i < numOfExamQus; i++) {
      //add lable
      for (let j = 0; j < 6; j++) {
        let container1 = document.createElement('div');
        container1.classList.add('row', 'form-group', 'cust-form');
        let divLable1 = document.createElement('div');

        divLable1.classList.add('col-sm-4', 'label-column');
        let lable1 = document.createElement('lable');
        lable1.classList.add('col-form-label');
        // if(j===0)
        //   lable1.innerText = "Add Question:";
        // else if(j===1)
        //   lable1.innerText = "a:";
        // else if(j===2)
        //   lable1.innerText = "b:";
        // else if(j===3)
        //   lable1.innerText = "c:";
        // else if(j===4)
        //   lable1.innerText = "d:";
        // else if(j===5)
        // lable1.innerText = "correct answer:";
        switch (j) {
          case 0:
            lable1.innerText = 'Add Question:';
            break;
          case 1:
            lable1.innerText = 'a:';
            break;
          case 2:
            lable1.innerText = 'b:';
            break;
          case 3:
            lable1.innerText = 'c:';
            break;
          case 4:
            lable1.innerText = 'd:';
            break;
          case 5:
            lable1.innerText = 'correct answer:';
            break;
        }

        divLable1.appendChild(lable1);
        container1.appendChild(divLable1);
        arr.push(container1);
        // arr.push(container1);
        //addinput 1
        let diviput1 = document.createElement('div');
        diviput1.classList.add('col-sm-6', 'input-column');
        let input1 = document.createElement('input');
        input1.setAttribute('type', 'text');

        input1.classList.add('form-control');
        diviput1.appendChild(input1);

        container1.appendChild(diviput1);
        arr.push(container1);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      document.getElementById('form').appendChild(arr[i]);
    }
    let addExamButton = document.createElement('button');
    addExamButton.classList.add('btn', 'btn-success', 'cust-form');
    addExamButton.setAttribute('type', 'button');
    addExamButton.innerText = 'add Exam';
    document.getElementById('form').appendChild(addExamButton);
  });
});
