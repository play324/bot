const fs = require("fs");
const {
  Client
} = require("discord.js");
const client = new Client();
const message = fs.readFileSync("./mensagem.txt").toString();

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const {
  token
} = require("./config.json");
const colors = require("colors")
const {
  red,
  yellow,
  greenBright,
  yellowBright,
  magenta
} = require("chalk");

client.on("ready", () => {
  client.user.setActivity("dormindo", {
      type: "PLAYING",
      url: "https://www.twitch.tv/"
    });
})
const tokeninvalido = `   
   
   ▄████▄   ██░ ██ ▓█████  ▄████▄   ██ ▄█▀▓█████  ██▀███  
   ▒██▀ ▀█  ▓██░ ██▒▓█   ▀ ▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒
   ▒▓█    ▄ ▒██▀▀██░▒███   ▒▓█    ▄ ▓███▄░ ▒███   ▓██ ░▄█ ▒
▒          ▓▓▄ ▄██▒░▓█ ░██ ▒▓█  ▄ ▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  
   ▒ ▓███▀ ░░▓█▒░██▓░▒████▒▒ ▓███▀ ░▒██▒ █▄░▒████▒░██▓ ▒██▒
   ░ ░▒ ▒  ░ ▒ ░░▒░▒░░ ▒░ ░░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
     ░  ▒    ▒ ░▒░ ░ ░ ░  ░  ░  ▒   ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
   ░         ░  ░░ ░   ░   ░        ░ ░░ ░    ░     ░░   ░ 
   ░ ░       ░  ░  ░   ░  ░░ ░      ░  ░      ░  ░   ░     
   ░                       ░                               

`;
const lofypainel = `


   ███╗   ███╗██╗███╗   ███╗ ██████╗     ██████╗ ██╗██╗   ██╗
   ████╗ ████║██║████╗ ████║██╔═══██╗    ██╔══██╗██║██║   ██║
   ██╔████╔██║██║██╔████╔██║██║   ██║    ██║  ██║██║██║   ██║
   ██║╚██╔╝██║██║██║╚██╔╝██║██║   ██║    ██║  ██║██║╚██╗ ██╔╝
   ██║ ╚═╝ ██║██║██║ ╚═╝ ██║╚██████╔╝    ██████╔╝██║ ╚████╔╝ 
   ╚═╝     ╚═╝╚═╝╚═╝     ╚═╝ ╚═════╝     ╚═════╝ ╚═╝  ╚═══╝  
                   dormindo`;

Main();

function Main() {
 
  
    console.clear();
  console.log(`${lofypainel}`.magenta);

  console.log("\n\n\n\n            [1] Modo Normal\n            [2] Modo com delay\n".yellow);
  readline.question("            [?] Escolha a opção: ".magenta, answer => {
    switch (answer) {
      case "1":
        readline.question(
          "            [!] ID do servidor: ".magenta,
          response => {
            ScrapeUsers(response).then(() => {
              console.log("            [!] Carregando dados".green);
              setTimeout(() => {
                MassDMNormal(null, message).catch(err => {
                  console.log(err);
                  setTimeout(() => {
                    console.log("            [!] Aviso: reiniciando.".yellow);
                  }, 1000);
                  setTimeout(() => {
                    process.exit(1);
                  }, 2000);
                });
              }, 2000);
            });
          }
        );
        break;
      case "2":
        readline.question("            [!] ID do servidor: ".blue, response => {
          ScrapeUsers(response).then(() => {
            setTimeout(() => {
              readline.question(
                "\n            [i] Defina o número de segundos que o bot espera\n            Antes de enviar mensagens aos usuários.\n            [i] Limite(s): 3 - 9 segundos\n\n            [!] Digite o limite: "
                .yellow,
                timeout => {
                  if (
                    timeout === "3" ||
                    timeout === "4" ||
                    timeout === "5" ||
                    timeout === "6" ||
                    timeout === "7" ||
                    timeout === "8" ||
                    timeout === "9"
                  ) {
                    const timer = parseInt(timeout) * 1000;
                    console.log("            [!] Carregando dados".green);
                    MassDMTimeOut(null, timer, message).catch(err => {
                      console.log(err);
                      setTimeout(() => {
                        console.log("            [!] Aviso Reiniciando.".yellow);
                      }, 1000);
                      setTimeout(() => {
                        process.exit(1);
                      }, 2000);
                    });
                  } else {
                    console.log(
                      red("            [!] Um numero invalido foi usado".red)
                    );
                    setTimeout(() => {
                      console.log("            [!] Aviso Reiniciando.".yellow);
                    }, 1000);
                    setTimeout(() => {
                      process.exit(1);
                    }, 2000);
                  }
                }
              );
            }, 2000);
          });
        });
        break;
      default:
        console.log(red("            [!] Uma opção errada foi usada".red));
    }
  });
}

