(function(){
    'use strict';

    //html��id����f�[�^���擾
    //�擾�����f�[�^��ϐ��ɑ��

    var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');
    var counterText = document.getElementById('counter');
    var counter = 0;


    //�N���b�N���̎��Ԃ�ێ����邽�߂̕ϐ���`
    var startTime;

    //�o�ߎ������X�V���邽�߂̕ϐ��B ���߂͂�����0�ŏ�����
    var elapsedTime = 0;

    //�^�C�}�[���~�߂�ɂ�clearTimeout���g���K�v������A���̂��߂ɂ�clearTimeout�̈����ɓn�����߂̃^�C�}�[��id���K�v
    var timerId;

    //�^�C�}�[���X�g�b�v -> �ĊJ��������0�ɂȂ��Ă��܂��̂�����邽�߂̕ϐ��B
    var timeToadd = 0;


    //�~���b�̕\���ł͂Ȃ��A���Ƃ��b�ɒ������߂̊֐�, ���̂Ƃ��납����Ăяo���̂ŕʊ֐��Ƃ��č��
    //�v�Z���@�Ƃ���135200�~���b�o�߂����Ƃ��Ă���𕪂Ƃ��b�ɒ����� -> 02:15:200
    function updateTimetText(){

        //m(��) = 135200 / 60000�~���b�Ŋ��������̏��@-> 2��
        var m = Math.floor(elapsedTime / 60000);

        //s(�b) = 135200 % 60000�~���b�� / 1000 (�~���b�Ȃ̂�1000�Ŋ����Ă��) -> 15�b
        var s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(�~���b) = 135200�~���b�� % 1000�~���b�Ŋ��������̗]��
        var ms = elapsedTime % 1000;


        //HTML ��ŕ\���̍ۂ̌������Œ肷��@��j3 => 03�@�A 12 -> 012
        //javascript�ł͕����񐔗��A������ƕ�����ɂȂ�
        //������̖���2����\���������̂�slice�ŕ��̒l(-2)�����œn���Ă��B
        m = ('0' + m).slice(-2); 
//        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-3);

        //HTML��id�@timer�����ɕ\��������@
        timer.textContent = s + '.' + ms;
    }


    //�ċA�I�Ɏg����p�̊֐�
    function countUp(){

        //timerId�ϐ���setTimeout�̕Ԃ�l�ɂȂ�̂ő������
        timerId = setTimeout(function(){

            //�o�ߎ����͌��ݎ������~���b�Ŏ���Date.now()����start�����������̎���(startTime)������
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            //countUp�֐����g���ĂԂ��Ƃ�10�~���b���Ɉȉ��̌v�Z���n�߂�
            countUp();

        //1�b�ȉ��̎��Ԃ�\�����邽�߂�10�~���b��Ɏn�߂�悤�錾
        },10);
    }

    //start�{�^���ɃN���b�N���̃C�x���g��ǉ�(�^�C�}�[�X�^�[�g�C�x���g)
    start.addEventListener('click',function(){

        counter += 1;
	counterText.textContent = counter;

        if(counter == 1){


	    elapsedTime = 0;
	    //���Z�b�g����0�ɏ������������̂Ń��Z�b�g���������ۂ�0�������Ă�����
			timeToadd = 0;

            //updateTimetText��0�ɂȂ����^�C����\��
            updateTimetText();


            //�ݎ���������Date.now����
            startTime = Date.now();

            //�ċA�I�Ɏg����悤�Ɋ֐������
            countUp();
        }


        if(counter == 3){
            clearTimeout(timerId);
            timeToadd += Date.now() - startTime;
            counter = 0;
        }

    });

    //stop�{�^���ɃN���b�N���̃C�x���g��ǉ�(�^�C�}�[�X�g�b�v�C�x���g)
    stop.addEventListener('click',function(){

        //�^�C�}�[���~�߂�ɂ�clearTimeout���g���K�v������A���̂��߂ɂ�clearTimeout�̈����ɓn�����߂̃^�C�}�[��id���K�v
       clearTimeout(timerId);


        //�^�C�}�[�ɕ\������鎞��elapsedTime�����ݎ��������X�^�[�g�{�^�������������������������̂Ȃ̂ŁA
        //�^�C�}�[���ĊJ��������0�ɂȂ��Ă��܂��BelapsedTime = Date.now - startTime
        //�����������邽�߂ɂ͉ߋ��̃X�^�[�g���Ԃ���X�g�b�v���Ԃ܂ł̌o�ߎ��Ԃ𑫂��Ă����Ȃ���΂Ȃ�Ȃ��BelapsedTime = Date.now - startTime + timeToadd (timeToadd = �X�g�b�v������������(Date.now)���璼�߂̃X�^�[�g����(startTime)������)
       timeToadd += Date.now() - startTime;
    });

    //reset�{�^���ɃN���b�N���̃C�x���g��ǉ�(�^�C�}�[���Z�b�g�C�x���g)
    reset.addEventListener('click',function(){

        //�o�ߎ������X�V���邽�߂̕ϐ�elapsedTime��0�ɂ��Ă����AupdateTimetText��0�ɂȂ����^�C����\���B
        elapsedTime = 0;

        //���Z�b�g����0�ɏ������������̂Ń��Z�b�g���������ۂ�0�������Ă�����
        timeToadd = 0;

        //updateTimetText��0�ɂȂ����^�C����\��
        updateTimetText();

    });
})();
