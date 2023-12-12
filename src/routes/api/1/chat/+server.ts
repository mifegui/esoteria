import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
import { PRIVATE_SUPABASE_KEY } from '$env/static/private';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';

// https://dev.to/khromov/configure-cors-in-sveltekit-to-make-fetch-requests-to-your-api-routes-from-a-different-host-241k
export const OPTIONS: RequestHandler = async () => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*'
		}
	});
};

// TODO: https://supabase.com/blog/openai-embeddings-postgres-vector ou https://groff.dev/blog/openai-embeddings-supabase
// OU: https://platform.openai.com/docs/guides/fine-tuning

const openai = new OpenAI({
	apiKey: PRIVATE_OPENAI_KEY
});
export const POST: RequestHandler = async (data) => {
	// const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_KEY);

	// Extract the `prompt` from the body of the request
	const { messages } = await data.request.json();
	// Preparar mensagens, incluindo o contexto extenso se disponível
	const formattedMessages = messages.map((message: any) => ({
		content: message.content,
		role: message.role
	}));

	if (contexto) {
		formattedMessages.unshift({
			content: contexto,
			role: 'system'
		});
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-16k',
		stream: true,
		messages: formattedMessages
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream, {
		headers: {
			'Transfer-Encoding': 'chunked',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*'
		}
	});
};

