const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 1234;


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * start express server 
 */


app.listen(port, () => {
    console.info(`server is live on ${port}`)
})


/**
 * creating an array for data storage
 */

let dataArr = [];

app.get('/', (req, res) => {
    return res.json({
        status: true,
        message: 'nodulator lives'
    })
});


/**
 * add new user
 */

app.post('/userInput', (req, res) => {
    const { numOne, numTwo, Operation } = req.body; // destructuring
    
    let newCal = {
        
        numOne: numOne,
        numTwo: numTwo,
        Operation: Operation
    }

    dataArr.push(newCal);
    return res.json({
        status: true,
        message: 'calculator instructions',
        data: newCal
    });
});



/**
 * get userinput by operation
 */


app.get('/userInput/:Operation', (req, res) => {
    // const Operation = req.params.Operation;


    if(dataArr.length > 0) {
    // find in array 
    dataArr.forEach((element) => {
            
            //Assigining user inputs to variables
            let numOne = element.numOne;
            let numTwo = element.numTwo;
            let result;


        // Addition Operation
        if(element.Operation === "Addition") {
            
            result = numOne + numTwo;
            return res.json({
                status: true,
                data : result
            })
        }

        // Subtraction Operation
        else if (element.Operation === "Subtraction") {
               
              if( numOne > numTwo) {
                result = numOne - numTwo;
                return res.json({
                    status: true,
                    data : result
                })
              }  else {
                  result = numTwo - numOne;
                  return res.json({
                    status: true,
                    data : result
                })
              }
         }
 
        
        // Multiplication Operation
        else if (element.Operation === "Multiplication") {

            result = numOne * numTwo;
            return res.json({
                status: true,
                data : result
            })
        }

        // Division Operation
        else if (element.Operation === "Division") {

            result = numOne / numTwo;
            return res.json({
                status: true,
                data : result
            })
        }

        //invalid Operation
        // else if (element.Operation !== "Addition"   ||   element.Operation !== "Subtraction"  ||   element.Operation !== "Division"  ||  element.Operation !== "Multiplication") {
        //     return res.json({
        //         status: false,
        //         message : "invalid input"
        //     })
        // } 

        

    })
    } else {
        dataArr.length == 0;
        return res.json({
            status: false,
            message: 'no data found or invalid operation'
        })
    }
 });

