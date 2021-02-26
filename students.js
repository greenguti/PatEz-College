module.exports = function() {
    var express = require('express');
    var router = express.Router();

    function getAllStudents(res,mysql,context,complete){
    	mysql.pool.query(" SELECT student_id as id, first_name,last_name,gpa, major_id FROM Students ORDER BY last_name", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}

    		context.stud = results;
    		complete();
    	});
    }

    function getStudentLastName(req,res,mysql,context,complete){
    	var query = "SELECT student_id as id, first_name, last_name, gpa, major_id FROM Students WHERE last_name LIKE " + mysql.pool.escape(req.params.s + '%');
    	mysql.pool.query(query, function(error,results,fields){
    	if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}

    		context.stud = results;
    		complete();
    	});
    }


    router.get('/', function(req, res) {
    	var callbackCount = 0;
    	var context = {};
    	context.jsscripts = ["getStudentByName.js"];
    	var mysql = req.app.get('mysql')
    	getAllStudents(res,mysql,context,complete)

    	function complete(){
    		callbackCount++;
    		if(callbackCount >= 1){
    			res.render('students',context)
    			console.log(context)
    		}
    	}
    });

    router.get('/search/:s/',function(req,res){
    	var callbackCount = 0;
    	var context = {};
    	context.jsscripts = ["getStudentByName.js"];
    	var mysql = req.app.get('mysql')
    	getStudentLastName(req,res,mysql,context,complete);

    	function complete(){
    		callbackCount++;
    		if(callbackCount >= 1){
    			res.render('students',context);
    		}
    	}
    })

     router.post('/', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (first_name, last_name, gpa, major_id) VALUES (?,?,?,?)"

        var inserts = [req.body.fname, req.body.lname, req.body.gpa, req.body.majorid]
        console.log(inserts)
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/students');
            }
        });
    })

    return router;
}();
