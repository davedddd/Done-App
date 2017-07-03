// initialize angularjs module
var mod = angular.module('done', []);
var header = "done";

// initialize page controller and create root scope global
mod.controller('page', function($scope, $rootScope) {
    $scope.header = header;
    
// create array for list items
    $rootScope.listitems = [];

// create title header for subpages
    title = document.getElementsByTagName('h3');
// list array for ng repeat directive    
    $scope.listnames = [{
        name: "todoList",
        list: "personal",
        
    }, {
        name: "todoList",
        list: "home",
        
    }, {
        name: "todoList",
        list: "work",
        
    }, {
        name: "todoList",
        list: "other",
        
    }, ];

// ng click function to show subpages
// call to localStorge to check for previous todos
    $scope.list = function(e) {
        $rootScope.sub = e.currentTarget.getAttribute('value');
        title[0].innerHTML = $scope.sub;
        if (!localStorage.getItem($scope.sub)) {
            localStorage.setItem($scope.sub, "");
        }
        if (localStorage.getItem($scope.sub).length != 0) {
            $rootScope.listitems = JSON.parse(localStorage.getItem($scope.sub));
        }
    }

// input to create new item
// add new items to list
// update localstorage  
    $scope.submit = function(e) {
        if (e.currentTarget.item.value.length >= 1) {
            $scope.sub = title[0].innerHTML;
            $scope.items = e.currentTarget.item.value;
            $scope.listitems.push($scope.items);
            $scope.newlists = JSON.stringify($scope.listitems);
            localStorage.setItem($scope.sub, JSON.stringify($scope.listitems));
            e.currentTarget.item.value = "";
        }
    }

// function to change item to done
    $scope.doneItem = function(e) {
        if (e.currentTarget.style.backgroundColor != "silver") {
            e.currentTarget.style.backgroundColor = "silver";
            e.currentTarget.setAttribute("class", "done");
        } else {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.setAttribute("class", "undone");
        }
    }
    
// function to delete item from localstorage and list
    $scope.deleteItem = function(e) {
        e.target.parentElement.style.display = "none";
        $scope.remove = e.currentTarget.getAttribute('id');
        var i = $rootScope.listitems.indexOf($scope.remove);
        if (i != -1) {
            $rootScope.listitems.splice(i, 1);
        }
        localStorage.setItem($rootScope.sub, JSON.stringify($scope.listitems));
    }

});