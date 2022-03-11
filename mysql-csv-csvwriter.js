const mysql = require("mysql2");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "ProjectData"
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;

  // query data from MySQL
  connection.query("SELECT * FROM wearables", function(error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    const csvWriter = createCsvWriter({
      path: "wearables.csv",
      header: [
        { id: "ItemID", title: "ItemID" },
        { id: "Name", title: "Name" },
        { id: "Description", title: "Description" },
        { id: "Category", title: "Category" },
        { id: "Type", title: "Type" },
        { id: "TotalSupply", title: "TotalSupply" },
        { id: "MaxSupply", title: "MaxSupply" },
        { id: "Rarity", title: "Rarity" },
        { id: "CreationFee", title: "CreationFee" },
        { id: "Created", title: "Created" },
        { id: "Updated", title: "Updated" },
        { id: "Reviewed", title: "Reviewed" },
        { id: "Available", title: "Available" },
        { id: "Price", title: "Price" },
        { id: "Sold", title: "Sold" },
        { id: "Sales", title: "Sales" },
        { id: "Volume", title: "Volume" },
        { id: "Creator", title: "Creator" },
        { id: "Beneficiary", title: "Beneficiary" },
        { id: "URI", title: "URI" },
        { id: "URN", title: "URN" }

      ]
    });

    csvWriter
      .writeRecords(jsonData)
      .then(() =>
        console.log("Write to bezkoder_mysql_csvWriter.csv successfully!")
      );
  });
});
