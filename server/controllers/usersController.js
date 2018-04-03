var userService = require("../services").userService;
var commonService = require("../services").commonService;
const { check, validationResult } = require('express-validator/check');

module.exports = {
    addEmployee:function(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(errors.array({ onlyFirstError: true })[0] || {});
        }
        userService.addEmployee(req.body,function(err,userSave){
            if(err)
                return next(err);
            let responseObj = commonService.response;
            responseObj.setStatus(true);
            responseObj.setMessage("Successfully Added");
            responseObj.setData();
            res.send(responseObj);
        });
    },
    updateEmployee : function(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(errors.array({ onlyFirstError: true })[0] || {});
        }
        userService.updateUser(req.body,function(err,userSave){
            if(err)
                return next(err);
            let responseObj = commonService.response;
            responseObj.setStatus(true);
            responseObj.setMessage("Successfully updated");
            responseObj.setData();
            res.send(responseObj);
        })
    },
        
    deleteEmployee : function(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(errors.array({ onlyFirstError: true })[0] || {});
        }
        userService.removeUser(req.query.emailAddress,function(err,doc){
            if(err)
            return next(err);

        let responseObj = commonService.response;
        responseObj.setStatus(true);
        responseObj.setMessage("Successfully removed employee data.");
        responseObj.setData();
        res.send(responseObj);
    
        })
    },
    readEmployee : function(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(errors.array({ onlyFirstError: true })[0] || {});
        }
        userService.readUser(req.query.emailAddress,function(err,userDoc){
            if(err && !userDoc)
                return next(err || {msg:"Email Address don't exist"});

            let responseObj = commonService.response;
            responseObj.setStatus(true);
            responseObj.setMessage("Successfully retrieved employee data.");
            responseObj.setData(userDoc);
            res.send(responseObj);
        });
    },
    readAllEmployee: function(req,res,next){
        userService.readAllUser(function(err , userList){
            if(err)
                return next(err);

            let responseObj = commonService.response;
            responseObj.setStatus(true);
            responseObj.setMessage("Successfully retrieved all employees data.");
            responseObj.setData(userList);
            res.send(responseObj);
        });
    },
    userIdMiddleWare : function(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(errors.array({ onlyFirstError: true })[0] || {});
        }
        let emailAddress = req.query.emailAddress || req.body.emailAddress;
        userService.readUser(emailAddress,function(err,userDoc){
            if(err || !userDoc)
                return next(err || {msg:"Email Address don't exist"});
            req.userId = userDoc._id;
            next();
        });
    },
    commonValidator : [
        check('emailAddress')
        .isEmail().withMessage('emailAddress ,must be an email')
        .trim()
        .normalizeEmail(),

        check("phoneNumber","phoneNumber is must be 10 digit")
        .isInt()
        .optional()
        .isLength({ min: 10 })
    ],
    addEmployeeValidator : [
        check('emailAddress')
        .isEmail().withMessage('emailAddress ,must be an email')
        .trim()
        .normalizeEmail(),
        // .custom(value => {
        //   return userService.readUser(value,(err,user) => {
        //       if(user)
        //         throw new Error('this email is already in use');
        //   })
        // }),
        
        check("phoneNumber","phoneNumber is required")
        .exists()
        .isInt()
        .isLength({ min: 10 }),
        
        check("firstName","firstName Must have value")
        .exists(),
    
        check("lastName","lastName Must have value")
        .exists()
    ]
}