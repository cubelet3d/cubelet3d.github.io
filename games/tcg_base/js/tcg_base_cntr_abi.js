const tcg_base_cntr_abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tcgInventoryAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_gameAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "countTemplatesByOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "templateId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "count",
						"type": "uint256"
					}
				],
				"internalType": "struct TemplateCounter.TemplateCount[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];