'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {};
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', '$stateParams', 'feedbackFactory', function($scope, $stateParams, feedbackFactory) {
            
            $scope.showFeedback = false;
            $scope.message="Loading ...";
            $scope.feedbacks = {};
            
            $scope.feedbacks = feedbackFactory.getFeedback().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.feedbacks = response;
                                $scope.showFeedback = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );    
           // feedbackFactory.getFeedback().query(
           //     function(response) {
           //         $scope.feedbacks = response;
           //         $scope.showFeedback = true;
           //     },
           //     function(response) {
           //         $scope.message = "Error: "+response.status + " " + response.statusText;
           //     });
            
            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedbacks.push($scope.feedback);
                    console.log($scope.feedbacks);
                    
                    feedbackFactory.getFeedback().update({id:parseInt($scope.feedbacks.id)},$scope.feedbacks);
                    $scope.feedbackForm.$setPristine();
                }
            };
                       
        }])
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {};
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.mycomment.rating = parseInt($scope.mycomment.rating,10);
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {};
        };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', '$stateParams', 'corporateFactory', 'menuFactory', function($scope, $stateParams, corporateFactory, menuFactory) {
            
                $scope.showDish = false;
                $scope.showPromotion = false;
                $scope.showleader = false;
                $scope.message="Loading ...";

                $scope.featuredDish = menuFactory.getDishes().get({id:0})
                    .$promise.then(
                        function(response){
                            $scope.featuredDish = response;
                            $scope.showDish = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
            
           // $scope.getPromotion = menuFactory.getPromotion(0);
        
            
//            menuFactory.getPromotions().query(
//                function(response) {
//                    $scope.promotions = response;
//                    $scope.showPromotion = true;
//                },
//                function(response) {
//                    $scope.message = "Error: "+response.status + " " + response.statusText;
//                });
            
            $scope.getPromotion = menuFactory.getPromotions().get({id:0})
                    .$promise.then(
                        function(response){
                            $scope.getPromotion = response;
                            $scope.showPromotion = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
            
            //$scope.leadership = corporateFactory.getLeaders();
            
            $scope.executiveChef = corporateFactory.getLeaders().get({id:3})
                    .$promise.then(
                        function(response){
                            $scope.executiveChef = response;
                            $scope.showleader = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
            
            
        }])

        .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {
            
            //$scope.leadership = corporateFactory.getLeaders();
            $scope.showLeaders = false;
            $scope.message="Loading ...";
            
            
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leadership = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
        }])

;
