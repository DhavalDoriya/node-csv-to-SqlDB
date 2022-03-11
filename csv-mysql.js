const fs = require("fs");
const mysql = require("mysql2");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("wearables.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "admin",
      password: "admin",
      database: "ProjectData"
    });

    // open the connection
    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        // let query ="INSERT INTO category (id, name, description, createdAt) VALUES ?";

          let abc = "INSERT INTO wearables (ItemID ,Name ,Description ,Category ,Type ,TotalSupply ,MaxSupply ,Rarity ,CreationFee ,Created ,Updated ,Reviewed ,Available ,Price ,Sold ,Sales ,Volume ,Creator ,Beneficiary ,URI ,URN ) VALUES ?";

          // console.log(csvData);
        connection.query(abc, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);
