import fetch from 'node-fetch'

// function nomeDaFuncao(){

// }
// const funcao = ()=>{}
// const funcao = um=>{}
// const funcao = (um,dois)=>{}
// const func = um => console.log()

function getGitHubUser(){//CHAMADA PELO ONCLICK
  
fetch('https://api.github.com/users/g1ll')
  .then(response => response.json()) //TENTA TRANSFORMAR EM JSON
  .then(data => { //COM O JSON PRONTO EXECUTA A NOSSA FUNÇÃO
	let text =`API FETCH (PROMISE)
		  \n${data.login}: ${data.bio}
		  \nUsuário: ${data.name}
		\nInstituição: ${data.company}
		\nLocalização: ${data.location}`
		//   document.querySelector('#dados').innerHTML = text;
		console.log(text);
  })
  .catch(error => console.error(error))
}

getGitHubUser();