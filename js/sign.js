let posturl = "https://vydia-antiscam.herokuapp.com/verify"
let geturl = "https://vydia-antiscam.herokuapp.com/vydians"

async function signMessage(messageToSign) {
    try {
        let signature = await web3.eth.personal.sign(messageToSign, inventoryUser)
        
        let data = {
            "address" : inventoryUser, 
            "sig" : signature, 
            "msg" : messageToSign
        }
        
        $.ajax({
            url: posturl,
            type: "POST",
            data: data,
            dataType: "JSON",
            success: function(r) {
                if(r) { 
                    notify("Welcome to the club ;)")
                } else {
                    notify("Err.. something went wrong. Sorry :(")
                }
            },
            error: function(e) {
                console.log(e)
            }
        })
    }
    catch(e) {
        console.error(e)
    }
}

async function checkForMakeItStack() {
    try {
        let _verified = await verified()
        if(hasMakeitStack && !_verified) {
            notify('Enter your Discord username to join the Vidyans! <input id="messageToSign" type="text" placeholder="name#1234"> Note: username is case sensitive', 'signMessage')
        } else {
            setTimeout(function(){
                checkForMakeItStack()
            }, 5000);
        }
    } catch(e) {
        console.error(e)
    }
}

// Returns true if whale is already registered
async function verified() {
    
    let result = false
    
    await $.ajax({
        url: geturl,
        type: "GET",
        dataType: "JSON",
        success: function(r) {
            if(r) {
                let whales = r.vydians
                for(let i = 0; i < whales.length; i++) {
                    if(whales[i][0] == inventoryUser) {
                        result = true
                        break;
                    }
                }
            }
        },
        error: function(e) {
            console.log(e)
        }
    })
    
    return result
}

checkForMakeItStack()