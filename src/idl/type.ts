export type Marketplace = {
  version: "0.1.0";
  name: "marketplace";
  instructions: [
    {
      name: "initMaster";
      accounts: [
        {
          name: "masterAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "fee";
          type: "u8";
        },
      ];
    },
    {
      name: "list";
      accounts: [
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "listingAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "seller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "marketTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "price";
          type: "u64";
        },
      ];
    },
    {
      name: "buy";
      accounts: [
        {
          name: "listingAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "seller";
          isMut: true;
          isSigner: false;
          docs: ["CHECK"];
        },
        {
          name: "marketTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: "listing";
      type: {
        kind: "struct";
        fields: [
          {
            name: "price";
            type: "u64";
          },
          {
            name: "seller";
            type: "publicKey";
          },
          {
            name: "tokenMint";
            type: "publicKey";
          },
        ];
      };
    },
    {
      name: "master";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "marketFee";
            type: "u8";
          },
          {
            name: "initialized";
            type: "bool";
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "MasterAlreadyInitialized";
      msg: "Master already has been initialized";
    },
  ];
};

export const IDL: Marketplace = {
  version: "0.1.0",
  name: "marketplace",
  instructions: [
    {
      name: "initMaster",
      accounts: [
        {
          name: "masterAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "fee",
          type: "u8",
        },
      ],
    },
    {
      name: "list",
      accounts: [
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "listingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "seller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "marketTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "price",
          type: "u64",
        },
      ],
    },
    {
      name: "buy",
      accounts: [
        {
          name: "listingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "seller",
          isMut: true,
          isSigner: false,
          docs: ["CHECK"],
        },
        {
          name: "marketTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "listing",
      type: {
        kind: "struct",
        fields: [
          {
            name: "price",
            type: "u64",
          },
          {
            name: "seller",
            type: "publicKey",
          },
          {
            name: "tokenMint",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "master",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "marketFee",
            type: "u8",
          },
          {
            name: "initialized",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "MasterAlreadyInitialized",
      msg: "Master already has been initialized",
    },
  ],
};
