module.exports = function() {
    var express = require('express');
    var router = express.Router();

    function getAllClasses(res,mysql,context,complete){
    	mysql.pool.query("SELECT Cname,capacity,major_id, CONCAT(Professors.last_name,', ',Professors.first_name)\ AS pName, FROM Classes ORDER BY name", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}

    		context.Cla = results;
    		context.Cla.forEach(element => changeBool(element))
    		complete();
    	});
    }

    function getClassName(req,res,mysql,context,complete){
    	var query = "SELECT Cname,capacity,major_id, CONCAT(Professors.last_name,', ',Professors.first_name)\ AS pName, FROM Classes WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');
    	mysql.pool.query(query, function(error,results,fields){
    	if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}

    		context.Cla = results;
    		context.Cla.forEach(element => changeBool(element))
    		complete();
    	});
    }

    router.get('/', function(req, res) {
    	var callbackCount = 0;
    	var context = {};
    	context.jsscripts = ["getClassByName.js"];
    	var mysql = req.app.get('mysql')
    	getAllClasses(res,mysql,context,complete)

    	function complete(){
    		callbackCount++;
    		if(callbackCount >= 1){
    			res.render('classes',context)
    			console.log(context)
    		}
    	}
    });

    router.get('/search/:s/',function(req,res){
    	var callbackCount = 0;
    	var context = {};
    	context.jsscripts = ["getClassByName.js"];
    	var mysql = req.app.get('mysql')
    	getClassName(req,res,mysql,context,complete);

    	function complete(){
    		callbackCount++;
    		if(callbackCount >= 1){
    			res.render('classes',context);
    		}
    	}
    })


     router.post('/', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Classes (Cname, capacity, major_id,pName) VALUES (?,?,?,?,?)"

        var inserts = [req.body.cid, req.body.Clname, req.body.cap, req.body.mid, req.body.eid]
        console.log(inserts)
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/classes');
            }
        });
    })

    return router;
}();