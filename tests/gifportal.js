const anchor = require('@project-serum/anchor')

const main = async () => {
    console.log("Starting test...");
    //run code locally
    //const provider = anchor.Provider.local();
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.Gifportal;
    const tx = await program.rpc.startStuffOff();
    console.log('Transaction signature: ', tx);
}

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