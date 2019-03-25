var expect = require('chai').expect;
var https = require("https");
var request = require('request');
var env = require('./environment');

var input = function (key, subPath) {
    var options = {
        "rejectUnauthorized": false,
        url: env.hostname + env.APIver + subPath,
        headers: {
            'API-KEY': key,
        }
    }
    return options;
}
var app_requester = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            app_callback(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}
var app_callback = function (body, res) {
    body = JSON.parse(body);
    expect(res.statusCode).to.equal(200);
    app_parameters(body);
}

var app_parameters = function (body) {
    expect(body).to.be.an('object');
}

var products_requester = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            products_callback(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}
var products_callback = function (body, res) {
    body = JSON.parse(body);
    var count = 0;
    //console.log("type is " + typeof body);
    //count=body.length;
    if (Array.isArray(body)) {
        count = body.length;
        for (var i = 0; i < count; i++) {
            //console.log("count is "+count);
            //console.log("value of i is " + i);
            products_parameters(body[i], false, false);

        }
    } else if (typeof body === 'object') {
        //console.log("body is "+JSON.stringify(body));
        products_parameters(body, false, false);

    }
}

var counterror = 0;

var products_parameters = function (body, value1, value2) {
    var bodyKeys = ['id', 'name', 'subtitle', 'description', 'imageUrl', 'thumbUrl', 'consumerIngredients', 'ingredients', 'startDateTime', 'endDateTime', 'url', 'createdAt', 'updatedAt', 'productHasCategory', 'productHasAttributes', 'productHasSizes', 'productHasIngredients', 'productHasProfessionalApplication'];
    var bodyKeys_a = ['id', 'name', 'subtitle', 'description', 'imageUrl', 'thumbUrl', 'consumerIngredients', 'ingredients', 'startDateTime', 'endDateTime', 'url', 'createdAt', 'updatedAt', 'productHasAttributes', 'productHasSizes', 'productHasIngredients', 'productHasProfessionalApplication'];
    var productHasCategorykeys = ['name', 'description', 'imageUrl', 'url', 'youtubeurl', 'id', 'parentId', 'isActive', 'categories_has_products'];
    var categories_has_productskeys = ['products_id', 'categories_id'];
    var productHasAttributeskeys = ['id', 'name', 'description', 'dataType', 'defaultValue'];
    var products_has_attrributeskeys = ['value', 'products_id', 'attrributes_id'];
    var productHasSizeskeys = ['id', 'imperial_size', 'metric_size', 'products_has_sizes'];
    var products_has_sizeskeys = ['barcode', 'imageUrl', 'thumbUrl', 'siliconImage', 'type', 'ecommerceId', 'productPrice', 'productUrl', 'recommended_size', 'products_id', 'sizes_id'];
    var productHasIngredientskeys = ['id', 'name', 'description', 'products_has_ingredients'];
    var products_has_ingredientskeys = ['products_id', 'ingredients_id'];
    var topRecommendedProductkeys = ['priority', 'product_id'];
    var topRecommendedProduct_keys = ['id', 'products_id', 'products', 'priority', 'isActive', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
    if (value1 == false && value2 == false) {
        //console.log("1");
    }
    else if (value1 == true && value2 == true) {
        //console.log("2");
        topRecommendedProductkeys = [...topRecommendedProduct_keys];
    }
    else if (value1 == true && value2 == false) {
        //console.log("3");
        topRecommendedProductkeys = [...topRecommendedProduct_keys];
        matrix_keys(body);
    }
    else if (value1 == false && value2 == true) {
        //console.log("4");
        topRecommendedProductkeys = [...topRecommendedProduct_keys];
        matrix_keys(body);
    }
    try {
        bodyKeys.forEach((prop) => {
            expect(body).to.have.own.property(prop);
            expect(body).to.be.an('object');
        })
    }
    catch (e) {
        //console.log("inside the catch ");
        bodyKeys_a.forEach((prop) => {
            expect(body).to.have.own.property(prop);
            expect(body).to.be.an('object');
        })
        //console.log("error is " + e);
    }
    if (body.productHasCategory) {
        var productHasCategorycount = body.productHasCategory.length;
        //console.log("count is " + productHasCategorycount);
        for (var j = 0; j < productHasCategorycount; j++) {
            //console.log("j value of productHasCategorycount " + j);
            productHasCategorykeys.forEach((prop) => {
                expect(body.productHasCategory[j]).to.have.own.property(prop);
            })
            categories_has_productskeys.forEach((prop) => {
                expect(body.productHasCategory[j].categories_has_products).to.have.own.property(prop);
            })
        }
    }
    var productHasAttributescount = body.productHasAttributes.length;
    //console.log("count is " + productHasAttributescount);
    for (var j = 0; j < productHasAttributescount; j++) {
        //console.log("j value of productHasAttributescount " + j);
        productHasAttributeskeys.forEach((prop) => {
            expect(body.productHasAttributes[j]).to.have.own.property(prop);
        })
        products_has_attrributeskeys.forEach((prop) => {
            expect(body.productHasAttributes[j].products_has_attrributes).to.have.own.property(prop);
        })
    }
    var productHasSizescount = body.productHasSizes.length;
    //console.log("count is " + productHasSizescount);
    for (var j = 0; j < productHasSizescount; j++) {
        //console.log("j value of productHasSizescount " + j);
        productHasSizeskeys.forEach((prop) => {
            expect(body.productHasSizes[j]).to.have.own.property(prop);
        })
        products_has_sizeskeys.forEach((prop) => {
            expect(body.productHasSizes[j].products_has_sizes).to.have.own.property(prop);
        })
        // try {
        var imageUrl = body.productHasSizes[j].products_has_sizes.imageUrl;
        if (imageUrl === '' || imageUrl === null || imageUrl === undefined) {
            throw new Error("productHasSizes imageUrl is missing in this product :" + body.name);
        }
        //    }
        //     catch (error) {
        //         console.log("Error is "+error);
        //         counterror++;
        //     }
        //    try {
        var thumbUrl = body.productHasSizes[j].products_has_sizes.thumbUrl;
        if (thumbUrl === '' || thumbUrl === null || thumbUrl === undefined) {
            throw new Error("productHasSizes thumbUrl is missing in this product :" + body.name);
        }
        // }
        // catch (error) {
        //     console.log("Error is "+error);
        //     counterror++;
        // }
        //  try {
        var siliconImage = body.productHasSizes[j].products_has_sizes.siliconImage;
        if (siliconImage === '' || siliconImage === null || siliconImage === undefined) {
            throw new Error("productHasSizes siliconImage is missing in this product :" + body.name);
        }
        // }
        // catch (error) {
        //     console.log("Error is "+error);
        //     counterror++;
        // }
    }
    //console.log("final count is " + counterror);
    var productHasIngredientscount = body.productHasIngredients.length;
    //console.log("count is " + productHasIngredientscount);
    for (var j = 0; j < productHasIngredientscount; j++) {
        //console.log("j value of productHasIngredientscount " + j);
        productHasIngredientskeys.forEach((prop) => {
            expect(body.productHasIngredients[j]).to.have.own.property(prop);
        })
        products_has_ingredientskeys.forEach((prop) => {
            expect(body.productHasIngredients[j].products_has_ingredients).to.have.own.property(prop);
        })
    }
    expect(body.productHasProfessionalApplication).to.be.an('array');
    var topRecommendedProductcount = body.topRecommendedProduct.length;
    //console.log("count is " + topRecommendedProductcount);
    for (var j = 0; j < topRecommendedProductcount; j++) {
        //console.log("j value of topRecommendedProductcount " + j);
        topRecommendedProductkeys.forEach((prop) => {
            expect(body.topRecommendedProduct[j]).to.have.own.property(prop);
        })
    }

}
var matrix_keys = function (body) {
    var product_has_matrixkeys_keys = ['id', 'name', 'Recommends_id', 'isActive', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
    var product_has_matrixkeyscount = body.product_has_matrix.length;
    //console.log("inside count is " + product_has_matrixkeyscount);
    for (var j = 0; j < product_has_matrixkeyscount; j++) {
        expect(body.product_has_matrix[j]).to.have.own.property('categories');
        expect(body.product_has_matrix[j]).to.have.own.property('types');
        product_has_matrixkeys_keys.forEach((prop) => {
            expect(body.product_has_matrix[j].categories).to.have.own.property(prop);
            expect(body.product_has_matrix[j].types).to.have.own.property(prop);
        })
    }
}

var country_requester = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            country_callback(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}
var country_callback = function (body, res) {
    body = JSON.parse(body);
    expect(res.statusCode).to.equal(200);
    country_parameters(body);
}
var country_parameters = function (body) {
    expect(body).to.be.an('array');
}

var category_requester = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            category_callback(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}
var category_callback = function (body, res) {
    var count;
    body = JSON.parse(body);
    var length;
    category_parameters(body, count, length);
}
var category_parameters = function (body, count, length) {
    var bodyKeys = ['id', 'name', 'description', 'imageUrl', 'url', 'createdAt', 'updatedAt', 'youtubeurl', 'parentId', 'isActive', 'createdBy', 'updatedBy'];
    var count = body.length;
    //expect(body).to.be.an('array');
    for (var i = 0; i < count; i++) {
        bodyKeys.forEach((prop) => {
            expect(body[i]).to.have.own.property(prop);
            expect(body[i]).to.be.an('object');
        })
        if (body[i].children) {
            var length = body[i].children.length;
            expect(body[i].children).to.be.an('array');
            for (var j = 0; j < length; j++) {
                bodyKeys.forEach((prop) => {
                    expect(body[i].children[j]).to.have.own.property(prop);
                    expect(body[i].children[j]).to.be.an('object');
                })
            }
        }
    }
}
var category_requesterbyID = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            category_callbackbyID(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}
var category_callbackbyID = function (body, res) {
    var count;
    body = JSON.parse(body);
    //console.log("body is "+JSON.stringify(body));
    category_parametersbyID(body, count);
}
var category_parametersbyID = function (body, count) {
    var bodyKeys = ['name', 'description', 'imageUrl', 'url', 'youtubeurl', 'id', 'parentId', 'isActive', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'categoryHasProducts'];
    var count;
    //console.log("inside cat");
    expect(body).to.be.a('object');
    expect(body.categoryHasProducts).to.be.an('array');
    bodyKeys.forEach((prop) => {
        expect(body).to.have.own.property(prop);
    })
    count = Object.keys(body.categoryHasProducts).length;
    //console.log("count is "+count);
    if (count == 0) {
        throw new Error("CategoryHasProducts has an Empty Array for the following Id:" + body.id);
        //console.log("count is " + count);
    }
    else {
        for (var i = 0; i < count; i++) {
            //console.log("value of i is " + i);
            products_parameters(body.categoryHasProducts[i], true, true);
        }
        // expect(body.categoryHasProducts[i]).to.have.own.property('priority');
    }
}
var matrix_requester = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            matrix_callback(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}
var matrix_callback = function (body, res) {
    var count;
    body = JSON.parse(body);
    count = body.length;
    //console.log(count);
    for (var i = 0; i < count; i++) {
        var length = body[i].length;
        if (length) {
            for (var j = 0; j < body[i].length; j++) {
                //console.log("value of i and j " + i, +j);
                products_parameters(body[i][j], true, false);
            }
        }
        else {
            //console.log("value of i is " + i);
            products_parameters(body[i], true, false);
        }
    }
}
var list_callback = function (body, res) {
    var count;
    body = JSON.parse(body);
    if (Array.isArray(body)) {
        count = body.length;
    }
    else {
        count = 1;
    }
    var listkeys = ['id', 'apps_id', 'name', 'model', 'isActive', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'products'];
    var listkeys_a = ['id', 'apps_id', 'name', 'model', 'isActive', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'product'];
    for (var i = 0; i < count; i++) {
        if (Array.isArray(body)) {
            listkeys.forEach((prop) => {
                expect(body[i]).to.have.own.property(prop);
                expect(body[i]).to.be.an('object');
            })
            for (var j = 0; j < body[i].products.length; j++) {
                //console.log("j is " + j);
                products_parameters(body[i].products[j], true, true);
                expect(body[i].products[j]).to.have.own.property('priority');
            }
        }
        else {
            listkeys_a.forEach((prop) => {
                expect(body).to.have.own.property(prop);
                expect(body).to.be.an('object');
            })
            for (var j = 0; j < body.product.length; j++) {
                products_parameters(body.product[j], true, true);
                expect(body.product[j]).to.have.own.property('priority');
            }
        }
    }
}


var list_requester = function (inputvalues, done) {
    //console.log(inputvalues);
    request.get(inputvalues, function (err, res, body) {
        if (res.statusCode === 200) {
            expect(res.statusCode).to.equal(200);
            list_callback(body, res);
        } else {
            throw new Error(body);
        }
        done();
    })
}


module.exports = {
    input: input,
    app_parameters: app_parameters,
    app_callback: app_callback,
    app_requester: app_requester,
    products_callback: products_callback,
    products_parameters: products_parameters,
    products_requester: products_requester,
    category_callback: category_callback,
    category_parameters: category_parameters,
    category_requester: category_requester,
    category_callbackbyID: category_callbackbyID,
    category_parametersbyID: category_parametersbyID,
    category_requesterbyID: category_requesterbyID,
    country_parameters: country_parameters,
    country_callback: country_callback,
    country_requester: country_requester,
    matrix_callback: matrix_callback,
    matrix_requester: matrix_requester,
    matrix_keys: matrix_keys,
    list_requester: list_requester,
    list_callback: list_callback
}
