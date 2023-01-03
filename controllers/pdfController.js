//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");



exports.pdfTest = (req, res) => {


    // Read HTML Template
    var html = fs.readFileSync(__basedir + "/pdf/templates/template.html", "utf8");
    var options = {
        format: "A4",
        orientation: "landscape",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    var users = [
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },

        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drick",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
        {
            name: "tom",
            age: "21",
        },
        {
            name: "drik",
            age: "23",
        },
        {
            name: "harry",
            age: "29",
        },
    ];
    var document = {
        html: html,
        data: {
            users: users,
        },
        path: __basedir + '/pdf/output/' + Date.now() + '.pdf',
        type: "pdf",
    };

    pdf.create(document, options)
        .then((response) => {
            console.log(response);
            res.send('Pdf generated');
        })
        .catch((error) => {
            console.error(error);
            res.send('Pdf failed');
        });
}