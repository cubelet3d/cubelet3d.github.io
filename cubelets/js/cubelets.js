let aCubeThingLoaded = false
let theFont = null
let publicKey, privateKey
let imgData
let MoralisUser
let Cubelets = {
	interval : null,
	allowance: null,
	instance : null,
	address  : "0x433285CF6e73E91A915CD4C8CB0c447C9F359fE1",
	abi      : [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_new","type":"string"}],"name":"changeBase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_new","type":"uint256"}],"name":"changePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hash","type":"string"}],"name":"claim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"withdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_base","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"_tokenIds","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"base","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
}
async function loadCubelets() {
	$("#cubelets_button_wrapper").addClass("disabled")
	if(!aCubeThingLoaded) {
		$.getScript("cubelets/js/three.js", function() {
			let fontload = new THREE.FontLoader()
			fontload.load('fonts/audiowide.json',function(font){theFont=font})
			$.getScript("cubelets/js/texture.js", function() {
				$.getScript("cubelets/js/sprite.js", function() {
					$.getScript("https://unpkg.com/moralis-v1@1.11.0/dist/moralis.js", async function() {
						$("body").append('<script id="vertexShader" type="x-shader/x-vertex"> \
						varying vec2 vUv; \
						void main() { \
						vUv = uv; \
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); \
						} \
						</script> \
						<script id="fragmentShader" type="x-shader/x-fragment"> \
						uniform vec3 color1; \
						uniform vec3 color2; \
						varying vec2 vUv; \
						void main() { \
						gl_FragColor = vec4(mix(color1, color2, vUv.y),1.0); \
						} \
						</script>')
						$("#cubeletNav > button").css("flex","1")
						putCube(accounts[0])
						Moralis.initialize("vT2bOCtQ8NHEF9hhOZie0NAyxaD5dTQw5D0AahMN");
						Moralis.serverURL = 'https://iuu6g7fymlha.moralis.io:2053/server'
						Cubelets.instance = new web3.eth.Contract(Cubelets.abi, Cubelets.address)
						let remainingHeight = $("#acubething").outerHeight() - ( $("#acubething .consoleHeader").outerHeight() + $("#Blockie3D").outerHeight() + $("#cubeletNav").outerHeight() )
						$("#cubeletsConsole").css({
							"height" : ""+remainingHeight+"px",
							"overflow-x" : "hidden",
							"overflow-y" : "auto",
							"font-size" : "80%",
							"padding" : "2px 2px 7px 2px",
							"color" : "green"
						})
						Cubelets.interval = setInterval(cubeletsVidyaAllowance, 1000)
						writeToConsole("Generate wallets and save them to disk. Mint as NFT costs 100 VIDYA + Gas.")
						$("#cubelets_button_wrapper").removeClass("disabled")
						aCubeThingLoaded = true
					})
				})
			})
		});
	} else {
		$("#cubeletsConsole").empty()
		putCube(accounts[0])
		let remainingHeight = $("#acubething").outerHeight() - ( $("#acubething .consoleHeader").outerHeight() + $("#Blockie3D").outerHeight() + $("#cubeletNav").outerHeight() )
		$("#cubeletsConsole").css({
			"height" : ""+remainingHeight+"px",
			"overflow-x" : "hidden",
			"overflow-y" : "auto",
			"font-size" : "80%",
			"padding" : "2px 2px 7px 2px",
			"color" : "green"
		})
		Cubelets.interval = setInterval(cubeletsVidyaAllowance, 1000)
		writeToConsole("Generate wallets and save them to disk. Mint as NFT costs 100 VIDYA + Gas.")
		
		$("#cubelets_button_wrapper").removeClass("disabled")
	}
}

async function cubeletsVidyaAllowance() {
	await VIDYA.methods.allowance(accounts[0],Cubelets.address).call().then(function(r) {
		Cubelets.allowance = r
		if(Cubelets.allowance >= web3.utils.toWei("100")) {
			$("#mintNFT").text("Mint")
			$("#mintNFT").removeClass("disabled")
			clearInterval(Cubelets.interval)
			Cubelets.interval = null
		} else {
			$("#mintNFT").text("Approve")
			$("#mintNFT").removeClass("disabled")
		}
	})
}

function writeToConsole(what) {
	$("#cubeletsConsole").append("<div>"+what+"</div>")
	$("#cubeletsConsole").scrollTop($("#cubeletsConsole")[0].scrollHeight);
}

async function mintCubelet() {
	if(Cubelets.allowance == "0") {
		VIDYA.methods.approve(Cubelets.address,"115792089237316195423570985008687907853269984665640564039457584007913129639935").send({from:accounts[0]})
		.on("transactionHash",function(hash){
			writeToConsole("Pending approve...")
		})
		.on("receipt",function(r){
			writeToConsole("Approved!")
		})
	} else {
		await VIDYA.methods.balanceOf(accounts[0]).call().then(async function(r) {
			if(parseFloat(web3.utils.fromWei(r)) >= 100) {
				await uploadFile()
			} else {
				writeToConsole("Not enough VIDYA...")
			}
		})
	}
}

async function uploadFile() {
	writeToConsole("Waiting for signature...")
    // Request signature 
    Moralis.Web3.authenticate().then(async function(user) {
        MoralisUser = Moralis.User.current()
		if(imgData) {
			writeToConsole("Uploading to IPFS...")
			let file = new Moralis.File("image.png", {base64 : imgData })
			await file.saveIPFS()
			
			let metadata = {
				"name" : "Cubelet",
				"description" : accounts[0],
				"image" : file._ipfs,
				"attributes" : [
					{
						"trait_type" : "Main color",
						"value" : longHSLtoShort(color1)
					},
					{
						"trait_type" : "Background color",
						"value" : longHSLtoShort(color2)
					},
					{
						"trait_type" : "Spot color",
						"value" : longHSLtoShort(color3)
					}
				]
			}
			
			let file2 = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))})
			await file2.saveIPFS()
			
			let ipfs = file2._ipfs
			let hash = file2._hash
			
			mint(hash)
		}
    })
}

