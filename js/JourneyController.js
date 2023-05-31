(function() {
    var module = angular.module("Agency");

    var JourneyController = function($scope, $http) {
        
        var journeys = [];
        var onJourneysComplete = function(response) {
            $scope.journeys = response.data;
            journeys = response.data;
            
            var destinations = [];
            for(var item of response.data) {
                if(destinations.includes(item.destination) == false)
                {
                    destinations.push(item.destination);
                }
            }
            $scope.destinations = destinations;
            document.getElementById("btnAll").style.backgroundColor = "rgba(82, 124, 139,1)";
            document.getElementById("btnDestAll").style.backgroundColor = "rgba(82, 124, 139,1)";
            // AddFilterDestBtnsClickEvent();
        }

        $scope.asdf = function(event) {
            var elementId = event.target.id;
            alert("Element ID: " + elementId);
        }

        function GetParentElement(elem) {
            var triggerType = elem.attr('id');
            var parent = document.getElementById(triggerType).parentElement;

            return parent;
        }

        $scope.testFunc = function(e)
        {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');

            for(var foo of document.getElementsByClassName("vehicle-filter-button")) {
                foo.style.backgroundColor = "rgba(121, 165, 181, 1)";
            }

            elem.css('background', 'rgba(82, 124, 139,1)');
            
            var veh = triggerType.replace("btn", "");
            var journeyElements = document.getElementsByClassName("journeyData");
            var destinationFilters = document.getElementsByClassName("destination-filter-button");
            for(var item of journeyElements) {
                item.style.display = "none";
            }
            for(var item of destinationFilters) {
                if(item.value.includes("All") == false)
                    item.style.display = "none";
            }
            var filteredJourneys = [];
            if(veh.includes("All")){
                for(var item of journeyElements) {
                    item.style.display = "flex";
                }
                for(var item of destinationFilters) {
                    item.style.display = "block";
                }

            }
            else {
                for(var item of journeyElements) {
                    if(item.textContent.includes(veh)) {
                        item.style.display = "flex";
                        filteredJourneys.push(item);
                    }
                }
                for(var item of destinationFilters) {
                    for(var i = 0; i < filteredJourneys.length; i++)
                    {
                        if(filteredJourneys[i].innerHTML.includes(item.value)) {
                            item.style.display = "block";
                        }
                    }
                }
            }
        }



        var filterDest = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            console.log(triggerType);
            var dest = triggerType.replace("btnDest", "");
            var iJourneys = document.getElementsByClassName("journeyData");
            for(var i of iJourneys)
                i.style.display = "block";
            if(dest.includes("All") == false) {
                for(var i = 0; i < iJourneys.length; i++) {
                    if(iJourneys[i].innerHTML.includes("Destination: " + dest) == false) iJourneys[i].style.display = "none";
                }
            }
        }

        $scope.QueryVehicleType = function(vehicleModel)
        {
            var veh = vehicleModel;
            veh = veh.substring(0, veh.indexOf("----") - 1);
            return veh;
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

        function AddFilterDestBtnsClickEvent() {
            var buttons = document.getElementsByClassName("destination-filter-button");
            for(var btn of buttons) {
                btn.addEventListener("click", filterDest);
            }
        }

        $http.get("https://localhost:7084/Journey").then(onJourneysComplete);
    };

    module.controller("JourneyController", JourneyController);
// elem.css('background', 'blue'); <- Way to set element style property via function
}());