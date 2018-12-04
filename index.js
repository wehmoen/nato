const txtomp3 = require("text-to-mp3");
txtomp3.attributes.tl ="en";
const randomstring = require("randomstring");
const fs = require("fs");

let natoAlphabet = new Map();
natoAlphabet.set("A", "Alpha");
natoAlphabet.set("B", "Bravo");
natoAlphabet.set("C", "Charlie");
natoAlphabet.set("D", "Delta");
natoAlphabet.set("E", "Echo");
natoAlphabet.set("F", "Foxtrot");
natoAlphabet.set("G", "Golf");
natoAlphabet.set("H", "Hotel");
natoAlphabet.set("I", "India");
natoAlphabet.set("J", "Juliet");
natoAlphabet.set("K", "Kilo");
natoAlphabet.set("L", "Lima");
natoAlphabet.set("M", "Mike");
natoAlphabet.set("N", "November");
natoAlphabet.set("O", "Oscar");
natoAlphabet.set("P", "Papa");
natoAlphabet.set("Q", "Quebec");
natoAlphabet.set("R", "Romeo");
natoAlphabet.set("S", "Sierra");
natoAlphabet.set("T", "Tango");
natoAlphabet.set("U", "Uniform");
natoAlphabet.set("V", "Victor");
natoAlphabet.set("W", "Whiskey");
natoAlphabet.set("X", "X-ray");
natoAlphabet.set("Y", "Yankee");
natoAlphabet.set("Z", "Zulu");

function toNato(string) {
    let natoStringArray = [];
    string = string.toUpperCase().replace(/[^A-Z\s]/g, "");
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== " ") {
            natoStringArray.push(natoAlphabet.get(string[i]));
        }
    }

    return natoStringArray.join(" ");
}

function toMP3(string) {

    let filename = randomstring.generate(12);

    txtomp3.getMp3(string, function(err, binaryStream){
        if(err){
            console.log(err);
            return;
        }
        if (!fs.existsSync('./mp3_files'))
            fs.mkdirSync('mp3_files');
        let file = fs.createWriteStream("mp3_files/"+filename+'.mp3'); // write it down the file
        file.write(binaryStream);
        file.end();
        console.log('Text has been saved to mp3_files/'+filename+'.mp3.')
    });

}

let originalText = "Hallo Welt.";
let natoText = toNato(originalText);

toMP3(natoText);