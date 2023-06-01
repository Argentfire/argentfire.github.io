(function() {
    var module = angular.module("Agency");

    var JourneyController = function($scope, agency) {
        
        var journeys = [];
        var onJourneysComplete = function(data) {
            $scope.journeys = data;
            journeys = data;
            
            var destinations = [];
            for(var item of journeys) {
                if(destinations.includes(item.destination) == false)
                {
                    destinations.push(item.destination);
                }
            }
            $scope.destinations = destinations;
            document.getElementById("btn-all").style.backgroundColor = "rgba(82, 124, 139,1)";
            document.getElementById("btn-dest-all").style.backgroundColor = "rgba(82, 124, 139,1)";
        }

        function GetParentElement(elem) {
            var triggerType = elem.attr('id');
            var parent = document.getElementById(triggerType).parentElement;

            return parent;
        }

        $scope.FilterByVehicle = function(e)
        {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');

            for(var button of document.getElementsByClassName("vehicle-filter-button")) {
                button.style.backgroundColor = "rgba(121, 165, 181, 1)";
            }

            elem.css('background', 'rgba(82, 124, 139,1)');
            
            var veh = triggerType.replace("btn", "");
            var journeyElements = document.getElementsByClassName("journey-data");
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
                        if(filteredJourneys[i].innerHTML.includes("Destination: " + item.value)) {
                            item.style.display = "block";
                        }
                    }
                }
            }
        }

        $scope.FilterByDestination = function(e) {
            var elemID = GetElementID(e);
            console.log(elemID);

            for(var button of document.getElementsByClassName("destination-filter-button")) {
                button.style.backgroundColor = "rgba(121, 165, 181, 1)";
            }

            GetElement(e).css('background', 'rgba(82, 124, 139,1)');

            var journeys = document.getElementsByClassName("journey-data");
            if(elemID == "btn-dest-all") {
                for(item of journeys) {
                    item.style.display = "flex";
                }
            }
            else {
                for(item of journeys) {
                    item.style.display = "none";
                    if(item.innerHTML.includes("Destination: " + GetClickedButtonText(e))) {
                        item.style.display = "flex";
                    }
                }
            }
        }

        function GetElement(e) {
            return angular.element(e.srcElement);
        }

        function GetElementID(element) {
            var elem = angular.element(element.srcElement);
            return elem.attr("id");
        }

        function GetClickedButtonText(e) {
            var elem = angular.element(e.srcElement);
            return elem.attr("value");
        }


        var filterDest = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            console.log(triggerType);
            var dest = triggerType.replace("btn-dest", "");
            var iJourneys = document.getElementsByClassName("journey-data");
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
        
        agency.getDataArray("Journey").then(onJourneysComplete);
        // $http.get("https://localhost:7084/Journey").then(onJourneysComplete);
    };

    module.controller("JourneyController", JourneyController);
// elem.css('background', 'blue'); <- Way to set element style property via function
}());