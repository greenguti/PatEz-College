module.exports = function() {
    var express = require('express');
    var router = express.Router();




    function getAllProfs(res, mysql, context, complete) {
        mysql.pool.query("SELECT employee_id AS id, first_name, last_name, college, tenured FROM Professors", function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            context.profs = results;
            context.profs.forEach(element => changeBool(element))
            complete();
        });
    }

    /*find professors whose last name starts with given string*/
    function getProfLastName(req, res, mysql, context, complete) {
        var query = "SELECT employee_id as id, first_name, last_name, college, tenured FROM Professors WHERE last_name LIKE " + mysql.pool.escape(req.params.s + '%');
        mysql.pool.query(query, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.profs = results;
            context.profs.forEach(element => changeBool(element));
            complete();
        });

    }

    function changeBool(element) {
        if (element.tenured == 1) {
            element.tenured = "Yes"
        } else {
            element.tenured = "No"
        }
    }



    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["getProfByName.js"]
        var mysql = req.app.get('mysql')
        getAllProfs(res, mysql, context, complete)

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('professors', context);
                console.log(context)
            }
        }
    });

    /*Display professors whose last name starts with given string.*/
    router.get('/search/:s/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["getProfByName.js"];
        var mysql = req.app.get('mysql');
        getProfLastName(req, res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('professors', context);
            }
        }
    })
    return router;
}();