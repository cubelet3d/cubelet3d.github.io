const _0x2f4f9f=_0x373f;(function(_0x5b2f85,_0x15cbe2){const _0x5a6174=_0x373f,_0x11176e=_0x5b2f85();while(!![]){try{const _0x2a1e9c=-parseInt(_0x5a6174(0x200))/0x1*(parseInt(_0x5a6174(0x1a9))/0x2)+parseInt(_0x5a6174(0x1dd))/0x3*(-parseInt(_0x5a6174(0x1b4))/0x4)+-parseInt(_0x5a6174(0x17c))/0x5*(-parseInt(_0x5a6174(0x178))/0x6)+-parseInt(_0x5a6174(0x1ec))/0x7*(-parseInt(_0x5a6174(0x1de))/0x8)+-parseInt(_0x5a6174(0x1a6))/0x9*(-parseInt(_0x5a6174(0x1b6))/0xa)+parseInt(_0x5a6174(0x161))/0xb*(parseInt(_0x5a6174(0x190))/0xc)+-parseInt(_0x5a6174(0x1a7))/0xd*(parseInt(_0x5a6174(0x181))/0xe);if(_0x2a1e9c===_0x15cbe2)break;else _0x11176e['push'](_0x11176e['shift']());}catch(_0x2e801c){_0x11176e['push'](_0x11176e['shift']());}}}(_0xb699,0xe8436));let aCubeThingLoaded=![],publicKey,privateKey,imgData,MoralisUser,Cubelets={'interval':null,'allowance':null,'instance':null,'address':_0x2f4f9f(0x19d),'abi':[{'anonymous':![],'inputs':[{'indexed':!![],'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x1be),'type':'address'},{'indexed':!![],'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x1af),'type':'address'},{'indexed':!![],'internalType':'uint256','name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)}],'name':'Approval','type':_0x2f4f9f(0x1bc)},{'anonymous':![],'inputs':[{'indexed':!![],'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x1be),'type':_0x2f4f9f(0x176)},{'indexed':!![],'internalType':'address','name':_0x2f4f9f(0x1d7),'type':_0x2f4f9f(0x176)},{'indexed':![],'internalType':'bool','name':'approved','type':_0x2f4f9f(0x1a0)}],'name':_0x2f4f9f(0x1f0),'type':_0x2f4f9f(0x1bc)},{'anonymous':![],'inputs':[{'indexed':!![],'internalType':'address','name':_0x2f4f9f(0x1c7),'type':_0x2f4f9f(0x176)},{'indexed':!![],'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x16f),'type':_0x2f4f9f(0x176)}],'name':_0x2f4f9f(0x1c9),'type':_0x2f4f9f(0x1bc)},{'anonymous':![],'inputs':[{'indexed':!![],'internalType':_0x2f4f9f(0x176),'name':'from','type':'address'},{'indexed':!![],'internalType':_0x2f4f9f(0x176),'name':'to','type':_0x2f4f9f(0x176)},{'indexed':!![],'internalType':'uint256','name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)}],'name':_0x2f4f9f(0x1db),'type':_0x2f4f9f(0x1bc)},{'inputs':[{'internalType':_0x2f4f9f(0x176),'name':'to','type':_0x2f4f9f(0x176)},{'internalType':_0x2f4f9f(0x202),'name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)}],'name':'approve','outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':'function'},{'inputs':[{'internalType':_0x2f4f9f(0x1f8),'name':_0x2f4f9f(0x18e),'type':_0x2f4f9f(0x1f8)}],'name':_0x2f4f9f(0x1f6),'outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':_0x2f4f9f(0x18e),'type':'uint256'}],'name':_0x2f4f9f(0x1c0),'outputs':[],'stateMutability':'nonpayable','type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x1f8),'name':'hash','type':_0x2f4f9f(0x1f8)}],'name':_0x2f4f9f(0x183),'outputs':[{'internalType':_0x2f4f9f(0x202),'name':'','type':_0x2f4f9f(0x202)}],'stateMutability':'nonpayable','type':_0x2f4f9f(0x1fa)},{'inputs':[],'name':'renounceOwnership','outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':'function'},{'inputs':[{'internalType':'address','name':'from','type':_0x2f4f9f(0x176)},{'internalType':'address','name':'to','type':_0x2f4f9f(0x176)},{'internalType':'uint256','name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)}],'name':_0x2f4f9f(0x1e2),'outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x208),'type':_0x2f4f9f(0x176)},{'internalType':_0x2f4f9f(0x176),'name':'to','type':_0x2f4f9f(0x176)},{'internalType':'uint256','name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)},{'internalType':_0x2f4f9f(0x1a8),'name':'_data','type':_0x2f4f9f(0x1a8)}],'name':_0x2f4f9f(0x1e2),'outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':'address','name':_0x2f4f9f(0x1d7),'type':'address'},{'internalType':_0x2f4f9f(0x1a0),'name':'approved','type':'bool'}],'name':_0x2f4f9f(0x160),'outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':'address','name':_0x2f4f9f(0x208),'type':_0x2f4f9f(0x176)},{'internalType':_0x2f4f9f(0x176),'name':'to','type':_0x2f4f9f(0x176)},{'internalType':_0x2f4f9f(0x202),'name':_0x2f4f9f(0x1fb),'type':'uint256'}],'name':_0x2f4f9f(0x1bd),'outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':'function'},{'inputs':[{'internalType':_0x2f4f9f(0x176),'name':'newOwner','type':_0x2f4f9f(0x176)}],'name':_0x2f4f9f(0x1bb),'outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':'function'},{'inputs':[{'internalType':_0x2f4f9f(0x176),'name':'_token','type':_0x2f4f9f(0x176)}],'name':_0x2f4f9f(0x1d5),'outputs':[],'stateMutability':_0x2f4f9f(0x1e6),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':'string','name':_0x2f4f9f(0x19e),'type':_0x2f4f9f(0x1f8)},{'internalType':_0x2f4f9f(0x202),'name':_0x2f4f9f(0x1b8),'type':_0x2f4f9f(0x202)}],'stateMutability':_0x2f4f9f(0x1e6),'type':_0x2f4f9f(0x1cb)},{'inputs':[],'name':'_tokenIds','outputs':[{'internalType':_0x2f4f9f(0x202),'name':'_value','type':_0x2f4f9f(0x202)}],'stateMutability':_0x2f4f9f(0x1c2),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x1be),'type':_0x2f4f9f(0x176)}],'name':_0x2f4f9f(0x18f),'outputs':[{'internalType':'uint256','name':'','type':_0x2f4f9f(0x202)}],'stateMutability':_0x2f4f9f(0x1c2),'type':'function'},{'inputs':[],'name':'base','outputs':[{'internalType':_0x2f4f9f(0x1f8),'name':'','type':_0x2f4f9f(0x1f8)}],'stateMutability':_0x2f4f9f(0x1c2),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':'uint256','name':'tokenId','type':_0x2f4f9f(0x202)}],'name':_0x2f4f9f(0x189),'outputs':[{'internalType':_0x2f4f9f(0x176),'name':'','type':_0x2f4f9f(0x176)}],'stateMutability':'view','type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x176),'name':_0x2f4f9f(0x1be),'type':_0x2f4f9f(0x176)},{'internalType':_0x2f4f9f(0x176),'name':'operator','type':_0x2f4f9f(0x176)}],'name':_0x2f4f9f(0x1fc),'outputs':[{'internalType':_0x2f4f9f(0x1a0),'name':'','type':'bool'}],'stateMutability':_0x2f4f9f(0x1c2),'type':_0x2f4f9f(0x1fa)},{'inputs':[],'name':'name','outputs':[{'internalType':_0x2f4f9f(0x1f8),'name':'','type':_0x2f4f9f(0x1f8)}],'stateMutability':_0x2f4f9f(0x1c2),'type':_0x2f4f9f(0x1fa)},{'inputs':[],'name':_0x2f4f9f(0x1be),'outputs':[{'internalType':_0x2f4f9f(0x176),'name':'','type':_0x2f4f9f(0x176)}],'stateMutability':_0x2f4f9f(0x1c2),'type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x202),'name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)}],'name':_0x2f4f9f(0x180),'outputs':[{'internalType':_0x2f4f9f(0x176),'name':'','type':_0x2f4f9f(0x176)}],'stateMutability':_0x2f4f9f(0x1c2),'type':_0x2f4f9f(0x1fa)},{'inputs':[],'name':_0x2f4f9f(0x1f1),'outputs':[{'internalType':_0x2f4f9f(0x202),'name':'','type':'uint256'}],'stateMutability':'view','type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x172),'name':'interfaceId','type':_0x2f4f9f(0x172)}],'name':'supportsInterface','outputs':[{'internalType':_0x2f4f9f(0x1a0),'name':'','type':_0x2f4f9f(0x1a0)}],'stateMutability':'view','type':_0x2f4f9f(0x1fa)},{'inputs':[],'name':_0x2f4f9f(0x150),'outputs':[{'internalType':_0x2f4f9f(0x1f8),'name':'','type':'string'}],'stateMutability':'view','type':_0x2f4f9f(0x1fa)},{'inputs':[{'internalType':_0x2f4f9f(0x202),'name':_0x2f4f9f(0x1fb),'type':_0x2f4f9f(0x202)}],'name':'tokenURI','outputs':[{'internalType':_0x2f4f9f(0x1f8),'name':'','type':_0x2f4f9f(0x1f8)}],'stateMutability':'view','type':_0x2f4f9f(0x1fa)},{'inputs':[],'name':_0x2f4f9f(0x1f5),'outputs':[{'internalType':_0x2f4f9f(0x202),'name':'','type':'uint256'}],'stateMutability':'view','type':_0x2f4f9f(0x1fa)}]};const aCubeThingUI=_0x2f4f9f(0x1e8);async function loadCubelets(){const _0x4032fc=_0x2f4f9f;if(!aCubeThingLoaded)$[_0x4032fc(0x184)](_0x4032fc(0x1d1),function(){const _0x4ec590=_0x4032fc;$[_0x4ec590(0x184)](_0x4ec590(0x1c6),function(){const _0x44a737=_0x4ec590;$[_0x44a737(0x184)]('cubelets/js/sprite.js',function(){const _0x505031=_0x44a737;$['getScript'](_0x505031(0x15a),async function(){const _0x3df47e=_0x505031;$(_0x3df47e(0x1e7))[_0x3df47e(0x169)](_0x3df47e(0x19c)),$(_0x3df47e(0x1b3))['append'](aCubeThingUI),$(_0x3df47e(0x1dc))['show']('fold'),$('#acubething')[_0x3df47e(0x1b1)](_0x3df47e(0x17e)),$(_0x3df47e(0x1dc))[_0x3df47e(0x18d)]({'containment':'parent','handle':_0x3df47e(0x15d),'snap':!![],'start':function(_0x5648f9,_0x14910a){const _0x569eb9=_0x3df47e;$(this)[_0x569eb9(0x1b1)](_0x569eb9(0x154));},'stop':function(_0x18ffa6,_0x2705a1){const _0xedaf74=_0x3df47e;localStorage[_0xedaf74(0x1f2)]($(this)[_0xedaf74(0x1fd)]('id'),JSON['stringify'](_0x2705a1['offset'])),setTimeout(function(){const _0xb8d5e9=_0xedaf74;$(_0x18ffa6['target'])[_0xb8d5e9(0x15c)](_0xb8d5e9(0x154));},0x64);}}),putCube(accounts[0x0]),Moralis[_0x3df47e(0x187)](_0x3df47e(0x153)),Moralis[_0x3df47e(0x1ca)]=_0x3df47e(0x1b0),Cubelets[_0x3df47e(0x1fe)]=new web3[(_0x3df47e(0x17d))][(_0x3df47e(0x14d))](Cubelets[_0x3df47e(0x159)],Cubelets[_0x3df47e(0x176)]);let _0x107530=$('#acubething')[_0x3df47e(0x1c8)]()-($(_0x3df47e(0x1b2))[_0x3df47e(0x1c8)]()+$(_0x3df47e(0x1ac))[_0x3df47e(0x1c8)]()+$(_0x3df47e(0x203))['outerHeight']());$(_0x3df47e(0x165))[_0x3df47e(0x1ce)]({'height':''+_0x107530+'px','overflow-x':_0x3df47e(0x1d9),'overflow-y':'auto','font-size':_0x3df47e(0x167),'padding':_0x3df47e(0x168),'color':_0x3df47e(0x15f)}),Cubelets['interval']=setInterval(cubeletsVidyaAllowance,0x3e8),writeToConsole('Generate\x20wallets\x20and\x20save\x20them\x20to\x20disk.\x20Mint\x20as\x20NFT\x20costs\x20100\x20VIDYA\x20+\x20Gas.'),aCubeThingLoaded=!![];});});});});else{$(_0x4032fc(0x1b3))['append'](aCubeThingUI),$('#acubething')[_0x4032fc(0x1e5)](_0x4032fc(0x158)),$(_0x4032fc(0x1dc))[_0x4032fc(0x1b1)](_0x4032fc(0x17e)),$(_0x4032fc(0x1dc))[_0x4032fc(0x18d)]({'containment':_0x4032fc(0x19b),'handle':_0x4032fc(0x15d),'snap':!![],'start':function(_0x54f190,_0x15d2ce){const _0x58d4d4=_0x4032fc;$(this)['addClass'](_0x58d4d4(0x154));},'stop':function(_0x3ce5b3,_0x1174dd){const _0x127198=_0x4032fc;localStorage[_0x127198(0x1f2)]($(this)['attr']('id'),JSON[_0x127198(0x16a)](_0x1174dd['offset'])),setTimeout(function(){const _0x4be8ab=_0x127198;$(_0x3ce5b3['target'])[_0x4be8ab(0x15c)](_0x4be8ab(0x154));},0x64);}}),putCube(accounts[0x0]);let _0x388be4=$(_0x4032fc(0x1dc))[_0x4032fc(0x1c8)]()-($('#acubething\x20.consoleHeader')['outerHeight']()+$('#Blockie3D')[_0x4032fc(0x1c8)]()+$(_0x4032fc(0x203))[_0x4032fc(0x1c8)]());$(_0x4032fc(0x165))[_0x4032fc(0x1ce)]({'height':''+_0x388be4+'px','overflow-x':'hidden','overflow-y':_0x4032fc(0x17a),'font-size':_0x4032fc(0x167),'padding':_0x4032fc(0x168),'color':_0x4032fc(0x15f)}),Cubelets['interval']=setInterval(cubeletsVidyaAllowance,0x3e8),writeToConsole(_0x4032fc(0x1f9));}}async function cubeletsVidyaAllowance(){const _0x43a62e=_0x2f4f9f;await VIDYA['methods'][_0x43a62e(0x185)](accounts[0x0],Cubelets[_0x43a62e(0x176)])[_0x43a62e(0x1ab)]()[_0x43a62e(0x1ed)](function(_0x21f019){const _0x1e16f2=_0x43a62e;Cubelets[_0x1e16f2(0x185)]=_0x21f019,Cubelets[_0x1e16f2(0x185)]>=web3['utils'][_0x1e16f2(0x166)](_0x1e16f2(0x197))?($(_0x1e16f2(0x14c))[_0x1e16f2(0x1d6)](_0x1e16f2(0x1e1)),$('#mintNFT')[_0x1e16f2(0x15c)](_0x1e16f2(0x162)),clearInterval(Cubelets['interval']),Cubelets['interval']=null):($(_0x1e16f2(0x14c))[_0x1e16f2(0x1d6)](_0x1e16f2(0x1ef)),$(_0x1e16f2(0x14c))[_0x1e16f2(0x15c)](_0x1e16f2(0x162)));});}function writeToConsole(_0x268fe4){const _0x2a98d4=_0x2f4f9f;$(_0x2a98d4(0x165))['append'](_0x2a98d4(0x1da)+_0x268fe4+'</div>'),$('#cubeletsConsole')[_0x2a98d4(0x1d8)]($(_0x2a98d4(0x165))[0x0][_0x2a98d4(0x151)]);}async function mintCubelet(){const _0x143a3f=_0x2f4f9f;Cubelets['allowance']=='0'?VIDYA[_0x143a3f(0x1e9)][_0x143a3f(0x14e)](Cubelets[_0x143a3f(0x176)],_0x143a3f(0x16d))[_0x143a3f(0x1a1)]({'from':accounts[0x0]})['on'](_0x143a3f(0x177),function(_0x4b3ccc){const _0x25083b=_0x143a3f;writeToConsole(_0x25083b(0x171));})['on'](_0x143a3f(0x1ba),function(_0x291234){const _0x3df49a=_0x143a3f;writeToConsole(_0x3df49a(0x1a5));}):await VIDYA['methods']['balanceOf'](accounts[0x0])[_0x143a3f(0x1ab)]()[_0x143a3f(0x1ed)](async function(_0x5547c6){const _0x45e457=_0x143a3f;parseFloat(web3[_0x45e457(0x155)][_0x45e457(0x192)](_0x5547c6))>=0x64?await uploadFile():writeToConsole(_0x45e457(0x1cc));});}async function uploadFile(){const _0x1965df=_0x2f4f9f;writeToConsole(_0x1965df(0x14f)),Moralis[_0x1965df(0x157)][_0x1965df(0x201)]()['then'](async function(_0x4b49c0){const _0x2120d9=_0x1965df;MoralisUser=Moralis[_0x2120d9(0x1a4)][_0x2120d9(0x1f7)]();if(imgData){writeToConsole(_0x2120d9(0x17f));let _0x3ab837=new Moralis[(_0x2120d9(0x1e0))](_0x2120d9(0x1bf),{'base64':imgData});await _0x3ab837[_0x2120d9(0x1c3)]();let _0x184109={'name':'Cubelet','description':accounts[0x0],'image':_0x3ab837[_0x2120d9(0x19a)]},_0x7c0acd=new Moralis[(_0x2120d9(0x1e0))](_0x2120d9(0x1d4),{'base64':btoa(JSON[_0x2120d9(0x16a)](_0x184109))});await _0x7c0acd['saveIPFS']();let _0x71b9df=_0x7c0acd[_0x2120d9(0x19a)],_0x5667d1=_0x7c0acd[_0x2120d9(0x194)];mint(_0x5667d1);}});}async function mint(_0x142186){const _0x746626=_0x2f4f9f;writeToConsole(_0x746626(0x188)),writeToConsole(_0x746626(0x1d0)),await Cubelets['instance'][_0x746626(0x1e9)][_0x746626(0x183)](_0x142186)[_0x746626(0x1a1)]({'from':accounts[0x0]})['on'](_0x746626(0x177),function(_0x3adb88){const _0x8510d7=_0x746626;writeToConsole(_0x8510d7(0x1e4));})['on'](_0x746626(0x1ba),function(_0x5adec4){writeToConsole('Process\x20completed!');});}$(document)[_0x2f4f9f(0x152)](function(){const _0x3f4b9e=_0x2f4f9f;$('body')['on'](_0x3f4b9e(0x193),_0x3f4b9e(0x191),function(){const _0x35791c=_0x3f4b9e;$('#acubething')[_0x35791c(0x1a2)]('explode'),$(_0x35791c(0x1dc))[_0x35791c(0x1aa)](),clearInterval(Cubelets[_0x35791c(0x1d2)]);}),$(_0x3f4b9e(0x1e7))['on'](_0x3f4b9e(0x193),'#gen3dBlockie',function(){generate();}),$('body')['on'](_0x3f4b9e(0x193),_0x3f4b9e(0x16c),function(){saveAs();}),$(_0x3f4b9e(0x1e7))['on']('click','#mintNFT',function(){mintCubelet();}),$('body')['on'](_0x3f4b9e(0x193),_0x3f4b9e(0x1e3),function(){loadCubelets();});});function _0x373f(_0x8f49fa,_0x59f4b0){const _0xb699ae=_0xb699();return _0x373f=function(_0x373fd8,_0x2f82c2){_0x373fd8=_0x373fd8-0x14c;let _0x15c1d7=_0xb699ae[_0x373fd8];return _0x15c1d7;},_0x373f(_0x8f49fa,_0x59f4b0);}let mesh,renderer,scene,camera,sprite;function setupScene(){const _0x5dfdbd=_0x2f4f9f;scene=new THREE[(_0x5dfdbd(0x1c4))](),camera=new THREE[(_0x5dfdbd(0x199))](0x2d,0xfa/0xfa),renderer=new THREE['WebGLRenderer']({'antialias':!![],'alpha':!![]}),renderer['setSize'](0xfa,0xfa),$('#Blockie3D')[_0x5dfdbd(0x1ad)](renderer[_0x5dfdbd(0x205)]);}function putCube(_0x4e8551){const _0x3a17da=_0x2f4f9f;accounts[0x0]!==_0x4e8551&&$(_0x3a17da(0x16c))[_0x3a17da(0x15c)](_0x3a17da(0x162));setupScene(),blockie=blockies[_0x3a17da(0x1c1)]({'seed':_0x4e8551['toLowerCase']()})[_0x3a17da(0x1c5)]();var _0x400b85=new THREE[(_0x3a17da(0x156))]();_0x400b85['crossOrigin']='',_0x400b85[_0x3a17da(0x198)](blockie,function(_0x453fb4){const _0x5bc34e=_0x3a17da;let _0x1ec94b=new THREE[(_0x5bc34e(0x195))](0x1,0x1,0x1),_0x2548bb=new THREE['MeshBasicMaterial']({'map':_0x453fb4}),_0x41e886=new THREE[(_0x5bc34e(0x196))](_0x1ec94b,_0x2548bb);scene[_0x5bc34e(0x204)](_0x41e886),_0x41e886[_0x5bc34e(0x18a)]['z']=-0x4,_0x41e886[_0x5bc34e(0x1b9)](22.5*THREE['Math'][_0x5bc34e(0x15e)]),_0x41e886[_0x5bc34e(0x1f4)](0x2d*THREE[_0x5bc34e(0x17b)]['DEG2RAD']),sprite=new THREE[(_0x5bc34e(0x1d3))]({'alignment':_0x5bc34e(0x1b7),'color':'#ffffff','strokeColor':_0x5bc34e(0x16e),'strokeWidth':0.02,'fontFamily':_0x5bc34e(0x173),'fontSize':0.35,'fontStyle':_0x5bc34e(0x182),'text':formatAddress(_0x4e8551)}),scene[_0x5bc34e(0x204)](sprite),sprite[_0x5bc34e(0x18a)]['z']=-0x4,sprite[_0x5bc34e(0x18a)]['y']=-1.25;var _0xc107de={'color1':{'type':'c','value':new THREE[(_0x5bc34e(0x1eb))](longHSLtoShort(color1))},'color2':{'type':'c','value':new THREE['Color'](longHSLtoShort(color2))}},_0x40d3bf=document[_0x5bc34e(0x1ae)](_0x5bc34e(0x207))['text'],_0x21ee0f=document['getElementById']('vertexShader')[_0x5bc34e(0x1d6)],_0x271fb8=new THREE['ShaderMaterial']({'uniforms':_0xc107de,'vertexShader':_0x21ee0f,'fragmentShader':_0x40d3bf}),_0x2e53bd=new THREE['PlaneGeometry'](0x4,0x4,0x4,0x4);mesh=new THREE['Mesh'](_0x2e53bd,_0x271fb8),scene[_0x5bc34e(0x204)](mesh),mesh['position']['z']=-0x5,scene['background']=new THREE[(_0x5bc34e(0x1eb))](longHSLtoShort(color3)),render();let _0x4ab4eb='image/png';imgData=renderer[_0x5bc34e(0x205)][_0x5bc34e(0x1c5)](_0x4ab4eb);},function(){},function(_0x1d9467){const _0x272961=_0x3a17da;console[_0x272961(0x164)](_0x1d9467);});}function render(){const _0x904626=_0x2f4f9f;renderer[_0x904626(0x163)](scene,camera),requestAnimationFrame(render);}function formatAddress(_0xcfb8f){const _0x4a9a5b=_0x2f4f9f;let _0x3ecfa2=_0xcfb8f[_0x4a9a5b(0x1f3)](0x0,0x6),_0xf43bcb=_0xcfb8f[_0x4a9a5b(0x1a3)](_0xcfb8f[_0x4a9a5b(0x1cf)]-0x4);return _0x3ecfa2+_0x4a9a5b(0x1ea)+_0xf43bcb;}function _0xb699(){const _0x1a863c=['allowance','slice','initialize','Ready\x20to\x20mint!','getApproved','position','round','msSaveOrOpenBlob','draggable','_new','balanceOf','12QTXZNJ','#aCubeThingCloseButton','fromWei','click','_hash','BoxBufferGeometry','Mesh','100','load','PerspectiveCamera','_ipfs','parent','<script\x20id=\x22vertexShader\x22\x20type=\x22x-shader/x-vertex\x22>\x20\x09\x09\x09\x09\x09\x09varying\x20vec2\x20vUv;\x20\x09\x09\x09\x09\x09\x09void\x20main()\x20{\x20\x09\x09\x09\x09\x09\x09vUv\x20=\x20uv;\x20\x09\x09\x09\x09\x09\x09gl_Position\x20=\x20projectionMatrix\x20*\x20modelViewMatrix\x20*\x20vec4(position,1.0);\x20\x09\x09\x09\x09\x09\x09}\x20\x09\x09\x09\x09\x09\x09</script>\x20\x09\x09\x09\x09\x09\x09<script\x20id=\x22fragmentShader\x22\x20type=\x22x-shader/x-fragment\x22>\x20\x09\x09\x09\x09\x09\x09uniform\x20vec3\x20color1;\x20\x09\x09\x09\x09\x09\x09uniform\x20vec3\x20color2;\x20\x09\x09\x09\x09\x09\x09varying\x20vec2\x20vUv;\x20\x09\x09\x09\x09\x09\x09void\x20main()\x20{\x20\x09\x09\x09\x09\x09\x09gl_FragColor\x20=\x20vec4(mix(color1,\x20color2,\x20vUv.y),1.0);\x20\x09\x09\x09\x09\x09\x09}\x20\x09\x09\x09\x09\x09\x09</script>','0x433285CF6e73E91A915CD4C8CB0c447C9F359fE1','_base','text/plain','bool','send','hide','substr','User','Approved!','9PeZoqb','975fvbLmT','bytes','22AcUWHp','remove','call','#Blockie3D','html','getElementById','approved','https://iuu6g7fymlha.moralis.io:2053/server','addClass','#acubething\x20.consoleHeader','#Main\x20.panel','32608OWIygi','error','11324930IaBkfg','center','_price','rotateX','receipt','transferOwnership','event','transferFrom','owner','image.png','changePrice','create','view','saveIPFS','Scene','toDataURL','cubelets/js/texture.js','previousOwner','outerHeight','OwnershipTransferred','serverURL','constructor','Not\x20enough\x20VIDYA...','navigator','css','length','Waiting\x20for\x20user\x20input...','cubelets/js/three.js','interval','TextSprite','file.json','withdrawERC20','text','operator','scrollTop','hidden','<div>','Transfer','#acubething','186FDdGWd','16wcrRRp','exec','File','Mint\x20NFT','safeTransferFrom','#cubelets_button','Pending\x20transaction...','show','nonpayable','body','<div\x20id=\x22acubething\x22\x20style=\x22width:256px;height:420px\x22\x20class=\x22hidden\x20console\x20absolute\x20bottom\x20draggable\x22\x20data=\x22acubething\x22>\x20<div\x20class=\x22consoleHeader\x20handle\x20ui-draggable-handle\x20flex-box\x20space-between\x20center-vertical\x22>\x20\x09<div\x20class=\x22flex-box\x20center-vertical\x22>\x20\x09\x09<div\x20class=\x22icon\x20icon-console-prompt\x22></div>\x20\x09\x09<div\x20class=\x22consoleTitle\x20default\x22>cubelets.exe</div>\x20\x09</div>\x20\x09<button\x20id=\x22aCubeThingCloseButton\x22\x20class=\x22close_button\x22>X</button>\x20</div>\x20<div\x20class=\x22console-content\x22\x20style=\x22overflow:hidden\x22>\x20\x09<div\x20id=\x22Blockie3D\x22></div>\x20\x09<div\x20id=\x22cubeletNav\x22\x20style=\x22display:flex;justify-content:space-between;align-items:center\x22><button\x20id=\x22gen3dBlockie\x22\x20class=\x22notify-btn\x22>Generate</button><button\x20id=\x22saveAs\x22\x20class=\x22notify-btn\x20disabled\x22>Save\x20As</button><button\x20id=\x22mintNFT\x22\x20class=\x22notify-btn\x20disabled\x22>Mint\x20NFT</button></div>\x20\x09<div\x20id=\x22cubeletsConsole\x22\x20class=\x22scrollbar\x22></div>\x20</div>\x20</div>','methods','...','Color','6423004pmDKbg','then','revokeObjectURL','Approve','ApprovalForAll','price','setItem','substring','rotateY','totalSupply','changeBase','current','string','Generate\x20wallets\x20and\x20save\x20them\x20to\x20disk.\x20Mint\x20as\x20NFT\x20costs\x20100\x20VIDYA\x20+\x20Gas.','function','tokenId','isApprovedForAll','attr','instance','removeChild','148565sWHHYC','authenticate','uint256','#cubeletNav','add','domElement','href','fragmentShader','from','#mintNFT','Contract','approve','Waiting\x20for\x20signature...','symbol','scrollHeight','ready','vT2bOCtQ8NHEF9hhOZie0NAyxaD5dTQw5D0AahMN','dragging','utils','TextureLoader','Web3','fold','abi','https://unpkg.com/moralis/dist/moralis.js','%,\x20','removeClass','.handle','DEG2RAD','green','setApprovalForAll','16840483wyrVag','disabled','render','log','#cubeletsConsole','toWei','80%','2px\x202px\x207px\x202px','append','stringify','download','#saveAs','115792089237316195423570985008687907853269984665640564039457584007913129639935','#000000','newOwner','.txt','Pending\x20approve...','bytes4','monospace','URL','createElement','address','transactionHash','16494NANXKH','replace','auto','Math','1630IIykJK','eth','active-console','Uploading\x20to\x20IPFS...','ownerOf','430038ExZaRS','normal','claim','getScript'];_0xb699=function(){return _0x1a863c;};return _0xb699();}function longHSLtoINT(_0xcb9138){const _0x480642=_0x2f4f9f;return Math[_0x480642(0x18b)](_0xcb9138[_0x480642(0x179)]('%',''));}function generate(){const _0x4b2d90=_0x2f4f9f;let _0x10d1af=web3[_0x4b2d90(0x17d)]['accounts']['create']();publicKey=_0x10d1af[_0x4b2d90(0x176)],privateKey=_0x10d1af['privateKey'],putCube(publicKey);}function saveAs(){const _0x22326b=_0x2f4f9f;publicKey[_0x22326b(0x1cf)]==0x2a&&privateKey[_0x22326b(0x1cf)]==0x42?download(publicKey+'\x0a'+privateKey,publicKey+_0x22326b(0x170),_0x22326b(0x19f)):console[_0x22326b(0x1b5)]('Invalid\x20address\x20or\x20private\x20key\x20length!');}function download(_0xdd980b,_0x1efe96,_0x25412a){const _0x470e2b=_0x2f4f9f;var _0x41f863=new Blob([_0xdd980b],{'type':_0x25412a});if(window[_0x470e2b(0x1cd)][_0x470e2b(0x18c)])window[_0x470e2b(0x1cd)][_0x470e2b(0x18c)](_0x41f863,_0x1efe96);else{var _0x5b7c51=document[_0x470e2b(0x175)]('a'),_0x1250f1=URL['createObjectURL'](_0x41f863);_0x5b7c51[_0x470e2b(0x206)]=_0x1250f1,_0x5b7c51[_0x470e2b(0x16b)]=_0x1efe96,document[_0x470e2b(0x1e7)]['appendChild'](_0x5b7c51),_0x5b7c51[_0x470e2b(0x193)](),setTimeout(function(){const _0x357d38=_0x470e2b;document['body'][_0x357d38(0x1ff)](_0x5b7c51),window[_0x357d38(0x174)][_0x357d38(0x1ee)](_0x1250f1);},0x0);}}function longHSLtoShort(_0x5b8e97){const _0x24993b=_0x2f4f9f;return regexp=/hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g,result=regexp[_0x24993b(0x1df)](_0x5b8e97)[_0x24993b(0x186)](0x1),'hsl('+result[0x0]+',\x20'+longHSLtoINT(result[0x1])+_0x24993b(0x15b)+longHSLtoINT(result[0x2])+'%)';}