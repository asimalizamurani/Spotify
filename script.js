
console.log("Lets write js")
async function main() {

    let a = await fetch("http//127.0.0.1:8000/songs/");
    let response = await a.text();
    console.log(response);
}

main();