/**
 * @param {string} guildID
 */

async function ScrapeUsers(guildID) {
  client.guilds
    .fetch(guildID)
    .then(guild => {
      const file_path = "ids.json";
      const MemberIDs = guild.members.cache.map(users => users.id);
      console.log(
        "            [!] " +
        MemberIDs.length +
        " ID de usuários anotados".yellow
      );
      console.log("")
      const Data = {
        IDs: MemberIDs
      };
      const content = JSON.stringify(Data, null, 2);
      fs.writeFileSync(file_path, content, err => {
        if (err)
          return console.log(
            "            [X] Erro ao gravar o arquivo: ".red + err
          );
        console.log(
          "            [V] Arquivo gravado com sucesso ".red + file_path
        );
      });
    })
    .catch(err => {
      console.log(`            [X] Id do servidor esta invalido`.red);
      setTimeout(() => {
        console.log("            [!] Aviso Reiniciando.".yellow);
      }, 1000);
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    });
}

/**
 * @param {array} users
 * @param {number} timeout
 * @param {string} msg
 */

function MassDMTimeOut(users, timeout, msg) {
  return new Promise((resolve, reject) => {
    const scraped = require("./ids.json");
    users = scraped.IDs;
    if (typeof timeout != "number") {
      reject("            [X] Erro de tempo limite: dados incorreto usado.".red);
    } else if (typeof msg != "string") {
      reject(
        "            [!] Erro de Args da mensagem: Deve-se usar o tipo de dados 'string'"
        .red
      );
    } else {
      for (let i = 0; i <= users.length; i++) {
        client.users
          .fetch(users[i])
          .then(u => {
            (function (i) {
              setTimeout(function () {
                u.send(msg)
                  .then(() =>
                    console.log(
                      "            [✓] Mensagem enviada para: ".green +
                      u.tag.yellow
                    )
                  )
                  .catch(err =>
                    console.log(
                      "            [X] Erro ao enviar mensagem para: ".red +
                      u.tag.yellow
                    )
                  );
              }, timeout * i);
            })(i);
          })
          .catch(err =>
            console.log(
              `            [X] Verificando problemas no bot.\n            Erro encontrado: ${err}\n`.red
            )
          );
      }
      resolve();
    }
  });
}

/**
 * @param {array} users
 * @param {string} msg
 */

function MassDMNormal(users, msg) {
  return new Promise((resolve, reject) => {
    const scraped = require("./ids.json");
    users = scraped.IDs;
    for (let i = 0; i <= users.length; i++) {
      client.users
        .fetch(users[i])
        .then(u => {
          u.send(msg)
            .then(() =>
              console.log(
                "            [R] Mensagem enviada para: ".green + u.tag.yellow
              )
            )
            .catch(err =>
              console.log(
                "            [X] Erro ao enviar mensagem para: ".red +
                u.tag.yellow
              )
            );
        })
        .catch(err =>
          console.log(
            `            [X] Verificando problemas no bot.\n            Erro encontrado: ${err}\n`.red
          )
        );
    }
    resolve();
  });
}

client.login(token).catch(err => {
  console.clear();
  process.title = `Erro | Token Invalido`;
  console.log(
    `
${tokeninvalido}
`.magenta
  );
  console.log(
    `            UM token invalido foi usado\n            mude-o e não esqueça de ativar as opções no painel do bot\n            Motivo Real: ${err}`
    .yellow
  );
  process.exit();
});