/*---------------START SCREEN-------------------*/



splashScreen();
function splashScreen() {

	var logoscreen = document.createElement('div');
	logoscreen.style.cssText = 'width: 100%; height: 100%;';
	logoscreen.id = 'startscreen'
	document.body.appendChild(logoscreen);

	var logo = document.createElement('div');
	logo.style.textAlign ='center';
	logoscreen.appendChild(logo);
	var logo1 = document.createElement('img');
	logo1.src = "img/logo.svg"
	logo1.style.width = 200 + 'px';
	logo1.style.hight = 200 + 'px';
	logo.appendChild(logo1);

	var nameform = document.createElement('div');
	nameform.id = 'nameform';
	nameform.style.display = 'none';
	nameform.style.cssText = ''
	logoscreen.appendChild(nameform);

	var entername = document.createElement('img');
	entername.id = 'entername'
	entername.src = 'img/entername.png'
	nameform.appendChild(entername);

	// var nameinput = document.createElement('input');
	// nameinput.id = 'nameinput';
	// if(localStorage.getItem('ajname') !== null){nameinput.placeholder = localStorage.getItem('ajname')} else {nameinput.placeholder = 'Player1'};
	// nameinput.type = 'text'
	// nameinput.name = 'nameinput'
	// nameinput.maxLength = 10
	// nameform.appendChild(nameinput);

	// var namesubmit = document.createElement('div');
	// namesubmit.id = 'namesubmit'
	// namesubmit.innerHTML = 'GO'


	// namesubmit.onclick = function(){
	// 	nameinput.value ? localStorage.setItem('ajname', nameinput.value) : localStorage.setItem('ajname',nameinput.placeholder);
	// 	document.getElementById('startscreen').style.display = 'none';
	// 	gameOn();
	// }
	// nameform.appendChild(namesubmit);

};





/*---------------NETWORK-------------------*/


var AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
var UpdatePassword;

function RestoreInfo()
{
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false,
            data : { f : 'READ', n : 'Makarenko_astrojunk' },
            success : ReadReady, error : ErrorHandler
        }
    );
}

function ReadReady(ResultH)
{
    if ( ResultH.error!=undefined )
        alert(ResultH.error);
    else if ( ResultH.result!="" )
    {
        var InfoH=JSON.parse(ResultH.result);
        scorecell.innerHTML += InfoH
    }
}

function StoreInfo()
{
    UpdatePassword=Math.random();
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false,
            data : { f : 'LOCKGET', n : 'Haiduk_aquarium', p : UpdatePassword },
            success : LockGetReady, error : ErrorHandler
        }
    );
}

function LockGetReady(ResultH)
{
    if ( ResultH.error!=undefined )
        alert(ResultH.error);
    else
    {        
        var InfoH=
        {
            name : 'ajname',
            score : 123
        };
        $.ajax(
            {
                url : AjaxHandlerScript, type : 'POST', cache : false,
                data : { f : 'UPDATE', n : 'Haiduk_aquarium, v : JSON.stringify(InfoH), p : UpdatePassword },
                success : UpdateReady, error : ErrorHandler
            }
        );
    }
}

function UpdateReady(ResultH)
{
    if ( ResultH.error!=undefined )
        alert(ResultH.error);
}

function ErrorHandler(jqXHR,StatusStr,ErrorStr)
{
    alert(StatusStr+' '+ErrorStr);
}