async function mint(ipfs) {
	writeToConsole("Ready to mint!")
	writeToConsole("Waiting for user input...")
	await Cubelets.instance.methods.claim(ipfs).send({from:accounts[0]})
	.on("transactionHash", function(hash) {
		writeToConsole("Pending transaction...")
	})
	.on("receipt", function(receipt) {
		writeToConsole("Process completed!")
	})
}

$(document).ready(function() {
	$("#Blockie3D").css({
		"width":"250px",
		"height":"250px",
		"display":"flex",
		"align-items":"center",
		"justify-content":"center"
	})
	$("#Blockie3D").html('<div>Loading...</div>')
	$("#cubeletNav button").css("min-width","33.3333%")
	$("body").on("click", "#aCubeThingCloseButton", function() {
		clearInterval(Cubelets.interval)
		$("#cubeletsConsole").empty()
	})
	$("body").on("click", "#gen3dBlockie", function() {
		generate()
	})
	$("body").on("click", "#saveAs", function() {
		saveAs()
	})
	$("body").on("click", "#mintNFT", function() {
		mintCubelet()
	})
	$("body").on("click", "#cubelets_button", function() {
		loadCubelets()
	})
})

let mesh, renderer, scene, camera, sprite

function setupScene() {
    scene    = new THREE.Scene();
    camera   = new THREE.PerspectiveCamera(45,250/250);
    renderer.setSize(250,250);
    $("#Blockie3D").html(renderer.domElement);
}

function setupRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
}

function putCube(seed) {
    if(accounts[0]!==seed){$("#saveAs").removeClass("disabled")}
	if(!aCubeThingLoaded){setupRenderer()}
    setupScene()
    blockie = blockies.create({seed:seed.toLowerCase()}).toDataURL()

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    loader.load(
        blockie,
        function(texture) {
            
            // Blockie 
        	let geometry = new THREE.BoxBufferGeometry(1,1,1)
        	let material = new THREE.MeshBasicMaterial({map: texture})
        	let cube     = new THREE.Mesh(geometry, material)
        	scene.add(cube)
            cube.position.z = -4;
            cube.rotateX(22.5 * THREE.Math.DEG2RAD);
            cube.rotateY(45 * THREE.Math.DEG2RAD);

			// Address
            sprite = new THREE.TextSprite({
            alignment: 'center',
            color: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 0.02,
            fontFamily: theFont.data.familyName + ", monospace",
            fontSize: 0.27,
            fontStyle: 'normal',
            text: formatAddress(seed)
            });
            scene.add(sprite);
            sprite.position.z = -4;
            sprite.position.y = -1.25;
            
            // Scene background gradient 
            var uniforms = {
              "color1" : {
                type : "c",
                value : new THREE.Color(longHSLtoShort(color1))
              },
              "color2" : {
                type : "c",
                value : new THREE.Color(longHSLtoShort(color2))
              },
            };
            var fShader = document.getElementById('fragmentShader').text;
            var vShader = document.getElementById('vertexShader').text;
            var material2 = new THREE.ShaderMaterial({
              uniforms: uniforms,
              vertexShader: vShader,
              fragmentShader: fShader
            });
            var geometry2 = new THREE.PlaneGeometry(4,4,4,4);
            mesh = new THREE.Mesh(geometry2, material2);
            scene.add(mesh);
            mesh.position.z = -5;

            // This becomes border 
            scene.background = new THREE.Color(longHSLtoShort(color3))

            render()
            
            // Base64 of scene
            let strMime = "image/png";
            imgData = renderer.domElement.toDataURL(strMime);
        },
        function () {},  // onProgress function
        function ( error ) { console.log( error ) } // onError function
    );
}

function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

function formatAddress(address) {
    let firstSix = address.substring(0, 6)
    let lastFour = address.substr(address.length - 4)
    return firstSix + "..." + lastFour
}

function longHSLtoINT(string) {
    return Math.round(string.replace("%",""))
}

function generate() {
    let account = web3.eth.accounts.create();
    publicKey   = account.address;
    privateKey  = account.privateKey;
    putCube(publicKey)
}

function saveAs() {
    if(publicKey.length == 42 && privateKey.length == 66) {
        download(publicKey+"\n"+privateKey, publicKey+".txt", "text/plain");
    } else {
        console.error("Invalid address or private key length!");
    }
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function longHSLtoShort(color) {
    regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g
    result = regexp.exec(color).slice(1)
    return "hsl("+result[0] +", "+ longHSLtoINT(result[1]) +"%, "+ longHSLtoINT(result[2]) +"%)"
}