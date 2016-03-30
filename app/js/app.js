var appl = angular.module('FoodApp',["ngRoute"]);
appl.controller('MainController', ['$scope', function($scope) {
    $scope.title = 'This Months Bestsellers';
    $scope.promo = 'The most popular books this month.';
    $scope.order_details= [];
    /*$scope.clicked=function () {
        window.location="#/porder";
    }*/
    $scope.products = [
        {
            name: 'Uthapizza',
            price: 19,
            pubdate: new Date('2014', '03', '08'),
            description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
            cover: 'img/uthapizza.png',
            dislikes: 0,
            likes: 0
        },
        {
            name: 'Zucchipakoda',
            price: 8,
            pubdate: new Date('2013', '08', '01'),
            description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
            cover: 'img/zucchipakoda.png',
            dislikes: 0,
            likes: 0
        },
        {
            name: 'Vadonut',
            price: 11.99,
            pubdate: new Date('1999', '07', '08'),
            cover: 'img/vadonut.png',
            description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
            dislikes: 0,
            likes: 0
        },
        {
            name: 'ElaiCheese Cake',
            price: 7.99,
            pubdate: new Date('2011', '08', '16'),
            cover: 'img/elaicheesecake.png',
            description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
            dislikes: 0,
            likes: 0
        }
    ];
    $scope.plusOne = function(index,$prod) {
        $scope.products[index].likes+=1;
        var count=-1;
        for(var i in $scope.order_details)
        {
            if($scope.order_details[i].name===$prod.name)
            {
                count=i;
                //alert("match count"+count);
            }
        }
        if(count===-1)
        {
            $scope.order_details.push({name:$prod.name,quantity:$scope.products[index].likes});
        }
        else
        {
            $scope.order_details[count].quantity+=1;
            //alert("CT: "+count+"NAME: "+$scope.order_details[count].name+" QTY: "+$scope.order_details[count].quantity);
        }
    };
    $scope.minusOne = function(index,$prod){
        if($scope.products[index].likes>=1)
            $scope.products[index].likes-=1;

        var count1=-1;
        for(var i in $scope.order_details)
        {
            if($scope.order_details[i].name===$prod.name)
            {
                count1=i;
                //alert("match count - "+count1);

            }
        }
        if(count1>-1)
        {
            $scope.order_details[count1].quantity-=1;
            //alert("CT:(-)"+count1+"NAME: "+$scope.order_details[count1].name+" QTY: "+$scope.order_details[count1].quantity);

        }
    };
    
    $scope.place_order = function () {
        if($scope.order_details.length===0){alert("make a selection first!");}
        else {
            for(var j in $scope.order_details)
            {
                alert($scope.order_details[j].name+" "+$scope.order_details[j].quantity);
            }
        }

    };

    // logic for sending the mail to the customers!
    $scope.send_mail = function () {
        var data, message, params, to;
        to = {
            email: "aryangajavelli2011@gmail.com"
            //email: $("#to-email").val()
        };
        message = {
            text: "test mail",
            //text: $("#message-area").val(),
            from_email: "aryangajvelli2011@gmail.com",
            //from_email: $("#from-email").val(),
            to: [to]
        };
        data = {
            key: "WTPGjaZHVGEYQGLhxwUXFA",
            //key: $("#mandrill-api-key").val(),
            message: message
        };
        params = {
            method: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data)
        };
        return $.ajax(params).done(success).fail(failure);
    };

    var success = function() {
        alert("mail sent successfully");
    };

    var failure = function(data, status, xhr) {
        alert(["(From Mandrill) " + $.parseJSON(data.responseText).message]);
    };

    $scope.gen_place_order = function () {
        var errors;
        errors = check_form();
        if(errors.length===0)
        {
            $scope.send_mail();
        }
        else {
            alert(errors);
        }
    };

    var check_form = function () {
        var e_array=[];
        if($scope.order_details.length===0)
            e_array.push("Empty form ! enter the mail id");

        return e_array;

    };

    // code for sending mail to customers ends!

}]);

//routing logic for the webpage!
appl.config(function($routeProvider)
{
    console.log("iam in config");
    $routeProvider
        .when("/order",{templateUrl:"/FoodOrdering/app/views/test1.html",controller:"MainController"})
        .otherwise({redirectTo:"/"});
});
