module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // selects all enrollments
    function getAllEnrolls(res, mysql, context, complete) {
        mysql.pool.query("SELECT Enrollments.student_id AS sid, CONCAT(Students.last_name,', ',Students.first_name)\
         AS sName, Enrollments.class_id AS cid, Classes.name As cName, Enrollments.grade FROM Enrollments\
         JOIN Students ON Enrollments.student_id = Students.student_id JOIN\
         Classes ON Enrollments.class_id = Classes.class_id ORDER BY sName", function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            context.enrolls = results;

            complete();
        });
    }

    /*find enrollments whose class name starts with given string*/
    function getEnrollByClass(req, res, mysql, context, complete) {
        var query = "SELECT Enrollments.student_id AS sid, CONCAT(Students.last_name,', ',Students.first_name) AS sName, Enrollments.class_id AS cid, Classes.name as cName, Enrollments.grade FROM Enrollments JOIN Students ON Enrollments.student_id = Students.student_id JOIN Classes ON Enrollments.class_id = Classes.class_id WHERE Classes.name LIKE " + mysql.pool.escape(req.params.s + '%') + " ORDER BY cName, sName"

        mysql.pool.query(query, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.enrolls = results;
            complete();
        });

    }

    /*find enrollments by student id*/
    function getEnrollBySid(req, res, mysql, context, complete) {
        var query = "SELECT Enrollments.student_id AS sid, CONCAT(Students.last_name,', ',Students.first_name) AS sName, Enrollments.class_id AS cid, Classes.name as cName, Enrollments.grade FROM Enrollments JOIN Students ON Enrollments.student_id = Students.student_id JOIN Classes ON Enrollments.class_id = Classes.class_id WHERE Enrollments.student_id=" + mysql.pool.escape(req.params.s) + " ORDER BY cName"

        mysql.pool.query(query, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.enrolls = results;
            complete();
        });

    }
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchEnrollByClass.js", "searchEnrollBySid.js"];
        var mysql = req.app.get('mysql')
        getAllEnrolls(res, mysql, context, complete)

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('enrollments', context);
                console.log(context)
            }
        }
    });

    /*Display enrollments whose class name starts with given string.*/
    router.get('/by_class/:s/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchEnrollByClass.js", "searchEnrollBySid.js"];
        var mysql = req.app.get('mysql');
        getEnrollByClass(req, res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('enrollments', context);
            }
        }
    })

    /*Display enrollments with given student id*/
    router.get('/by_sid/:s/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchEnrollByClass.js", "searchEnrollBySid.js"];
        var mysql = req.app.get('mysql');
        getEnrollBySid(req, res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('enrollments', context);
            }
        }
    })

    // add enrollment and redirect to enrollments page to display
    router.post('/', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Enrollments (class_id, student_id, grade) VALUES((SELECT class_id FROM Classes WHERE name = ?),?,?)"
        var inserts = [req.body.cName, req.body.sid, req.body.grade]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/enrollments');
            }
        });
    })

    return router;
}();