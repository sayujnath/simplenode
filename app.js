const http = require('http');

const PORT = parseInt(process.env.PORT) || 3000;

const ports = {
    prod : 3000,
    dev : 4000,
    test : 5000
}



var title, body;
    
switch (PORT) {
    case ports.prod:
        title = 'Production Server';
        break;
    case ports.dev:
        title = 'Development Server';
        break;
    case ports.test:
        title = 'Test Server';
        break;
}


const server = http.createServer(async (req,res) => {
    console.log(req.url, req.method, req.headers);
    //process.exit();
    body = await test_sequence();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(`
    <head>
    <style>
        h2.header {
            font-family: "Trebuchet MS", sans-serif;
            font-size: 3em;
            letter-spacing: -2px;
            border-bottom: 2px solid black;
            text-transform: uppercase;
        }
        h3.subheader{
            font-family: times, Times New Roman, times-roman, georgia, serif;
            font-size: 18px;
            line-height: 0px;
            letter-spacing: -1px;color: #444;
        }
        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }

        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }

        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }

        .styled-table tbody tr.active-row {
            font-weight: bold;
            color: #009879;
        }

    </style>
        <h1>
            <title>CANDITUDE Node.Js Server Test</title>
        </h1>
    </head>`);
    res.write(`
    <body>
        <h2 class="header">${title}</h2></p>
        <h3 class="subheader">Serve connectivity test results</h3></p>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Test Name</th>
                    <th>Status</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
            ${body}
            </tbody>
        </table>
        
    </body>`
    );
    
    res.write('</html>');
});

console.log(`SimpleNode ${title} listening on port ${PORT}`)
server.listen(PORT);


async function test_sequence()    {
    results = await result_row(test_internet_access("http://google.com"));
    results = results + await result_row(test_internet_access("www.google.com"));
    results = results + await result_row(test_internet_access("www.google.com"));
    results = results + await result_row(test_internet_access("www.google.com"));
    results = results + await result_row(test_internet_access("www.google.com"));
    return results; 
    // test_database_access();
    // test_cloudwatch-endpoints();
    // test_vpc_endpoint_access();
    // test_security_groups();
    // test_cd_ci_access();
}



async function test_internet_access(url)    {
    var result;
    return new Promise((resolve, reject) => {
        require('dns').resolve(url, function(err) {
            if (err) {
                result = get_result('Internet Access:', 'FAIL', `Unable to internet access at ${url}`);
                return result;
            } 
            else {
                result = get_result('Internet Access:', 'PASS', `Able to connect with external server via intenet at ${url}`);
                return result;
            }
        }
    )});
    }


function result_row(result)    {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return(
            `<tr>
                <th>${year}-${month}-${date} ${hours}:${minutes}:${seconds}</th>
                <th>${result.name}</th>
                <th>${result.status}</th>
                <th>${result.comment}</th>
            </tr>`);   
}


function result_line(result)    {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + `\t${result.name}\t${result.status}\t${result.comment}\n`);
    
}





function get_result(name, status, comment)    {
    return {
        name: name,
        status: status,
        comment : comment
    }
}