const contexto = `
Uma das minhas maiores broncas com os que acreditam que não existe nada além do físico e suas “experiências refutando a Astrologia” é que a imensa maioria das experiências feitas até hoje que já caíram nas minhas mãos (e não foram poucas) caem nos seguintes quesitos:


1) usam apenas o “Signo” das pessoas para avaliar os resultados ou

2) pegam uns astrólogos e tentam fazer com que eles “adivinhem” alguma coisa a partir de um mapa e algumas vítimas ou façam "previsões" sobre algum assunto.

Não é de se estranhar que nada dá certo nunca. Ou estes experimentos apenas reforçam o que eu já expliquei em várias colunas: que o que vendem por ai hoje com o nome de "Astrologia" é puro LIXO.


Mas não posso culpar os céticos de verdade e as pessoas inteligentes. Eu mesmo, dez anos atrás, fui fazer um curso de Astrologia com um dos maiores astrólogos do país, Frank Avabash, com esse preconceito. Na época, ele devia ter uns 25 anos de experiência com Astrologia e eu estava totalmente convencido que seria uma furada. Mas me enganei. A Astrologia Hermética (aquela que Isaac Newton, Galileu Galilei, Kepler, Tycho Brache, John Dee, Max Heindel, Fernando Pessoa, Winston Churchill e Hitler estudavam) não lembra nem de longe o que os profanos chamam de “astrologia”.


Então, afinal de contas, o que é Astrologia?

Para começar, falaremos sobre o que se entende por “astrologia” no mundo profano: segundo os horóscopos, os humanos são divididos em 12 castas estereotipadas chamadas “signos”. Todo dia no jornal sai o “horóscopo” que é o que vai acontecer com 1/12 da população do mundo naquele dia e volta e meia algum picareta vai na TV fazer “previsões” que nunca se concretizam...


Isso é o que as pessoas pensam que seja Astrologia.

Bem... agora vamos falar sobre Astrologia de Verdade.

Um Mapa Astral, ou Carta Natal, é uma representação geométrica e simbólica do céu no exato momento do nascimento de qualquer coisa no Planeta. Uma pessoa, um objeto, um contrato, um ritual... Nenhum dos planetas “influencia” nada. Muito menos a “atração gravitacional” ou "energias emanadas" deles, como eu já vi céticos afirmarem.

As posições dos Planetas atuam apenas como mostradores; ponteiros invisíveis de um relógio astral, movimentando-se em sincronicidade com os acontecimentos em cada planeta. Tudo o que está em cima é semelhante ao que está em baixo. E o que realmente conta na confecção de um Mapa Astral é a angulação que eles fazem com o horizonte. Para alguém totalmente materialista, não parece mesmo fazer sentido... é como se alguém da segunda dimensão desse de cara com uma esfera atravessando o plano... na visão deles, o máximo que poderiam compreender seria o círculo aumentando e diminuindo de raio, mas não conseguiriam explicar o que está acontecendo porque não possuem o conhecimento da terceira dimensão. O mesmo ocorre no exemplo acima. A explicação para o por quê a astrologia Funciona está em um plano que a ciência ortodoxa AINDA não consegue explicar.

O cálculo exato das efemérides e a posição exata dos planetas no Mapa é de vital importância para a ciência da Astrologia. Por esta razão, em seu nascimento, Astrólogos e Astrônomos eram uma profissão apenas.


Mas tio, e as Constelações?

Constelações não servem para nada no cálculo de Mapas. São apenas REFERÊNCIAS simbólicas que os antigos encontraram para explicar para as pessoas algo que é extremamente difícil descrever apenas com palavras. Se fomos avaliar diferentes métodos astrológicos (astrologia chinesa, védica, asteca, etc) veremos que, apesar de cada uma delas dar NOMES DIFERENTES para casa signo, as descrições de cada período temporal em relação ao comportamento dos indivíduos é rigorosamente o mesmo. Mudam apenas a referência. Em um horóscopo são animais, em outro são deuses, no terceiro constelações, em outro constelações diferentes e assim por diante...


Esta é uma das "refutações" que mais vejo entre os céticos: de que se a Astrologia fosse una, todas as Astrologias seriam iguais. Só que elas SÂO iguais... onde em uma cultura o signo é chamado de "touro", em outra é chamado de "urso" e em outra de "elefante". São símbolos que expressam uma mesma idéia, apenas culturalmente diferentes.


As próprias "constelações" não fazem sentido, quando agrupadas em um universo 3D. Peguemos, por exemplo, a constelação de Libra: alfa de Libra (Zubenelgenubi) está a 77 anos luz. Beta de Libra (Lanx Australlis) está a 160 anos-luz, gama de Libra está a 150 anos-luz e sigma de Libra (Brachium) está a 300 anos-luz... ou seja, elas não tem NADA em comum para serem agrupadas “próximas”.


Mas elas serviam como símbolos para contar histórias e fazer com que os cientistas primitivos fossem capazes de entender os conceitos abstratos que regem a psicologia.

Além disso, devido à precessão dos equinócios, o Sol atualmente cruza as constelações de Áries de 18 de abril a 12 de maio, Touro de 13 de maio a 20 de junho, Gêmeos de 21 de junho a 19 de julho, Câncer de 20 de julho a 9 de agosto, Leão de 10 de agosto a 15 de setembro, Virgem de 16 de setembro a 30 de outubro, Libra de 31 de outubro a 22 de novembro, Escorpião de 23 de novembro a 28 de novembro, Ofiúco de 29 de novembro a 16 de dezembro, Sagitário de 17 de dezembro a 18 de janeiro, Capricórnio de 19 de janeiro a 15 de fevereiro, Aquário de 16 de fevereiro a 11 de março e Peixes de 12 de março a 17 de abril (e não riam... já vi astrólogos esquisotéricos querendo “reformular” os signos baseado nessas bullshits).

Ou seja, outros céticos usam isso como desculpa para "refutar" a Astrologia, alegando que graças à precessão dos Equinócios, o signo que você pensa que possui não é o verdadeiro signo que deveria ter e assim por diante...




Retornando aos planetas

Na “astrologia” que as pessoas conhecem, existem 12 tipos de signos/pessoas... ou 144 tipos de pessoas (12x12) se você for legal e contar o ascendente.


Na Astrologia Hermética, temos 10 planetas (o nome Planeta vem de “viajante”, ou os “astros que caminham no céu”, por isso consideramos o Sol, a Lua e Plutão como planetas) mas, na realidade, são apenas os ponteiros do Sistema solar que contam.

O círculo do Zodíaco possui 360 graus. Sabendo que Mercúrio, pela posição relativa do sol em relação à Terra nunca estará mais do que 28 graus afastado do sol e Vênus nunca estará mais do que 46 graus afastado do sol, temos então:


360 (sol) x 56 (mercúrio) x 92 (Vênus) x 360 (terra/ascendente) x 360 (marte) x 360 (júpiter) x 360 (saturno) x 360 (urano) x 360 (netuno) x 360 (plutão) x 360 (lua) Mapas Astrais diferentes! Fazendo as contas, temos: 1,45344 E+24, ou seja, 

1,453.440.000.000.000.000.000.000 de possibilidades diferentes. Um SETILHÃO de combinações possíveis, se levarmos em conta 1 grau de precisão. A conta inclui os 360 graus do sol por causa das CASAS. Se quisermos “facilitar” e considerarmos apenas as combinações dos 12 signos com os 10 planetas, teremos 61.917.364.224 tipos de Mapas diferentes (ou 61 BILHÕES de combinações).


Complexo, não? Mas se a biologia ou a astrofísica podem chegar a complexidades matemáticas absurdas, porque insistem em manter a astrologia presa no século XVIII?

Simbolicamente, cada Planeta reflete um aspecto da Árvore da Vida dentro de cada pessoa. Para compreender a Astrologia, então, é necessário um conhecimento da Kabbalah (não a judaica, mas a estrutura que originou tanto a Kabbalah judaica quanto a hermética) e o que cada sephira representa dentro do Mapa de Estados de Consciência Humana (ou seja, o Astrólogo também precisa estudar a fundo psicologia e simbologia). E aqui começa o real problema da Astrologia: VOCABULÁRIO.




O vocabulário humano é extremamente limitado. Vamos a um exemplo simples: Você conseguiria descrever em palavras o amor que sente por sua mãe? E por seu pai? E por sua esposa/esposo? Por sua/seu amante? Pelo seu/sua filho mais velho? É o mesmo amor que o do filho caçula? E o amor que você sente pelos seus colegas de exército? Seu time de futebol? O amor-compaixão que sente por um mendigo pedindo esmola? o amor-piedade que sente por uma criança espancada? o amor-ódio que sente pela ex-namorada/o ? Não há nenhum degradê entre estas formas de “amor”?

Certamente que quando você diz “eu amo minha esposa” e “eu amo meu time de futebol”, “eu amo meus amigos torcedores” e “eu amo batata frita” há diferenças enormes de significado.


Talvez um poeta conseguisse “traduzir” estes sentimentos em poemas enormes; colocar em palavras os nobres sentimentos humanos... textos longos, rebuscados, melodias singelas, pinturas... ainda assim não conseguiria chegar ao ponto exato.

Se o olho humano pode distinguir 10 milhões de cores diferentes, por que não temos um nome diferente para cada uma delas? E para cada um dos sentimentos/emoções?

Estão conseguindo chegar ao cerne do problema?


Se a astrologia tivesse avançado como as outras ciências, ao invés de ter sido expulsa das universidades pela IGREJA (e não por ser uma “pseudo-ciência” como a maioria dos céticos gosta de afirmar), talvez teríamos hoje um código para o Mapa de cada pessoa semelhante ao código genético ou ao código Pantone, com letras e números; e computadores buscando similaridades comportamentais, ao invés de astrólogos se matando para explicar sentimentos com palavras.


Queria ver se o Richard Dawkins tivesse de dar nomes simbólicos ou fazer poemas para cada código genético que encontrasse...


O Mapa Astral, então, é um perfeito mapa vocacional que mostra onde estão suas facilidades e dificuldades, a maneira como você pensa, sente, briga, transa, intui, aprende... mostra o que te agrada e o que te incomoda; mostra os vícios que você tem e às vezes nem sabe por quê. Mostra suas virtudes e os seus defeitos.

O que o Astrólogo faz é analisar um mapa e tentar achar palavras que se encaixem com cada uma destas combinações em suas diversas matizes. Quando falamos “seu Marte está em Gêmeos”, estamos usando um código que simplifica MUITO, mas MUITO mesmo o que realmente estamos vendo naquele código... é como falar “sua camisa é azul”. Azul o que? Azul royal? azul royal bebê? azul royal bebê fúcsia? azul royal bebê fúcsia prussiano do inverno do rio Volga?


Um Astrólogo está limitado pelo seu próprio vocabulário e pelo seu conhecimento da astrologia e simbolismo; também está limitado pelo seu próprio mapa astral. Um astrólogo cujo próprio mapa tenha muitos planetas em virgem fará uma interpretação de um mapa de outra pessoa bem diferente de um astrólogo com muitos planetas em peixes... mesmo que os dois tenham entendido as nuances de maneira iguais, 

certamente se expressarão de maneira diferente, com palavras diferentes. Os céticos adoram pegar estas diferenças para alegar "que os astrólogos não falam a mesma língua nas mesmas interpretações".


E nessa “subjetividade” acabam as chances da Astrologia de se enquadrar nas ditas ciências ortodoxas... imagine a dificuldade que os geneticistas teriam se precisassem ficar dando nomes e descrições para cada um dos 27.000 genes humanos baseado em sua interpretação pessoal...


Desta forma, o que os Astrólogos fazem é compilar em tabelas palavras, símbolos e descrições que mais se encaixam àquela determinada matiz energética (novamente, usando vocabulário de acordo com seu próprio entendimento). O que eu acho “teimoso” como um adjetivo depreciativo, você pode achar que é um elogio relacionado com “obstinação”, por exemplo! Uma pessoa “curiosa” é um elogio ou é uma pessoa frívola?


E assim caímos nas brechas para as astrologias esquisotéricas... tentando rotular e simplificar ao máximo, chegam e dizem “todo virginiano é discreto, gosta de organização e limpeza”. Não é necessariamente verdade. Boa parte deles possui estas características, mas isso não define absolutamente nada em alguém... para vocês terem uma idéia, um Mapa bem feito não tem menos do que 15-20 páginas de texto sobre a pessoa.


Conhece a ti mesmo

E como se todas estas dificuldades não bastassem, também há o livre-arbítrio. Uma pessoa que tenha, por exemplo, “Mercúrio em Gêmeos” terá uma facilidade muito maior que a média de lidar com palavras... ela terá facilidade bem maior do que outras pessoas se desejar tornar-se escritor, jornalista, repórter, contador de casos... ou um grande fofoqueiro... ou um grande mentiroso, ou combinações destes adjetivos. A habilidade de manipular bem as palavras não implica necessariamente que você as usará para o bem. E nas facilidades que estão as tentações.


Não temos como distinguir no mapa um grande repórter de um hábil mentiroso. Podemos dizer “fulano tem facilidade para lidar com palavras” (você sentiria alguma diferença se eu tivesse escrito “fulano tem facilidade para manipular palavras”?); talvez alguns céticos considerem isso vago (é outra das alegações furadas dos céticos em relação à astrologia). E NADA garante que alguém que tenha Mercúrio em Gêmeos vá seguir a carreira de lidar com palavras... ele pode muito bem ser um vendedor de carros usados que usa isso como lábia.


Para mim, “Mercúrio em gêmeos” diz muita coisa... Questão de vocabulário. Não podemos aprofundar a descrição sem conhecer a pessoa... talvez, somente a própria pessoa vai realmente saber o quanto ela usa esta capacidade para o bem ou para o mal.


É nisso que entra o autoconhecimento e a parte Hermética do “Astrologia Hermética”.

Avaliando nossos mapas, podemos detectar as energias com as quais temos mais facilidade e lapidar nossa pedra bruta para chegarmos até a pedra filosofal.


Mas é duro olharmos para o espelho e reconhecermos nossos defeitos... e mais difícil ainda lutar para transmutá-los das oitavas mais baixas nas oitavas mais altas; vencer as paixões que nos levam ao uso egoísta de nossas habilidades e transformá-las em virtudes. É como transformar chumbo em ouro.


Desta forma está a dificuldade em adequar o real ao experimento... fazer "testes de múltipla escolha" parece completamente nonsense para alguém que sabe para que o mapa realmente serve. Minha sugestão seria pegar um psicólogo neutro para fazer um levantamento psicológico completo de cada pessoa, bem como uma entrevista onde ela revelaria suas ambições, fantasias, o que realmente gostaria de fazer, o que realizou dos sonhos, que tipo de parceiro sexual gosta e assim por diante.


Por outro lado, o Mapa seria gerado pelo banco de dados que estamos organizando através das doações dos leitores do Teoria da Conspiração, ou seja, sem a "interpretação" pessoal do Astrólogo. E como comparação, um grupo de psicólogos/astrólogos compararia o perfil psicológico da pessoa com o do mapa e faria as correspondências. Claro que eu gostaria de fazer isso não com 20 mapas, mas com 10.000 mapas. Só que daria um puta trabalho... e os céticos já estão previamente convencidos que astrologia não funciona (embora eu sempre pensasse que cientistas avaliassem primeiro e julgassem depois, mas tudo bem).

O texto acima é o contexto que vocês precisa para conversar com o usuário sobre astrologia.`;
