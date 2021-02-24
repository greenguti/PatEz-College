module.exports = function() {
    var express = require('express');
    var router = express.Router();

    function getAllMajors(res,mysql,context,complete){
    	mysql.pool.query("SELECT major_id as id, name, college, undergraduate FROM Majors ORDER BY name", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}

    		context.majs = results;
    		context.majs.forEach(element => changeBool(element))
    		complete();
    	});
    }

    

    function getMajorName(req,res,mysql,context,complete){
    	var query = "SELECT SELECT major_id as id, name, college, undergraduate FROM Majors WHERE college LIKE " + mysql.pool.escape(req.params.s + '%');
    	mysql.pool.query(query, function(error,results,fields){
    	if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}

    		context.majs = results;
    		context.majs.forEach(element => changeBool(element))
    		complete();
    	});
    }

        function changeBool(element) {
        if (element.undergraduate == 1) {
            element.undergraduate = "Yes"
        } else {
            element.undergraduate = "No"
        }
    }

    router.get('/', function(req, res) {
    	var callbackCount = 0;
    	var context = {};
    	context.jsscripts = ["getMajorByCollege.js"];
    	var mysql = req.app.get('mysql')
    	getAllMajors(res,mysql,context,complete)

    	function complete(){
    		callbackCount++;
    		if(callbackCount >= 1){
    			res.render('majors',context)
    			console.log(context)
    		}
    	}
    });

    router.get('/search/:s/',function(req,res){
    	var callbackCount = 0;
    	var context = {};
    	context.jsscripts = ["getMajorByCollege.js"];
    	var mysql = req.app.get('mysql')
    	getStudentLastName(req,res,mysql,context,complete);

    	function complete(){
    		callbackCount++;
    		if(callbackCount >= 1){
    			res.render('majors',context);
    		}
    	}
    })

     router.post('/', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Majors (major_id, name, college, undergraduate) VALUES (?,?,?,?)"

         // change string to bool
        if (req.body.undergraduate == "Yes") {
            req.body.undergraduate = 1
        } else if (req.body.undergraduate == "No") {
            req.body.undergraduate = 0
        }

        var inserts = [req.body.majID, req.body.majName, req.body.Coll, req.body.underG]
        console.log(inserts)
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/majors');
            }
        });
    })



    router.get('/', function(req, res) {
        res.render('majors')
    });

    return router;
}();