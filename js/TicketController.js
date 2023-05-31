(function() { 
    var module = angular.module("Agency");

    var TicketController = function($scope, $http, $injector) {
        $scope.minPrice = 0;
        $scope.maxPrice = 100;

        var journeys;
        var vehicles;

        var HandleJourneyData = function(response) { 
            $scope.journeys = response.data;
            journeys = response.data;
            // DisplayTicketOptions(response.data);
        }

        var HandleVehicleData = function(response) {
            $scope.vehicles = response.data;
            vehicles = response.data;
        }

        var LowerTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;
        }

        var RaiseTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;

            var ticketCount = parentEle.getElementsByClassName("journeyTicketCount")[0];

            alert(ticketCount.textContent);
            
        }

        var AddToCart = function (e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;
            // var parentEle = GetParentElement(elem);

            var ticketCount = parentEle.getElementsByClassName("journeyTicketCount")[0];

            alert(ticketCount.textContent);
        }

        function LowerTicketCountClickEvent() {
            var buttons = document.getElementsByClassName("ticketCountButtonSubtr");
            for(var btn of buttons) {
                btn.addEventListener("click", LowerTicketCount);
            }
        }

        function RaiseTicketCountClickEvent() {
            var buttons = document.getElementsByClassName("ticketCountButtonAdd");
            for(var btn of buttons) {
                btn.addEventListener("click", RaiseTicketCount);
            }
        }

        function AddToCartClickEvent() {
            var buttons = document.getElementsByClassName("addToCart");
            for(var btn of buttons) {
                btn.addEventListener("click", AddToCart);
            }
        }

        function GetParentElement(elem) {
            var triggerType = elem.attr('id');
            var parent = document.getElementById(triggerType).parentElement;

            return parent;
        }

        $scope.QueryVehicle = function(vehicleID) {
            for(var veh of vehicles) {
                if(veh.vehicleID === vehicleID)
                    return veh;
            }
        }

        $scope.GetVehicleImage = function(veh) {
            var html = "./assets/images/image_";
            veh = "" + veh;
            if(veh.includes("Boat")) html += "boat.png";
            else if(veh.includes('Airplane')) html += "plane.jpeg";
            else if(veh.includes('Train')) html += "train.jpg";
            else if(veh.includes('Bus')) html += "bus.jpg";
            return html;
        }
        function percentage(percent, total) {
            return ((percent/ 100) * total).toFixed(2);
        }

        $http.get("https://localhost:7084/Journey").then(HandleJourneyData);
        $http.get("https://localhost:7084/Vehicle").then(HandleVehicleData);
    }; 

    module.controller("TicketController", TicketController);
}());  