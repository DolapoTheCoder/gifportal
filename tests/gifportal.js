const anchor = require('@project-serum/anchor')

const main = async () => {
    console.log("Starting test...");
    //run code locally
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.Gifportal;
    //credentials for base account we are creating
    const baseAccount = anchor.web3.Keypair.generate();
    const tx = await program.rpc.startStuffOff({
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers:[baseAccount]
    });
    console.log('Transaction signature: ', tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("GIF Count", account.totalGifs.toString());

    await program.rpc.addGif("https://media.giphy.com/media/Qa5GIxT3cGdl24em7o/giphy.gif", {
        accounts: {
            baseAccount:baseAccount.publicKey,
            user: provider.wallet.publicKey,
        },
    });

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('New Gif Count: ', account.totalGifs.toString());
    console.log('Gif List: ', account.gifList);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);  
    }
}

runMain();