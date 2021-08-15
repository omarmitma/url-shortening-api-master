let btnNav=document.getElementById('btnNav');
let prevActive;
btnNav.addEventListener('click',()=>{
    let divSlidable=document.getElementById('divSlidable');
    if(prevActive){
        divSlidable.classList.remove('activeNav');
        prevActive=false;
    }else{
        prevActive=true;
        divSlidable.classList.add('activeNav');
    }
    
    
});

/* */
let btnShortenLink=document.getElementById('btnShortenLink');
let loading=document.getElementById('loading');
let theLink=document.getElementById('theLink');

let error=document.getElementById('error');
let msgError=document.getElementById('msgError');
let wrapShortenedLink=document.getElementById('wrapShortenedLink');
let nroCopy=0;

/* Acortar enlace y validar url*/
btnShortenLink.addEventListener('click',(e)=>{
    e.preventDefault();
    let verifi=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    let esvalido;
    if(esvalido=verifi.test(theLink.value)){
        error.classList.remove('error');
        loading.style.display='block';
        //Post to API
        fetch("https://api.shrtco.de/v2/shorten?url="+theLink.value)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.result.short_link);
                loading.style.display='none';
                nroCopy+=1;
                wrapShortenedLink.innerHTML+=`<div class="item">
                                                <div class="link">
                                                    <p>${theLink.value}</p>
                                                </div>
                                                <div class="wrapShortenedLinkCopy">
                                                    <div class="shortenedLink">
                                                        <p id="shortLink${nroCopy}">${data.result.short_link}</p>
                                                    </div>
                                                    <div class="btnCopy">
                                                        <button id="copy${nroCopy}" onclick="copied(${nroCopy})">Copy</button>
                                                    </div>
                                                </div>
                                            </div>
                                            `;});
    }else{
        error.classList.add('error');
        if (theLink.value=="") {
            msgError.innerHTML='Please add a link.';
        } else {
            msgError.innerHTML='Please enter a valid URL.';
        }
    }
});

/* Copiar, agregar y quitar clase */
let prevActiveBtnCopy=null;
function copied(nro){
    if(prevActiveBtnCopy){
        let prev=document.getElementById(prevActiveBtnCopy);
        prev.innerText='Copy';
        prev.classList.remove('btnCopied');
        prevActiveBtnCopy=null;
        
    }
    let buttonCopy=document.getElementById(`copy${nro}`);
    let shortLink=document.getElementById(`shortLink${nro}`);
    prevActiveBtnCopy=`copy${nro}`;
    buttonCopy.innerText='Copied!';
    buttonCopy.classList.add('btnCopied');

    let aux = document.createElement("input");
    aux.setAttribute("value", shortLink.innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
};