var sampleObj = require('./Sample');
var assert = require("assert");

//import * as sampleObj from './Sample.json';
var expect = require('chai').expect,
    tObj = sampleObj.categoryHasProducts.keys;

//Check body is ArrayofArray or Object,if it is Object it should contain only 2 recommended values 
const keySwitch = [
    {
        "priority": "number",
        "product_id": "number"
    },
    {
        "priority": "number",
        "product_id": "number",
        "id": "number",
        "products_id": "number",
        "products": "string",
        "isActive": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "createdBy": "string",
        "updatedBy": "string"
    }
];

var objectTester = function (Obj) {
    let x = Obj, tKeys = Object.keys(tObj);

    // Checking if Object has all the required keys
    //console.log("Keys "+tKeys);
    //console.log("X values are "+x);

        console.log("tKeys are "+JSON.stringify(tKeys));
    tKeys.forEach((key) =>{
        //console.log("valueeee keys "+key);
        try{
        expect(x).to.have.own.property(key);
        }
        catch(e){
            console.log("error is "+e);
        }
    }
    );

    x = Obj.productHasCategory, tKeys = Object.keys(tObj.productHasCategory.keys);
    // Checking if Object.productHasCategory has all the keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasCategory.categories_has_products, tKeys = Object.keys(tObj.productHasCategory.keys.categories_has_products.keys);
    // Checking if Object.productHasCategory has all the categories_has_products keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasAttributes, tKeys = Object.keys(tObj.productHasAttributes.keys);
    // Checking if Object.productHasAttributes has all the keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasAttributes.products_has_attrributes, tKeys = Object.keys(tObj.productHasCategory.keys.products_has_attrributes.keys);
    // Checking if Object.productHasAttributes has all the products_has_attrributes keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasSizes, tKeys = Object.keys(tObj.productHasSizes.keys);
    // Checking if Object.productHasSizes has all the keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasSizes.products_has_sizes, tKeys = Object.keys(tObj.productHasCategory.keys.products_has_sizes.keys);
    // Checking if Object.productHasSizes has all the products_has_sizes keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasIngredients, tKeys = Object.keys(tObj.productHasIngredients.keys);
    // Checking if Object.productHasIngredients has all the keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasIngredients.products_has_ingredients, tKeys = Object.keys(tObj.productHasCategory.keys.products_has_ingredients.keys);
    // Checking if Object.productHasIngredients has all the products_has_ingredients keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.productHasProfessionalApplication, tKeys = Object.keys(tObj.productHasProfessionalApplication.keys);
    // Checking if Object.productHasProfessionalApplication has all the keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );

    x = Obj.topRecommendedProduct, tKeys = Object.keys(tObj.topRecommendedProduct.keys);
    // Checking if Object.topRecommendedProduct has all the keys
    tKeys.forEach((key) =>
        expect(x).to.have.own.property(key)
    );
}

var objectCount = function (data,value) {
    let objArray = null;
    console.log("data type AND flag value :"+typeof data ,+value);
    //console.log("values of the body are "+JSON.stringify(data));
    //console.log("Body is " + data);
    console.log("Hahaha :" + typeof data);
    //console.log("tObj.topRecommendedProduct is " + JSON.stringify(tObj));
    console.log("Flag is "+value);
    if (Array.isArray(data)) {
        tObj.topRecommendedProduct.keys = keySwitch[0];
        console.log("Array of Arrays ");
        objArray = data;
    }
    else if (typeof data === 'object'&& value==='true') {
        console.log("data type AND flag value :"+typeof data, +value);
        Object.keys(sampleObj).forEach((key) =>
            expect(data).to.have.own.property(key)
        );
        console.log("ARRAYYYYY ");
        tObj.topRecommendedProduct.keys = keySwitch[1];
        objArray = data.categoryHasProducts;
    }
    else {
        console.log("Object");
        tObj.topRecommendedProduct.keys = keySwitch[0];
        console.log("JSON Data ");
        objArray = data;
    }
    console.log("Array data is ");   
    for(xObj in objArray.forEach){
        console.log("key values is "+xObj);
        objectTester(xObj);
    }
    //objArray.forEach((xObj) => objectTester(xObj));
}
module.exports = {
    objectCount: objectCount,
    objectTester: objectTester
}
